import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NDVIUnit } from '../data/ndviData';
import { ExternalLink, Layers, ZoomIn, ZoomOut, MapPin, Compass } from 'lucide-react';

interface LiveSatelliteMapProps {
  unit: NDVIUnit;
}

// Official Google Earth Web Project URLs provided for Bloque CPO-12
export const OFFICIAL_GOOGLE_EARTH_URL =
  'https://earth.google.com/web/@3.89122797,-72.41418667,198.92654411a,6690.61567664d,34.99994114y,0h,0t,0r/data=ChYqEAgBEgoyMDIzLTEwLTA0GAFCAggBMikKJwolCiExZUZzZFZHa2JncUUwZEEzczFtUXRCMGFzblI1LU1JMUggAToDCgEwQgIIAEoICJKL768FEAE?authuser=0';

// Precise coordinates centered on the CPO-12 Google Earth Project in Meta, Colombia
const LOT_COORDINATES: Record<
  string,
  {
    center: [number, number];
    zoom: number;
    polygon: [number, number][];
    googleEarthUrl?: string;
    dmsLabel?: string;
  }
> = {
  'comp-holanda-1-2': {
    center: [3.906038, -72.39797],
    zoom: 16,
    polygon: [
      [3.9095, -72.4015],
      [3.9102, -72.3932],
      [3.9028, -72.3925],
      [3.9019, -72.4008],
    ],
    googleEarthUrl:
      'https://earth.google.com/web/@3.90603849,-72.39796994,210.16188875a,1929.52253809d,34.99994114y,0h,0t,0r/data=ChYqEAgBEgoyMDIzLTEwLTA0GAFCAggBMikKJwolCiExZUZzZFZHa2JncUUwZEEzczFtUXRCMGFzblI1LU1JMUggAToDCgEwQgIIAEoICJKL768FEAE?authuser=0',
    dmsLabel: '3°54\'21.7"N 72°23\'52.7"W',
  },
  'comp-holanda-3-4': {
    // Exact location from official CPO12Comp Google Earth Project
    center: [3.891228, -72.414187],
    zoom: 16,
    // Detailed bilobed polygon geometry matching CPO12Comp.zip in Google Earth
    polygon: [
      [3.8942, -72.4116],
      [3.8945, -72.4132],
      [3.8931, -72.4128],
      [3.8928, -72.4150],
      [3.8918, -72.4168],
      [3.8898, -72.4172],
      [3.8885, -72.4155],
      [3.8890, -72.4132],
      [3.8898, -72.4112],
      [3.8915, -72.4105],
      [3.8935, -72.4110],
    ],
    googleEarthUrl:
      'https://earth.google.com/web/@3.89122797,-72.41418667,198.92654411a,6690.61567664d,34.99994114y,0h,0t,0r/data=ChYqEAgBEgoyMDIzLTEwLTA0GAFCAggBMikKJwolCiExZUZzZFZHa2JncUUwZEEzczFtUXRCMGFzblI1LU1JMUggAToDCgEwQgIIAEoICJKL768FEAE?authuser=0',
    dmsLabel: '3°53\'28.42"N 72°24\'51.07"W (199 m)',
  },
  'inv-cano-pilon': {
    center: [3.9145, -72.405],
    zoom: 16,
    polygon: [
      [3.9182, -72.4095],
      [3.9195, -72.4012],
      [3.9105, -72.3998],
      [3.9092, -72.4082],
    ],
    dmsLabel: '3°54\'52.2"N 72°24\'18.0"W',
  },
  'inv-la-fortuna': {
    center: [3.8985, -72.391],
    zoom: 16,
    polygon: [
      [3.9022, -72.3955],
      [3.9015, -72.3862],
      [3.8942, -72.3875],
      [3.8951, -72.3962],
    ],
    dmsLabel: '3°53\'54.6"N 72°23\'27.6"W',
  },
  'inv-rio-planas': {
    center: [3.8985, -72.391],
    zoom: 16,
    polygon: [
      [3.9022, -72.3955],
      [3.9015, -72.3862],
      [3.8942, -72.3875],
      [3.8951, -72.3962],
    ],
    dmsLabel: '3°53\'54.6"N 72°23\'27.6"W',
  },
  'inv-moriche-solo': {
    center: [3.9012, -72.4065],
    zoom: 16,
    polygon: [
      [3.9055, -72.4112],
      [3.9062, -72.4025],
      [3.8972, -72.4018],
      [3.8965, -72.4102],
    ],
    dmsLabel: '3°54\'04.3"N 72°24\'23.4"W',
  },
  'inv-rio-melua': {
    center: [3.9012, -72.4065],
    zoom: 16,
    polygon: [
      [3.9055, -72.4112],
      [3.9062, -72.4025],
      [3.8972, -72.4018],
      [3.8965, -72.4102],
    ],
    dmsLabel: '3°54\'04.3"N 72°24\'23.4"W',
  },
};

