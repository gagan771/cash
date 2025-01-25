import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/nav-menu"
import { InteractiveGrid } from "@/components/ui/interactive-grid"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { Particles } from "@/components/ui/particles"
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <InteractiveGrid />
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
      <header className="sticky top-0 border-b bg-white/50 backdrop-blur-sm">
        
      </header>
      <main className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to <AnimatedGradientText>Cash.AI</AnimatedGradientText>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          An All-in-One Platform to Meet All Your Financial Needs in One Place.
          </p>
          <div className="flex gap-4">
            <Button size="lg" variant="outline">
              Try for free
            </Button>
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

