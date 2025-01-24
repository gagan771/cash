"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { IndianRupee } from "lucide-react"

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000)
  const [numberOfYears, setNumberOfYears] = useState<number>(1)
  const [interestRate, setInterestRate] = useState<number>(7.75)
  const [result, setResult] = useState<{
    totalInterest: string
    maturityAmount: string
    depositedAmount: string
  } | null>(null)

  const calculateRD = () => {
    const numberOfMonths = numberOfYears * 12
    const r = interestRate / 100 / 12 // Monthly interest rate
    const depositedAmount = monthlyDeposit * numberOfMonths
    const maturityAmount = monthlyDeposit * (((1 + r) ** numberOfMonths - 1) / r) * (1 + r) // RD formula
    const totalInterest = maturityAmount - depositedAmount

    setResult({
      totalInterest: `₹${totalInterest.toFixed(2)}`,
      maturityAmount: `₹${maturityAmount.toFixed(2)}`,
      depositedAmount: `₹${depositedAmount.toFixed(2)}`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About RD Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            Use this calculator to estimate the maturity amount and total interest earned on a
            Recurring Deposit (RD). Input your monthly deposit, tenure, and interest rate to see the results.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          RD Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Estimate your RD maturity amount and interest</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">RD Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="monthlyDeposit" className="text-blue-100">
                  Monthly RD Deposit (₹)
                </Label>
                <Input
                  type="number"
                  id="monthlyDeposit"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfYears" className="text-blue-100">
                  Tenure (Years)
                </Label>
                <Slider
                  value={[numberOfYears]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(value) => setNumberOfYears(value[0])}
                  className="mt-4"
                />
                <div className="text-blue-100 text-center">Years: {numberOfYears}</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate" className="text-blue-100">
                  RD Interest Rate (%)
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
            </div>
            <Button
              type="button"
              onClick={calculateRD}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Calculate RD
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">RD Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Maturity Amount</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.maturityAmount}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Total Interest Earned</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.totalInterest}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Deposited Amount</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.depositedAmount}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
