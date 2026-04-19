import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { WifiIcon, ZapIcon, Volume2Icon, StarIcon, BookmarkIcon } from 'lucide-react'

export const Route = createFileRoute('/saved')({
  component: SavedPlacesComponent,
})

// Using a subset of places to simulate "saved" ones
const SAVED_PLACES = [
  {
    id: '1',
    name: 'The Common Coffee',
    distance: '0.5 km',
    wifi: 'good',
    outlets: 'yes',
    noise: 'quiet',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=400&h=300&auto=format&fit=crop',
    tags: ['Quiet', 'Fast Wi-Fi', 'Aircon'],
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Digital Nomad Hub',
    distance: '1.2 km',
    wifi: 'good',
    outlets: 'yes',
    noise: 'medium',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=400&h=300&auto=format&fit=crop',
    tags: ['Meeting Rooms', 'Phone Booths'],
    rating: 4.5,
  },
]

const calculateWorkScore = (wifi: string, outlets: string, noise: string) => {
  let score = 0
  if (wifi === 'good') score += 40
  else if (wifi === 'ok') score += 20
  
  if (outlets === 'yes') score += 30
  
  if (noise === 'quiet') score += 30
  else if (noise === 'medium') score += 15
  
  return score
}

function SavedPlacesComponent() {
  return (
    <>
      {/* Header */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col gap-1 border-b pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Saved Places</h1>
          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <BookmarkIcon className="size-4 fill-primary text-primary" /> You have {SAVED_PLACES.length} saved spots
          </p>
        </div>
      </div>

      {/* List View */}
      <div className="grid gap-4">
        {SAVED_PLACES.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">You haven't saved any places yet.</p>
          </div>
        ) : (
          SAVED_PLACES.map((place) => {
            const workScore = calculateWorkScore(place.wifi, place.outlets, place.noise)
            
            return (
              <Card key={place.id} className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all p-0 overflow-hidden group">
                <div className="flex flex-col sm:flex-row relative">
                  
                  {/* Remove Bookmark Button Overlay */}
                  <div className="absolute top-2 right-2 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-background">
                     <BookmarkIcon className="size-4 fill-primary text-primary" />
                  </div>

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
                        <h3 className="font-bold text-lg hover:text-primary transition-colors pr-8">{place.name}</h3>
                        <Badge variant="default" className="bg-primary/10 text-primary border-none text-[10px] font-bold px-2 py-0.5 leading-tight uppercase shrink-0">
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
                      <div className="flex gap-1.5 flex-wrap">
                        {place.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[10px] py-0">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </>
  )
}
