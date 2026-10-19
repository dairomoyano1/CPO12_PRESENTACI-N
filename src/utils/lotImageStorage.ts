// Robust persistent storage for CPO-12 Lot Satellite Maps & Images
// Uses both IndexedDB (unlimited quota) + localStorage (compressed fallbacks)
// with cross-tab and cross-slide event synchronization.

const DB_NAME = 'cpo12_satellite_images_db';
const DB_VERSION = 1;
const STORE_NAME = 'lot_images';
const LOCAL_STORAGE_KEY = 'cpo12_lot_images';

// Normalization map to support all identifier variations
export const LOT_ID_ALIASES: Record<string, string> = {
  'inv-rio-planas': 'inv-la-fortuna',
  'inv-la-fortuna': 'inv-la-fortuna',
  'inv-rio-melua': 'inv-moriche-solo',
  'inv-moriche-solo': 'inv-moriche-solo',
  'inv-cano-pilon': 'inv-cano-pilon',
  'comp-holanda-1-2': 'comp-holanda-1-2',
  'comp-holanda-3-4': 'comp-holanda-3-4',
};

export function normalizeLotId(id: string): string {
  return LOT_ID_ALIASES[id] || id;
}

// In-memory cache for ultra-fast synchronous rendering
let memoryCache: Record<string, string> = {};

// Initialize memory cache from localStorage immediately
try {
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (local) {
    const parsed = JSON.parse(local);
    // Populate cache with both original and aliased keys
    Object.entries(parsed).forEach(([k, v]) => {
      if (typeof v === 'string') {
        memoryCache[k] = v;
        const norm = normalizeLotId(k);
        memoryCache[norm] = v;
      }
    });
  }
} catch {
  // ignore
}

// Open or get IndexedDB database instance
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Compress image via Canvas to fit comfortably in localStorage & memory
export function compressImage(fileOrDataUrl: File | string, maxDimension = 1800, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
        return;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      try {
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      } catch (err) {
        resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
      }
    };

    img.onerror = () => {
      if (typeof fileOrDataUrl === 'string') {
        resolve(fileOrDataUrl);
      } else {
        reject(new Error('Failed to load image for compression'));
      }
    };

    if (typeof fileOrDataUrl === 'string') {
      img.src = fileOrDataUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrDataUrl);
    }
  });
}

// Save lot image (or year-specific series image) to both IndexedDB and LocalStorage, notifying subscribers
export async function saveLotImage(lotId: string, fileOrDataUrl: File | string, year?: number): Promise<string> {
  const normId = normalizeLotId(lotId);
  const targetKey = year ? `${normId}_${year}` : normId;
  const rawKey = year ? `${lotId}_${year}` : lotId;
  
  // Compress to ensure fast load and safe storage size
  const compressedDataUrl = await compressImage(fileOrDataUrl, 1800, 0.85);

  // Update in-memory cache for target key and aliases
  memoryCache[rawKey] = compressedDataUrl;
  memoryCache[targetKey] = compressedDataUrl;

  const setAlias = (base1: string, base2: string) => {
    const k1 = year ? `${base1}_${year}` : base1;
    const k2 = year ? `${base2}_${year}` : base2;
    if (lotId === base1 || normId === base1) {
      memoryCache[k2] = compressedDataUrl;
    }
    if (lotId === base2 || normId === base2) {
      memoryCache[k1] = compressedDataUrl;
    }
  };

  setAlias('inv-la-fortuna', 'inv-rio-planas');
  setAlias('inv-moriche-solo', 'inv-rio-melua');

  // Also if setting year image, and general lot image doesn't exist, set it as lot image too
  if (year && !memoryCache[normId]) {
    memoryCache[normId] = compressedDataUrl;
    memoryCache[lotId] = compressedDataUrl;
  }

  // 1. Save to LocalStorage with all aliases
  try {
    const current = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = current ? JSON.parse(current) : {};
    parsed[rawKey] = compressedDataUrl;
    parsed[targetKey] = compressedDataUrl;
    if (year && !parsed[normId]) {
      parsed[normId] = compressedDataUrl;
    }
    if (lotId === 'inv-la-fortuna') parsed[year ? `inv-rio-planas_${year}` : 'inv-rio-planas'] = compressedDataUrl;
    if (lotId === 'inv-rio-planas') parsed[year ? `inv-la-fortuna_${year}` : 'inv-la-fortuna'] = compressedDataUrl;
    if (lotId === 'inv-moriche-solo') parsed[year ? `inv-rio-melua_${year}` : 'inv-rio-melua'] = compressedDataUrl;
    if (lotId === 'inv-rio-melua') parsed[year ? `inv-moriche-solo_${year}` : 'inv-moriche-solo'] = compressedDataUrl;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.warn('LocalStorage quota warning, using IndexedDB fallback:', e);
  }

  // 2. Save to IndexedDB
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ id: targetKey, data: compressedDataUrl, timestamp: Date.now() });
    store.put({ id: rawKey, data: compressedDataUrl, timestamp: Date.now() });
  } catch (e) {
    console.warn('IndexedDB write warning:', e);
  }

  // 3. Dispatch storage event for real-time reactivity
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('cpo12_lot_images_updated', {
        detail: { lotId, normId, year, key: targetKey, dataUrl: compressedDataUrl },
      })
    );
  }

  return compressedDataUrl;
}

