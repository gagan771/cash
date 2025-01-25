"use client"

import { AnimatedText } from "@/components/ui/animated-text"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Particles } from "@/components/ui/particles"
import Link from "next/link"

const tools = [
  { name: "Compound Interest Calculator", route: "/tools/compound-interest" },
  { name: "Loan Calculator", route: "/tools/loan-calculator" },
  { name: "Retirement Calculator", route: "/tools/retirement-calculator" },
  { name: "Budget Planner", route: "/tools/budget-planner" },
  { name: "Investment Returns Calculator", route: "/tools/investment-returns" },
  { name: "Mortgage Calculator", route: "/tools/mortgage-calculator" },
]

export function ToolsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
      <div className="container mx-auto px-4 py-16">
        <AnimatedText className="text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Get Your All  Financial Calculators  and  Tools Here
        </AnimatedText>
        <Card className="mt-12 bg-white/10 backdrop-blur-sm">
          <CardContent className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4">
            {tools.map((tool) => (
              <Link key={tool.route} href={tool.route}>
                <Button variant="outline" className="w-full">
                  {tool.name}
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

