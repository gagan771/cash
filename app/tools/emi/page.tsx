'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IndianRupee } from 'lucide-react'

// Types
interface EMICalculation {
  emi: number
  totalAmount: number
  totalInterest: number
}

// Utility functions
function calculateEMI(principal: number, rateOfInterest: number, tenure: number): number {
  const monthlyRate = rateOfInterest / (12 * 100)
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
              (Math.pow(1 + monthlyRate, tenure) - 1)
  return Math.round(emi)
}

function calculateTotalAmount(emi: number, tenure: number): number {
  return Math.round(emi * tenure)
}

function calculateTotalInterest(totalAmount: number, principal: number): number {
  return Math.round(totalAmount - principal)
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

// Main Component
export default function EMICalculator() {
  const [principal, setPrincipal] = useState('')
  const [interest, setInterest] = useState('')
  const [tenure, setTenure] = useState('')
  const [calculation, setCalculation] = useState<EMICalculation | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tenureInMonths = Number(tenure) * 12
    const monthlyEMI = calculateEMI(Number(principal), Number(interest), tenureInMonths)
    const totalAmount = calculateTotalAmount(monthlyEMI, tenureInMonths)
    const totalInterest = calculateTotalInterest(totalAmount, Number(principal))

    setCalculation({
      emi: monthlyEMI,
      totalAmount,
      totalInterest,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description Section */}
      <Card className="border-cyan-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-cyan-100">About EMI Calculator</CardTitle>
          <CardDescription className="text-cyan-100/70">
            MI Calculator is an online tool that helps you to calculate the EMI of your Loan. It is an easy-to-use tool, which computes EMI by using the following details: loan amount, interest rate, and loan tenure. You can change the inputs to know the different EMI amounts, saving you from a confusing manual calculation process.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-cyan-100/70">
          The EMI calculator has three sliders in a box with the loan amount, number of months, and the interest rate. After you fill up the details using the sliders, the EMI calculator shows how much you must pay off each month to repay the loan within the selected duration.
        </CardContent>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent">
          EMI Calculator
        </h1>
        <p className="mt-2 text-cyan-100/80">
          Calculate your monthly EMI and total interest payable
        </p>
      </div>

      {/* Input Form */}
      <Card className="border-cyan-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-cyan-100">Loan Details</CardTitle>
          <CardDescription className="text-cyan-100/70">Enter your loan details to calculate EMI</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="principal" className="text-cyan-100">Loan Amount (₹)</Label>
                <Input 
                  id="principal"
                  placeholder="E.g., 1000000"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  required
                  className="border-cyan-500/20 bg-black/20 text-cyan-100 placeholder:text-cyan-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interest" className="text-cyan-100">Interest Rate (%)</Label>
                <Input 
                  id="interest"
                  placeholder="E.g., 10.5"
                  type="number"
                  step="0.1"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  required
                  className="border-cyan-500/20 bg-black/20 text-cyan-100 placeholder:text-cyan-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure" className="text-cyan-100">Loan Tenure (Years)</Label>
                <Input 
                  id="tenure"
                  placeholder="E.g., 20"
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  required
                  className="border-cyan-500/20 bg-black/20 text-cyan-100 placeholder:text-cyan-100/50"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Calculate EMI
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {calculation && (
        <Card className="border-cyan-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-cyan-100">EMI Breakdown</CardTitle>
            <CardDescription className="text-cyan-100/70">Your loan repayment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <span className="text-sm font-medium text-cyan-100/70">Monthly EMI</span>
                <span className="text-2xl font-bold text-cyan-100">
                  {formatCurrency(calculation.emi)}
                </span>
              </div>
              <div className="flex flex-col p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <span className="text-sm font-medium text-cyan-100/70">Total Interest</span>
                <span className="text-2xl font-bold text-cyan-100">
                  {formatCurrency(calculation.totalInterest)}
                </span>
              </div>
              <div className="flex flex-col p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <span className="text-sm font-medium text-cyan-100/70">Total Amount</span>
                <span className="text-2xl font-bold text-cyan-100">
                  {formatCurrency(calculation.totalAmount)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
cccc