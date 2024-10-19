'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  route: [number, number][]
}

const MapComponent: React.FC<MapComponentProps> = ({ route }) => {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([51.505, -0.09], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current)
      }

      const map = mapRef.current

      map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer)
        }
      })

      if (route.length > 0) {
        L.polyline(route, { color: 'blue' }).addTo(map)
        map.fitBounds(route)
      }
    }
  }, [route])

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>
}

export default MapComponent