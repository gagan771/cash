"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { IndianRupee } from "lucide-react"

export default function PPFCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000)
  const [interestRate, setInterestRate] = useState<number>(7.1)
  const [duration, setDuration] = useState<number>(15)
  const [result, setResult] = useState<{ maturityAmount: string } | null>(null)

  const calculatePPF = () => {
    const months = duration * 12 // Convert years to months
    const monthlyRate = interestRate / 100 / 12
    const totalAmount = monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate) // PPF maturity formula

    setResult({
      maturityAmount: `₹${totalAmount.toFixed(2)}`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About PPF Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            Use this calculator to estimate your Public Provident Fund (PPF) maturity amount. Input your monthly investment, the
            current interest rate, and your investment duration to see the results.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          PPF Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Estimate your PPF maturity amount</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">PPF Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="monthlyInvestment" className="text-blue-100">
                  Monthly PPF Investment (₹)
                </Label>
                <Input
                  type="number"
                  id="monthlyInvestment"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate" className="text-blue-100">
                  Current PPF Interest Rate (%)
                </Label>
                <Input
                  type="number"
                  id="interestRate"
                  value={interestRate}
                  step="0.01"
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-blue-100">
                  Duration of Investment (Years)
                </Label>
                <Input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={calculatePPF}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Calculate PPF
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">PPF Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">PPF Maturity Amount</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.maturityAmount}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
