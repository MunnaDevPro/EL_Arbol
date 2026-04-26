'use client'

import { useEffect, useRef } from 'react'

export default function LeafletMap({ stores, activeStoreId, userLocation, onStoreClick }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const userMarkerRef = useRef(null)

  // ── Build a Leaflet divIcon matching the design ─────────────
  function buildIcon(L, isActive) {
    const size = isActive ? 46 : 36
    return L.divIcon({
      className: '',
      html: `<div style="
        width:${size}px;height:${size}px;
        background:${isActive ? '#00694c' : '#2a6959'};
        border:3px solid white;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 14px rgba(0,33,21,0.35);
        cursor:pointer;transition:transform 0.15s;
      ">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13
            c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5" fill="white" stroke="none"/>
        </svg>
      </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -size],
    })
  }// ── Add / refresh all store markers ─────────────────────────
function refreshMarkers(L, map) {
    // Remove old markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    // Jodi stores na thake, tobe ekhanei return korbe, niche jabe na
    if (!stores || !Array.isArray(stores)) return;

    stores.forEach((store) => {
        const isActive = store.id === activeStoreId;
        const marker = L.marker([store.lat, store.lng], { icon: buildIcon(L, isActive) })
            .addTo(map)
            .on('click', () => onStoreClick(store.id));

        // Label tooltip on hover
        marker.bindTooltip(store.shortName, {
            permanent: false,
            direction: 'top',
            className: 'leaflet-store-tooltip',
            offset: [0, -4],
        });

        markersRef.current[store.id] = marker;
    });
}
  // ── Initialise map once ──────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return

    // Inject Leaflet CSS if not present
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)

      // Inject custom tooltip style
      const style = document.createElement('style')
      style.textContent = `
        .leaflet-store-tooltip {
          background: #151e13; color: #fff; border: none;
          border-radius: 6px; padding: 4px 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.03em;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        .leaflet-store-tooltip::before { display: none; }
        .leaflet-control-attribution { font-size: 9px; opacity: 0.6; }
      `
      document.head.appendChild(style)
    }

    // Load Leaflet JS (or reuse if already loaded)
    const initMap = (L) => {
      if (mapRef.current) return

      const center = userLocation ? [userLocation.lat, userLocation.lng] : [40.38, -3.76]

      const map = L.map(containerRef.current, {
        center,
        zoom: 11,
        zoomControl: false,
      })

      // Light OSM tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        opacity: 0.75,
      }).addTo(map)

      // Zoom control bottom-right
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      refreshMarkers(L, map)

      // User location dot
      if (userLocation) {
        userMarkerRef.current = L.circleMarker(
          [userLocation.lat, userLocation.lng],
          { radius: 9, fillColor: '#1D9E75', color: 'white', weight: 3, fillOpacity: 1 }
        ).addTo(map).bindTooltip('You are here', { permanent: false })
      }

      mapRef.current = map
    }

    if (window.L) {
      initMap(window.L)
    } else {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => initMap(window.L)
      document.head.appendChild(script)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = {}
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Update markers when activeStoreId changes ────────────────
  useEffect(() => {
    if (!mapRef.current || !window.L) return
    refreshMarkers(window.L, mapRef.current)

    // Pan to active store
    const active = stores.find((s) => s.id === activeStoreId)
    if (active) mapRef.current.panTo([active.lat, active.lng], { animate: true })
  }, [activeStoreId]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Add user marker when location arrives ────────────────────
  useEffect(() => {
    if (!mapRef.current || !window.L || !userLocation) return
    if (userMarkerRef.current) mapRef.current.removeLayer(userMarkerRef.current)
    userMarkerRef.current = window.L.circleMarker(
      [userLocation.lat, userLocation.lng],
      { radius: 9, fillColor: '#1D9E75', color: 'white', weight: 3, fillOpacity: 1 }
    ).addTo(mapRef.current).bindTooltip('You are here')
    mapRef.current.setView([userLocation.lat, userLocation.lng], 12, { animate: true })
  }, [userLocation])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '300px' }} />
}