// Synchronously get image from memory cache (or localStorage fallback), supporting optional series year
export function getLotImage(lotId: string, year?: number): string | null {
  const normId = normalizeLotId(lotId);

  // If year requested, first check year-specific keys
  if (year) {
    const rawYearKey = `${lotId}_${year}`;
    const normYearKey = `${normId}_${year}`;

    if (memoryCache[rawYearKey]) return memoryCache[rawYearKey];
    if (memoryCache[normYearKey]) return memoryCache[normYearKey];

    if (lotId === 'inv-la-fortuna' && memoryCache[`inv-rio-planas_${year}`]) return memoryCache[`inv-rio-planas_${year}`];
    if (lotId === 'inv-rio-planas' && memoryCache[`inv-la-fortuna_${year}`]) return memoryCache[`inv-la-fortuna_${year}`];
    if (lotId === 'inv-moriche-solo' && memoryCache[`inv-rio-melua_${year}`]) return memoryCache[`inv-rio-melua_${year}`];
    if (lotId === 'inv-rio-melua' && memoryCache[`inv-moriche-solo_${year}`]) return memoryCache[`inv-moriche-solo_${year}`];

    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        const img = parsed[rawYearKey] || parsed[normYearKey] ||
          (lotId === 'inv-la-fortuna' ? parsed[`inv-rio-planas_${year}`] : null) ||
          (lotId === 'inv-rio-planas' ? parsed[`inv-la-fortuna_${year}`] : null);
        if (img) {
          memoryCache[rawYearKey] = img;
          memoryCache[normYearKey] = img;
          return img;
        }
      }
    } catch {
      // ignore
    }
  }

  // Fallback to lot general image
  if (memoryCache[lotId]) return memoryCache[lotId];
  if (memoryCache[normId]) return memoryCache[normId];
  if (lotId === 'inv-la-fortuna' && memoryCache['inv-rio-planas']) return memoryCache['inv-rio-planas'];
  if (lotId === 'inv-rio-planas' && memoryCache['inv-la-fortuna']) return memoryCache['inv-la-fortuna'];
  if (lotId === 'inv-moriche-solo' && memoryCache['inv-rio-melua']) return memoryCache['inv-rio-melua'];
  if (lotId === 'inv-rio-melua' && memoryCache['inv-moriche-solo']) return memoryCache['inv-moriche-solo'];

  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      const img = parsed[lotId] || parsed[normId] || (lotId === 'inv-la-fortuna' ? parsed['inv-rio-planas'] : null) || (lotId === 'inv-rio-planas' ? parsed['inv-la-fortuna'] : null) || (lotId === 'inv-moriche-solo' ? parsed['inv-rio-melua'] : null) || (lotId === 'inv-rio-melua' ? parsed['inv-moriche-solo'] : null);
      if (img) {
        memoryCache[lotId] = img;
        memoryCache[normId] = img;
        return img;
      }
    }
  } catch {
    // ignore
  }

  return null;
}

// Check if a specific year has its own unique photo
export function hasSpecificYearImage(lotId: string, year: number): boolean {
  const normId = normalizeLotId(lotId);
  const rawKey = `${lotId}_${year}`;
  const normKey = `${normId}_${year}`;
  return !!(memoryCache[rawKey] || memoryCache[normKey]);
}

// Load all lot images asynchronously from IndexedDB and sync to memory cache
export async function loadAllLotImages(): Promise<Record<string, string>> {
  const result: Record<string, string> = { ...memoryCache };

  // Sync from IndexedDB
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    await new Promise((resolve) => {
      req.onsuccess = () => {
        if (Array.isArray(req.result)) {
          req.result.forEach((item: { id: string; data: string }) => {
            if (item && item.id && item.data) {
              result[item.id] = item.data;
              memoryCache[item.id] = item.data;
            }
          });
        }
        resolve(true);
      };
      req.onerror = () => resolve(false);
    });
  } catch {
    // ignore
  }

  return result;
}

// Remove lot image or year-specific series image
export async function removeLotImage(lotId: string, year?: number): Promise<void> {
  const normId = normalizeLotId(lotId);
  const targetKey = year ? `${normId}_${year}` : normId;
  const rawKey = year ? `${lotId}_${year}` : lotId;

  delete memoryCache[rawKey];
  delete memoryCache[targetKey];
  if (lotId === 'inv-la-fortuna') delete memoryCache[year ? `inv-rio-planas_${year}` : 'inv-rio-planas'];
  if (lotId === 'inv-rio-planas') delete memoryCache[year ? `inv-la-fortuna_${year}` : 'inv-la-fortuna'];
  if (lotId === 'inv-moriche-solo') delete memoryCache[year ? `inv-rio-melua_${year}` : 'inv-rio-melua'];
  if (lotId === 'inv-rio-melua') delete memoryCache[year ? `inv-moriche-solo_${year}` : 'inv-moriche-solo'];

  try {
    const current = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (current) {
      const parsed = JSON.parse(current);
      delete parsed[rawKey];
      delete parsed[targetKey];
      if (lotId === 'inv-la-fortuna') delete parsed[year ? `inv-rio-planas_${year}` : 'inv-rio-planas'];
      if (lotId === 'inv-rio-planas') delete parsed[year ? `inv-la-fortuna_${year}` : 'inv-la-fortuna'];
      if (lotId === 'inv-moriche-solo') delete parsed[year ? `inv-rio-melua_${year}` : 'inv-rio-melua'];
      if (lotId === 'inv-rio-melua') delete parsed[year ? `inv-moriche-solo_${year}` : 'inv-moriche-solo'];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
    }
  } catch {
    // ignore
  }

  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(targetKey);
    store.delete(rawKey);
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('cpo12_lot_images_updated', {
        detail: { lotId, normId, year, removed: true },
      })
    );
  }
}
