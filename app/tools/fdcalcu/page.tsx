"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { IndianRupee } from "lucide-react"

export default function FDCalculator() {
  const [depositAmount, setDepositAmount] = useState<number>(5000)
  const [numberOfMonths, setNumberOfMonths] = useState<number>(12)
  const [interestRate, setInterestRate] = useState<number>(7.25)
  const [result, setResult] = useState<{ maturityAmount: string; totalInterest: string } | null>(null)

  const calculateFD = () => {
    const years = numberOfMonths / 12 // Convert months to years
    const totalInterest = (depositAmount * interestRate * years) / 100
    const maturityAmount = depositAmount + totalInterest

    setResult({
      totalInterest: `₹${totalInterest.toFixed(2)}`,
      maturityAmount: `₹${maturityAmount.toFixed(2)}`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About FD Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            Use this calculator to estimate the maturity amount and total interest earned on a Fixed
            Deposit (FD). Input your deposit amount, tenure, and interest rate to see the results.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          FD Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Estimate your FD maturity amount and interest</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">FD Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="depositAmount" className="text-blue-100">
                  Deposit Amount (₹)
                </Label>
                <Input
                  type="number"
                  id="depositAmount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfMonths" className="text-blue-100">
                  Number of Months
                </Label>
                <Input
                  type="number"
                  id="numberOfMonths"
                  value={numberOfMonths}
                  onChange={(e) => setNumberOfMonths(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate" className="text-blue-100">
                  Interest Rate (%)
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
              onClick={calculateFD}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Calculate FD
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">FD Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Maturity Amount</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.maturityAmount}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Total Interest</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.totalInterest}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
