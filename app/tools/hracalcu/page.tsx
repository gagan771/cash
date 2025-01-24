"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { IndianRupee } from "lucide-react"

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(600000)
  const [hraReceived, setHraReceived] = useState<number>(240000)
  const [totalRentPaid, setTotalRentPaid] = useState<number>(180000)
  const [city, setCity] = useState<boolean>(true) // Assuming true means metro city
  const [result, setResult] = useState<{ exemptedHra: string; taxableHra: string } | null>(null)

  const calculateHRA = () => {
    const fiftyPercentSalary = basicSalary * 0.5
    const rentExcess = totalRentPaid - basicSalary * 0.1
    const exemptedHra = Math.min(hraReceived, fiftyPercentSalary, rentExcess)

    const taxableHra = hraReceived - exemptedHra

    setResult({
      exemptedHra: `₹${exemptedHra.toFixed(2)}`,
      taxableHra: `₹${taxableHra.toFixed(2)}`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About HRA Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            Use this calculator to estimate the tax-exempt and taxable portion of your House Rent Allowance (HRA).
            Input your salary, HRA, rent, and city to see the results.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          HRA Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Estimate your HRA exemption and taxable amount</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">HRA Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="basicSalary" className="text-blue-100">
                  Basic Salary (₹)
                </Label>
                <Input
                  type="number"
                  id="basicSalary"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hraReceived" className="text-blue-100">
                  HRA Received (₹)
                </Label>
                <Input
                  type="number"
                  id="hraReceived"
                  value={hraReceived}
                  onChange={(e) => setHraReceived(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalRentPaid" className="text-blue-100">
                  Total Rent Paid (₹)
                </Label>
                <Input
                  type="number"
                  id="totalRentPaid"
                  value={totalRentPaid}
                  onChange={(e) => setTotalRentPaid(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-blue-100">
                  Do you live in Delhi, Mumbai, Kolkata, or Chennai?
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setCity(true)}
                    className={`${
                      city ? "bg-blue-500 text-black" : "bg-gray-500 text-white"
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCity(false)}
                    className={`${
                      !city ? "bg-blue-500 text-black" : "bg-gray-500 text-white"
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="button"
              onClick={calculateHRA}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Calculate HRA
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">HRA Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Exempted HRA</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.exemptedHra}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Taxable HRA</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.taxableHra}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
