"use client"

import { AnimatedText } from "@/components/ui/animated-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { Card, CardContent } from "@/components/ui/card"

import Link from "next/link"


const tools = [
  { name: "EMI Calculator", route: "/tools/emi" },
  { name: "EPF Calculator", route: "/tools/EPFCALCULATOR" },
  { name: "SIP Calculator", route: "/tools/sipcalcu" },
  { name: "FD Calculator", route: "/tools/fdcalcu" },
  { name: "HRA Calculator", route: "/tools/hracalcu" },
  { name: "NPS Calculator", route: "/tools/npscalcu" },
  { name: "PPF Calculator", route: "/tools/ppfcalcu" },
  { name: "RD Calculator", route: "/tools/rdcalcu" },
  { name: "Salary Calculator", route: "/tools/SalaryCalculator" },
]

export function ToolsPage() {
  return (
    <div className="relative min-h-screen ">
      
      <div className="container mx-auto px-4 py-16">
        <AnimatedText className="text-center text-4xl font-bold text-blue sm:text-5xl md:text-6xl lg:text-7xl">
          Get Your All Financial Calculators and Tools Here
        </AnimatedText>
        <Card className="mt-12 bg-white/10 backdrop-blur-sm border-rounded-xl">
          <CardContent className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.route} href={tool.route} passHref>
                <ShimmerButton
                  className="w-full text-white font-semibold border-rounded-xl"
                  background="linear-gradient(45deg,rgba(225, 225, 225, 0.96),rgba(237, 16, 145, 0.87))"
                  shimmerColor="rgb(251, 0, 217)"
                >
                  {tool.name}
                </ShimmerButton>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}