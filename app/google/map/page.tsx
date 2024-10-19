'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Car, Plane, Train } from 'lucide-react'

// OpenRouteService API key - sign up for free at https://openrouteservice.org/
const ORS_API_KEY = '5b3ce3597851110001cf6248d02979f5907f4767b0a3dad88719c3a5'

type TravelMode = 'driving-car' | 'foot-walking' | 'cycling-regular' | 'train' | 'flying'

const MapComponent = dynamic(() => import('@/components/MapComponents'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
})

export default function FreeTravelCarbonCalculator() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [distance, setDistance] = useState(0)
  const [carbonFootprint, setCarbonFootprint] = useState(0)
  const [travelMode, setTravelMode] = useState<TravelMode>('driving-car')
  const [route, setRoute] = useState<[number, number][]>([])

  const calculateRoute = async () => {
    try {
      const originCoords = await getCoordinates(origin)
      const destCoords = await getCoordinates(destination)

      if (!originCoords || !destCoords) {
        alert('Unable to find coordinates for the given locations.')
        return
      }

      const url = `https://api.openrouteservice.org/v2/directions/${travelMode}?api_key=${ORS_API_KEY}&start=${originCoords.join(',')}&end=${destCoords.join(',')}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.features && data.features.length > 0) {
        const route = data.features[0]
        const routeDistance = route.properties.segments[0].distance / 1000 // Convert to kilometers

        setDistance(routeDistance)
        calculateCarbonFootprint(routeDistance)

        const routeCoordinates = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]])
        setRoute(routeCoordinates)
      }
    } catch (error) {
      console.error('Error calculating route:', error)
      alert('An error occurred while calculating the route. Please try again.')
    }
  }

  const getCoordinates = async (place: string): Promise<[number, number] | null> => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
    const response = await fetch(url)
    const data = await response.json()

    if (data && data.length > 0) {
      return [parseFloat(data[0].lon), parseFloat(data[0].lat)]
    }
    return null
  }

  const calculateCarbonFootprint = (distance: number) => {
    const emissionFactors: Record<TravelMode, number> = {
      'driving-car': 0.192,
      'foot-walking': 0,
      'cycling-regular': 0,
      'train': 0.041,
      'flying': 0.255,
    }

    const footprint = distance * emissionFactors[travelMode]
    setCarbonFootprint(footprint)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Free Travel Carbon Footprint Calculator</CardTitle>
          <CardDescription>Calculate the carbon footprint of your journey using free APIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    placeholder="Enter your starting point"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Enter your destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="travel-mode">Travel Mode</Label>
                  <Select value={travelMode} onValueChange={(value: TravelMode) => setTravelMode(value)}>
                    <SelectTrigger id="travel-mode">
                      <SelectValue placeholder="Select travel mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driving-car"><Car className="inline-block mr-2" />Driving</SelectItem>
                      <SelectItem value="foot-walking">Walking</SelectItem>
                      <SelectItem value="cycling-regular">Cycling</SelectItem>
                      <SelectItem value="train"><Train className="inline-block mr-2" />Train</SelectItem>
                      <SelectItem value="flying"><Plane className="inline-block mr-2" />Flying</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={calculateRoute} className="w-full">Calculate Route</Button>
              </div>
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Results</h3>
                <p>Distance: {distance.toFixed(2)} km</p>
                <p>Carbon Footprint: {carbonFootprint.toFixed(2)} kg CO2</p>
              </div>
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapComponent route={route} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 flex items-center">
            <AlertCircle className="inline-block mr-2" />
            Carbon footprint calculations are estimates and may vary based on specific vehicles and conditions.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}