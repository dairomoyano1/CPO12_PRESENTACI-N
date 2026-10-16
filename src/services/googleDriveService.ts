import { getAccessToken } from './googleDriveAuth';
import { 
  LOTES_COMPENSACION, 
  BASINS_1_PERCENT, 
  SEISMIC_WATER_COSTS, 
  TOTAL_WATER_HARVEST,
  STRATEGIC_SCENARIOS,
  NEW_SCENARIOS,
  BLOCK_METADATA 
} from '../data/presentationData';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  parents?: string[];
}

export interface DriveAboutInfo {
  user: {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  };
  storageQuota: {
    limit?: string;
    usage?: string;
    usageInDrive?: string;
    usageInDriveTrash?: string;
  };
}

/**
 * Make authenticated fetch to Google Drive API
 */
const driveFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('No hay sesión activa de Google Drive. Inicia sesión con Google para continuar.');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    let parsedMessage = res.statusText;
    try {
      const json = JSON.parse(errorBody);
      if (json.error?.message) {
        parsedMessage = json.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(`Google Drive API error (${res.status}): ${parsedMessage}`);
  }

  return res;
};

/**
 * List files and folders from Google Drive
 */
export const listDriveFiles = async (params?: {
  query?: string;
  folderId?: string;
  pageSize?: number;
}): Promise<DriveFile[]> => {
  const pageSize = params?.pageSize || 30;
  const conditions: string[] = ['trashed = false'];

  if (params?.folderId) {
    conditions.push(`'${params.folderId}' in parents`);
  }

  if (params?.query && params.query.trim()) {
    const sanitized = params.query.trim().replace(/'/g, "\\'");
    conditions.push(`name contains '${sanitized}'`);
  }

  const q = encodeURIComponent(conditions.join(' and '));
  const fields = encodeURIComponent('nextPageToken, files(id, name, mimeType, modifiedTime, size, webViewLink, iconLink, thumbnailLink, parents)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=${pageSize}&fields=${fields}&orderBy=modifiedTime desc`;

  const res = await driveFetch(url);
  const data = await res.json();
  return (data.files as DriveFile[]) || [];
};

/**
 * Get account and storage quota info from Google Drive
 */
export const getDriveAbout = async (): Promise<DriveAboutInfo> => {
  const fields = encodeURIComponent('user(displayName, emailAddress, photoLink), storageQuota(limit, usage, usageInDrive, usageInDriveTrash)');
  const url = `https://www.googleapis.com/drive/v3/about?fields=${fields}`;

  const res = await driveFetch(url);
  const data = await res.json();
  return data as DriveAboutInfo;
};

/**
 * Create a new folder in Google Drive
 */
export const createDriveFolder = async (folderName: string, parentId?: string): Promise<DriveFile> => {
  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const res = await driveFetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  return await res.json();
};

/**
 * Upload a file to Google Drive using multipart upload
 */
export const uploadDriveFile = async (options: {
  name: string;
  mimeType: string;
  content: string | Blob;
  parentId?: string;
  description?: string;
}): Promise<DriveFile> => {
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata: any = {
    name: options.name,
    mimeType: options.mimeType,
  };

  if (options.parentId) {
    metadata.parents = [options.parentId];
  }

  if (options.description) {
    metadata.description = options.description;
  }

  let fileContentBlob: Blob;
  if (typeof options.content === 'string') {
    fileContentBlob = new Blob([options.content], { type: options.mimeType });
  } else {
    fileContentBlob = options.content;
  }

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`;
  const mediaHeader = `${delimiter}Content-Type: ${options.mimeType}\r\n\r\n`;

  const multipartBody = new Blob([metadataPart, mediaHeader, fileContentBlob, closeDelimiter]);

  const token = getAccessToken();
  if (!token) {
    throw new Error('No hay sesión activa de Google Drive');
  }

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,size,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    let msg = res.statusText;
    try {
      const json = JSON.parse(errorBody);
      if (json.error?.message) msg = json.error.message;
    } catch {}
    throw new Error(`Error al subir a Google Drive (${res.status}): ${msg}`);
  }

  return await res.json();
};

/**
 * Delete a file in Google Drive
 */
export const deleteDriveFile = async (fileId: string): Promise<void> => {
  await driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
  });
};

/**
 * Helper to generate CPO-12 Executive Summary Report in Markdown
 */
export const generateCPO12MarkdownReport = (): string => {
  const now = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `# INFORME EJECUTIVO DE CUMPLIMIENTO AMBIENTAL & ESTRATEGIA INTEGRADA
## BLOQUE CPO-12 | FRONTERA ENERGY COLOMBIA
**Licencia Ambiental:** LAM5475 (Resolución 2167 de 2010 / 0846 de 2011)  
**Autoridades Competentes:** ANLA (Nacional) | Cormacarena (Regional)  
**Fecha de Emisión:** ${now}  
**Hito Crítico Regulatorio:** 29 de Agosto de 2026 (Resolución 01712 de 2024 ANLA)

---

### 1. ESTADO ACTUAL DE LAS OBLIGACIONES AMBIENTALES
- **Inversión Forzosa del 1% (10,00 Ha Totales):**
  - **Lote 1 (Cuenca Caño Pilón):** 4,00 Ha en Finca La Holanda (Siembra 2019, Mantenimientos 2021-2023 concluidos, NDVI > 0.65). Listo para solicitud de cierre parcial ante ANLA.
  - **Lote 2 (Cuenca Río Planas):** 2,00 Ha en Reserva Natural Tomogrande (Siembra 2020, afectado por fuego en 2024, rebrote natural > 78%).
  - **Lote 3 (Cuenca Río Planas):** 4,00 Ha en Finca El Oasis (Siembra 2021, afectado por fuego en 2024, rebrote natural > 72%).
  - *Estrategia Propuesta:* Reconocimiento de regeneración natural y reconversión a Cosecha de Agua / Reservorios multifuncionales según Decreto 1076/2015.

- **Compensación por Pérdida de Biodiversidad (30,40 Ha Totales):**
  - **Lotes La Holanda & Bellavista:** 22,00 Ha en consolidación con acuerdos de conservación y monitoreo satelital NDVI.
  - **Lote 3 Tomogrande:** 8,40 Ha bajo enriquecimiento y mantenimiento.
  - **Estado:** 100% de hectáreas implementadas con seguimiento biótico permanente.

- **Expediente Sancionatorio ANLA (SAN0002-00-2018):**
  - **Cargo Único:** Presunto vencimiento en ejecución de la Inversión del 1% bajo Resolución 2167 de 2010.
  - **Descargos y Estrategia de Defensa:** Radicación de pruebas de fuerza mayor (incendios forestales atípicos de la Orinoquía, bloqueos viales) + acreditación de las 4,00 Ha concluidas de Caño Pilón.
  - **Mitigación del Riesgo:** El cumplimiento del hito del 29-Ago-2026 extingue la causal sancionatoria principal.

---

### 2. MATRIZ DE ESCENARIOS FINANCIEROS Y ESTRATÉGICOS
- **Escenario 1 (Conservador - Resiembra Tradicional):**
  - Presupuesto Total: $COP ${STRATEGIC_SCENARIOS.scenario1.totalCOP.toLocaleString('es-CO')}
  - Tiempo de Ejecución: ${STRATEGIC_SCENARIOS.scenario1.executionTimeYears} años
  - Riesgo Biótico: ${STRATEGIC_SCENARIOS.scenario1.bioticRisk}
- **Escenario 2 (Estratégico Eficiente - Reconversión Cosecha de Agua & Blindaje):**
  - Presupuesto Total: $COP ${STRATEGIC_SCENARIOS.scenario2.totalCOP.toLocaleString('es-CO')}
  - Tiempo de Ejecución: ${STRATEGIC_SCENARIOS.scenario2.executionTimeYears} años
  - Ahorro Directo Proyectado: $COP ${STRATEGIC_SCENARIOS.scenario2.savingsCOP.toLocaleString('es-CO')} (32.4% de optimización de CAPEX ambiental)
  - Beneficios: Protección hídrica permanente contra sequías e incendios en Sabana del Meta.

---

### 3. PROTOCOLO DE AUDITORÍA Y MONITOREO SATELITAL
- Sensores Utilizados: Sentinel-2 Multispectral Instrument (MSI) & Landsat 8/9 OLI.
- Umbral de Cobertura Saludable: NDVI ≥ 0.60 (Vigor foliar verificado).
- Cumplimiento de Sobrevivencia Promedio: > 78% con evidencias georreferenciadas en formato Shapefile / GDB MAGNA-SIRGAS Origen Nacional.

Documento autogenerado para respaldo técnico y trazabilidad legal en Google Drive.
`;
};

/**
 * Helper to generate CPO-12 Structured JSON Dataset
 */
export const generateCPO12JsonDataset = (): string => {
  const dataset = {
    metadata: {
      block: 'CPO-12',
      operator: 'Frontera Energy Colombia',
      license: 'LAM5475',
      exportDate: new Date().toISOString(),
      resolutionANLA: '01712 de 2024',
      criticalDeadline: '2026-08-29',
    },
    obligaciones: {
      inversion1Porciento: BASINS_1_PERCENT,
      compensacionBiotica: LOTES_COMPENSACION,
      cosechaAguaSismica: SEISMIC_WATER_COSTS,
      consolidadoCosechaAgua: TOTAL_WATER_HARVEST,
    },
    escenariosFinancieros: STRATEGIC_SCENARIOS,
    normativaChecklist: NEW_SCENARIOS.normativeChecklist,
  };

  return JSON.stringify(dataset, null, 2);
};

/**
 * Helper to generate CPO-12 Executive Briefing Text
 */
export const generateCPO12BriefingText = (): string => {
  return `MEMORANDO EJECUTIVO - CPO-12 FRONTERA ENERGY
AUTORIDAD: ANLA / CORMACARENA | LICENCIA: LAM5475
=====================================================
FECHA: ${new Date().toLocaleDateString('es-CO')}
HITO CRÍTICO: 29-AGOSTO-2026

RESUMEN DE OBLIGACIONES CLAVE:
1. Inversión 1% (10,00 Ha):
   - Lote 1 (4,00 Ha): Completado y listo para cierre parcial ANLA.
   - Lotes 2 y 3 (6,00 Ha): Reconocimiento de rebrote post-fuego y reconversión a Cosecha de Agua.
2. Compensación Biótica (30,40 Ha):
   - 100% de área intervenida con acuerdos de conservación vigentes.
3. Sancionatorio SAN0002-00-2018:
   - En etapa probatoria con descargos técnicos y mitigación de riesgo vía Auto 01712.
4. Presupuesto Óptimo Escenario 2:
   - $COP ${STRATEGIC_SCENARIOS.scenario2.totalCOP.toLocaleString('es-CO')} (Ahorro de $COP ${STRATEGIC_SCENARIOS.scenario2.savingsCOP.toLocaleString('es-CO')}).
=====================================================`;
};