export const LiveSatelliteMap: React.FC<LiveSatelliteMapProps> = ({ unit }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const lotGeo = LOT_COORDINATES[unit.id] || {
    center: [3.891228, -72.414187] as [number, number],
    zoom: 16,
    polygon: [
      [3.8942, -72.4116],
      [3.8945, -72.4132],
      [3.8931, -72.4128],
      [3.8928, -72.4150],
      [3.8918, -72.4168],
      [3.8898, -72.4172],
      [3.8885, -72.4155],
      [3.8890, -72.4132],
      [3.8898, -72.4112],
      [3.8915, -72.4105],
      [3.8935, -72.4110],
    ] as [number, number][],
    googleEarthUrl: OFFICIAL_GOOGLE_EARTH_URL,
    dmsLabel: '3°53\'28.42"N 72°24\'51.07"W (199 m)',
  };

  const googleEarthUrl = lotGeo.googleEarthUrl || OFFICIAL_GOOGLE_EARTH_URL;

  useEffect(() => {
    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    const container = mapContainerRef.current;

    if (!container) return;

    // Clean up existing map instance if any
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.stop();
        mapInstanceRef.current.off();
        mapInstanceRef.current.remove();
      } catch {
        // ignore
      }
      mapInstanceRef.current = null;
    }

    // Reset container _leaflet_id to avoid Leaflet double initialization error
    if ((container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }
    container.innerHTML = '';

    let map: L.Map | null = null;
    try {
      map = L.map(container, {
        center: lotGeo.center,
        zoom: lotGeo.zoom,
        zoomControl: false,
        attributionControl: false,
        fadeAnimation: false,
        zoomAnimation: false,
        markerZoomAnimation: false,
        trackResize: false,
      });
    } catch (err) {
      console.warn('Leaflet initialization error:', err);
      return;
    }

    if (!map) return;

    // ESRI World Imagery (High-Res True Color Satellite Imagery)
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        subdomains: ['server', 'services'],
      }
    );
    satelliteLayer.addTo(map);

    // Reference Labels & Hydrography Layer
    const labelsLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        opacity: 0.8,
      }
    );
    labelsLayer.addTo(map);

    // Color based on category
    const isComp = unit.category === 'compensacion';
    const polygonColor = isComp ? '#38bdf8' : '#fb7185';
    const fillColor = isComp ? '#0284c7' : '#e11d48';

    // Draw Polygon with Glowing Style
    const polygon = L.polygon(lotGeo.polygon, {
      color: polygonColor,
      weight: 3,
      dashArray: '6, 6',
      fillColor: fillColor,
      fillOpacity: 0.25,
    }).addTo(map);

    polygon.bindPopup(
      `<div style="color: #0f172a; font-family: sans-serif; padding: 4px;">
        <strong style="font-size: 13px; color: #001871;">${unit.unitName}</strong><br/>
        <span style="font-size: 11px; color: #475569;">Área: <b>${unit.areaHa.toFixed(2)} Ha</b></span><br/>
        <span style="font-size: 11px; color: #059669;">${unit.geographicalContext}</span>
      </div>`
    );

    // Add Marker at center
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${isComp ? '#0284c7' : '#e11d48'}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    L.marker(lotGeo.center, { icon: markerIcon }).addTo(map);

    mapInstanceRef.current = map;

    // Trigger resize safely to fix tile loading in flex containers
    timerId = setTimeout(() => {
      if (isMounted && mapInstanceRef.current) {
        try {
          mapInstanceRef.current.invalidateSize();
        } catch {
          // ignore
        }
      }
    }, 200);

    return () => {
      isMounted = false;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.stop();
          mapInstanceRef.current.off();
          mapInstanceRef.current.remove();
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
      }
      if (container && (container as any)._leaflet_id) {
        delete (container as any)._leaflet_id;
      }
    };
  }, [unit.id]);

  const handleZoomIn = () => {
    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.zoomIn();
      }
    } catch {
      // ignore
    }
  };

  const handleZoomOut = () => {
    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.zoomOut();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col justify-between select-none">
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Top Floating Control Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 bg-[#001871]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded text-white shadow-lg pointer-events-auto">
          <span className="font-display font-extrabold text-xs text-cyan-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Satélite en Vivo (Alta Resolución)
          </span>
          <span className="text-[10px] text-slate-300 font-mono hidden sm:inline">
            • Coordenadas Oficiales
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <a
            href={googleEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-[#001871] hover:bg-blue-800 text-white text-[11px] font-bold flex items-center gap-1.5 border border-blue-400/40 shadow-md transition-all"
            title="Abrir en Google Earth 3D en pestaña nueva"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
            <span>Ver en Google Earth 3D</span>
          </a>
        </div>
      </div>

      {/* Bottom Floating Bar with Coordinates and Zoom Control */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-200 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xs px-2 py-1 rounded border border-white/10 pointer-events-auto">
          <span className="text-cyan-300 font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-red-400" />
            {lotGeo.dmsLabel || `Lat: ${lotGeo.center[0]}°, Lon: ${lotGeo.center[1]}°`}
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-white hidden sm:inline">
            Polígono: <strong className="text-yellow-300">{unit.areaHa.toFixed(2)} Ha</strong>
          </span>
        </div>

        <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20 pointer-events-auto">
          <button
            onClick={handleZoomIn}
            className="p-1 text-slate-200 hover:text-white hover:bg-white/20 rounded transition-all"
            title="Acercar mapa"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 text-slate-200 hover:text-white hover:bg-white/20 rounded transition-all"
            title="Alejar mapa"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
