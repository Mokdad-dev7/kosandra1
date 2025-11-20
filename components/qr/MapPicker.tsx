'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, Search, Check } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })

interface MapPickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (location: { latitude: number; longitude: number; address?: string }) => void
  initialLatitude?: number
  initialLongitude?: number
}

// Map click handler component - must be inside MapContainer
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  const MapClickHandlerInner = dynamic(
    () =>
      import('react-leaflet').then((mod) => {
        const { useMapEvents } = mod
        return function Inner({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
          useMapEvents({
            click: (e: any) => {
              onMapClick(e.latlng.lat, e.latlng.lng)
            },
          })
          return null
        }
      }),
    { ssr: false }
  )
  return <MapClickHandlerInner onMapClick={onMapClick} />
}

export function MapPicker({ open, onOpenChange, onSelect, initialLatitude, initialLongitude }: MapPickerProps) {
  const [latitude, setLatitude] = useState(initialLatitude || 40.7128)
  const [longitude, setLongitude] = useState(initialLongitude || -74.0060)
  const [searchQuery, setSearchQuery] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (open) {
      if (initialLatitude && initialLongitude) {
        setLatitude(initialLatitude)
        setLongitude(initialLongitude)
        reverseGeocode(initialLatitude, initialLongitude)
      } else {
        // Try to get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
              reverseGeocode(position.coords.latitude, position.coords.longitude)
            },
            () => {
              // Use default location if geolocation fails
            }
          )
        }
      }
    }
  }, [open, initialLatitude, initialLongitude])

  const handleMapClick = (lat: number, lng: number) => {
    setLatitude(lat)
    setLongitude(lng)
    reverseGeocode(lat, lng)
  }

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      // Use Nominatim (OpenStreetMap) for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'QR Snap Website',
          },
        }
      )
      const data = await response.json()
      if (data.display_name) {
        setAddress(data.display_name)
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      // Use Nominatim for geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
        {
          headers: {
            'User-Agent': 'QR Snap Website',
          },
        }
      )
      const data = await response.json()
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        setLatitude(lat)
        setLongitude(lng)
        setAddress(data[0].display_name)
      }
    } catch (error) {
      console.error('Geocoding failed:', error)
      alert('Failed to find location. Please try again.')
    }
  }

  const handleConfirm = () => {
    onSelect({
      latitude,
      longitude,
      address: address || undefined,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
          <DialogDescription>
            Click on the map or search for a location to set coordinates
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
              />
            </div>
            <Button onClick={handleSearch} type="button">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Map */}
          <div className="h-[400px] w-full rounded-lg overflow-hidden border">
            {typeof window !== 'undefined' && (
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                key={`${latitude}-${longitude}`}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]} />
                <MapClickHandler onMapClick={handleMapClick} />
              </MapContainer>
            )}
          </div>

          {/* Coordinates Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Latitude</Label>
              <Input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => {
                  const lat = parseFloat(e.target.value)
                  if (!isNaN(lat)) {
                    setLatitude(lat)
                    reverseGeocode(lat, longitude)
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Longitude</Label>
              <Input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => {
                  const lng = parseFloat(e.target.value)
                  if (!isNaN(lng)) {
                    setLongitude(lng)
                    reverseGeocode(latitude, lng)
                  }
                }}
              />
            </div>
          </div>

          {/* Address Display */}
          {address && (
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{address}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              <Check className="w-4 h-4 mr-2" />
              Confirm Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
