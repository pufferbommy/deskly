import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { WifiIcon, ZapIcon, Volume2Icon, MapPinIcon, StarIcon, SlidersHorizontalIcon, Search, BookmarkIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/ui/input-group'
import { useLiveQuery } from "dexie-react-hooks"
import { db } from '#/lib/db'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

import MOCK_PLACES from '../../public/data/places.json'

const calculateWorkScore = (wifi: string, outlets: string, noise: string) => {
  let score = 0
  
  // Wi-Fi (40%)
  if (wifi === 'good') score += 40
  else if (wifi === 'ok') score += 20
  
  // Outlets (30%)
  if (outlets === 'yes') score += 30
  
  // Noise (30%)
  if (noise === 'quiet') score += 30
  else if (noise === 'medium') score += 15
  
  return score
}

const filters = [
  { label: 'Open Now', value: 'open-now' },
  { label: 'Good Wi-Fi', value: 'good-wifi' },
  { label: 'Quiet', value: 'quiet' },
  { label: 'Outlets', value: 'outlets' },
]

function RouteComponent() {
  const savedPlaces = useLiveQuery(() => db.savedPlaces.toArray())
  const savedIds = new Set(savedPlaces?.map(p => p.placeId) || [])

  return (
    <>
      {/* Header & Search */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Nearby Work Spots</h1>
          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <MapPinIcon className="size-4" /> Bangkok, Thailand
          </p>
        </div>

        <div className='flex gap-2'>
          <InputGroup className='h-(--input-group-height) [--input-group-height:calc(var(--spacing)*10)]'>
            <InputGroupAddon className='h-(--input-group-height)'>
              <Search />
            </InputGroupAddon>
            <InputGroupInput className='h-(--input-group-height)' placeholder="Search cafes, coworking..." />
          </InputGroup>
          <Button variant="outline" size="icon-lg">
            <SlidersHorizontalIcon />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <Button key={filter.value} variant={filter.value === 'open-now' ? 'secondary' : 'outline'} size="lg">{filter.label}</Button>
          ))}
        </div>
      </div>

      {/* List View */}
      <div className="grid gap-4">
        {MOCK_PLACES.map((place) => {
          const workScore = calculateWorkScore(place.wifi, place.outlets, place.noise)
          const isSaved = savedIds.has(place.id)
          
          return (
            <Card key={place.id} className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all p-0 overflow-hidden group">
              <div className="flex flex-col sm:flex-row relative">
                
                {/* Bookmark Toggle */}
                <button 
                  onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (isSaved) {
                      await db.savedPlaces.delete(place.id)
                    } else {
                      await db.savedPlaces.add({ placeId: place.id, savedAt: Date.now() })
                    }
                  }}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full shadow-sm bg-background/80 hover:bg-background backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <BookmarkIcon className={`size-4 transition-colors ${isSaved ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"}`} />
                </button>

                {/* Thumbnail */}
                <div className="relative w-full sm:w-40 h-48 sm:h-auto shrink-0">
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-[10px] px-1.5 py-0.5">
                      {place.distance}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="flex-1 p-5 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg hover:text-primary transition-colors">{place.name}</h3>
                      <Badge variant="default" className="bg-primary/10 text-primary border-none text-[10px] font-bold px-2 py-0.5 leading-tight uppercase">
                        Score: {workScore}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="h-7 gap-1.5 font-normal text-muted-foreground bg-muted/30 border-border/50 rounded-lg">
                        <WifiIcon className={place.wifi === 'good' ? "size-3 text-emerald-500" : "size-3 text-amber-500"} />
                        {place.wifi === 'good' ? 'Fast' : 'Stable'}
                      </Badge>
                      <Badge variant="outline" className="h-7 gap-1.5 font-normal text-muted-foreground bg-muted/30 border-border/50 rounded-lg">
                        <ZapIcon className={place.outlets === 'yes' ? "size-3 text-amber-500" : "size-3 text-muted-foreground/30"} />
                        {place.outlets === 'yes' ? 'Power' : 'None'}
                      </Badge>
                      <Badge variant="outline" className="h-7 gap-1.5 font-normal text-muted-foreground bg-muted/30 border-border/50 rounded-lg">
                        <Volume2Icon className={place.noise === 'quiet' ? "size-3 text-emerald-500" : "size-3 text-amber-500"} />
                        {place.noise.charAt(0).toUpperCase() + place.noise.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1">
                      <StarIcon className="size-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold">{place.rating}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {place.tags.map(tag => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
