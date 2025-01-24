"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { IndianRupee } from "lucide-react"

export default function NPSCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000)
  const [age, setAge] = useState<number>(20)
  const [expectedReturn, setExpectedReturn] = useState<number>(8)
  const [annuityPurchasePercentage, setAnnuityPurchasePercentage] = useState<number>(40)
  const [annuityReturn, setAnnuityReturn] = useState<number>(6)
  const [result, setResult] = useState<{
    investedAmount: string
    pensionWealth: string
    lumpsumAmount: string
    monthlyPension: string
  } | null>(null)

  const calculateNPS = () => {
    const years = 60 - age // Assuming retirement at 60
    const totalInvestment = monthlyInvestment * 12 * years // Total investment over the years
    const expectedReturnAmount = totalInvestment * (1 + expectedReturn / 100) ** years // Future value of the investment
    const annuityPurchaseAmount = expectedReturnAmount * (annuityPurchasePercentage / 100)
    const pensionWealth = expectedReturnAmount - annuityPurchaseAmount
    const lumpsumAmount = annuityPurchaseAmount
    const monthlyPension = (pensionWealth * (annuityReturn / 100)) / 12 // Monthly pension calculation based on annuity return

    setResult({
      investedAmount: `₹${totalInvestment.toFixed(2)}`,
      pensionWealth: `₹${pensionWealth.toFixed(2)}`,
      lumpsumAmount: `₹${lumpsumAmount.toFixed(2)}`,
      monthlyPension: `₹${monthlyPension.toFixed(2)}`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About NPS Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            Use this calculator to estimate the investment outcome from the National Pension Scheme (NPS). Input your monthly
            investment, age, expected returns, and annuity purchase percentage to see the results.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          NPS Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Estimate your pension wealth, lumpsum, and monthly pension</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">NPS Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="monthlyInvestment" className="text-blue-100">
                  Monthly Investment (₹)
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
                <Label htmlFor="age" className="text-blue-100">
                  Your Age
                </Label>
                <Input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedReturn" className="text-blue-100">
                  Expected Return on Investment (%)
                </Label>
                <Input
                  type="number"
                  id="expectedReturn"
                  value={expectedReturn}
                  step="0.01"
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annuityPurchasePercentage" className="text-blue-100">
                  Percentage of Annuity Purchase (%)
                </Label>
                <Input
                  type="number"
                  id="annuityPurchasePercentage"
                  value={annuityPurchasePercentage}
                  onChange={(e) => setAnnuityPurchasePercentage(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annuityReturn" className="text-blue-100">
                  Expected Return of Annuity (%)
                </Label>
                <Input
                  type="number"
                  id="annuityReturn"
                  value={annuityReturn}
                  onChange={(e) => setAnnuityReturn(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={calculateNPS}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Calculate NPS
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">NPS Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Invested Amount</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.investedAmount}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Pension Wealth</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.pensionWealth}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Lumpsum Amount</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.lumpsumAmount}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Monthly Pension</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.monthlyPension}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
