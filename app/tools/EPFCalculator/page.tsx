"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { IndianRupee } from "lucide-react"

// Type for frequency
type FrequencyType = "monthly" | "quarterly" | "yearly"

export default function EPFCalculator() {
  const [frequency, setFrequency] = useState<FrequencyType>("monthly")
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000)
  const [interestRate, setInterestRate] = useState<number>(8.25)
  const [years, setYears] = useState<number>(20)
  const [result, setResult] = useState<string>("")

  const calculateEPF = () => {
    let totalEPF = 0
    const investmentPeriods = frequency === "monthly" ? 12 : frequency === "quarterly" ? 4 : 1
    const periodicInterestRate = interestRate / investmentPeriods / 100

    for (let period = 1; period <= years * investmentPeriods; period++) {
      totalEPF = (totalEPF + investmentAmount) * (1 + periodicInterestRate)
    }

    setResult(`₹${totalEPF.toFixed(2)}`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About EPF Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            Use this calculator to estimate the corpus you can build with your Employee Provident Fund
            (EPF) contributions. Input your investment frequency, amount, interest rate, and tenure to see the results.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          EPF Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Estimate your EPF corpus easily</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">Investment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="investmentFrequency" className="text-blue-100">
                  Frequency of Investment
                </Label>
                <Select
                  value={frequency}
                  onValueChange={(value: FrequencyType) => setFrequency(value)}
                >
                  <SelectTrigger
                    id="investmentFrequency"
                    className="bg-black/20 border-blue-500/20 text-blue-100"
                  >
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investmentAmount" className="text-blue-100">
                  Investment Amount (₹)
                </Label>
                <Input
                  type="number"
                  id="investmentAmount"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
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
              <div className="space-y-2">
                <Label htmlFor="years" className="text-blue-100">
                  Tenure (Years)
                </Label>
                <Input
                  type="number"
                  id="years"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={calculateEPF}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Calculate EPF
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">EPF Corpus Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Total Corpus</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
