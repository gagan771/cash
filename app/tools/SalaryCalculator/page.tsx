"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState<number>(600000)
  const [bonusAmount, setBonusAmount] = useState<number>(1500)
  const [professionalTax, setProfessionalTax] = useState<number>(0)
  const [employerPF, setEmployerPF] = useState<number>(0)
  const [employeePF, setEmployeePF] = useState<number>(0)
  const [employeeInsurance, setEmployeeInsurance] = useState<number>(0)
  const [additionalDeduction1, setAdditionalDeduction1] = useState<number>(0)
  const [additionalDeduction2, setAdditionalDeduction2] = useState<number>(0)

  const [result, setResult] = useState<{
    totalMonthlyDeductions: string
    totalAnnualDeductions: string
    netTakeHomeMonthly: string
    netTakeHomeAnnual: string
  } | null>(null)

  const calculateSalary = () => {
    const annualDeductions =
      (professionalTax + employerPF + employeePF + employeeInsurance + additionalDeduction1 + additionalDeduction2) * 12

    const annualSalaryExcludingBonus = ctc - bonusAmount
    const monthlyGross = annualSalaryExcludingBonus / 12
    const totalMonthlyDeductions =
      professionalTax + employerPF + employeePF + employeeInsurance + additionalDeduction1 + additionalDeduction2
    const netTakeHomeMonthly = monthlyGross - totalMonthlyDeductions
    const netTakeHomeAnnual = netTakeHomeMonthly * 12

    setResult({
      totalMonthlyDeductions: `₹${totalMonthlyDeductions.toFixed(2)}`,
      totalAnnualDeductions: `₹${annualDeductions.toFixed(2)}`,
      netTakeHomeMonthly: `₹${netTakeHomeMonthly.toFixed(2)}`,
      netTakeHomeAnnual: `₹${netTakeHomeAnnual.toFixed(2)}`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About Salary Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            This calculator helps you estimate your take-home salary after deducting taxes, PF,
            insurance, and other deductions. Input your CTC, bonus, and deductions to get a detailed
            breakdown.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          Salary Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Calculate your take-home salary and deductions</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">Salary Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ctc" className="text-blue-100">
                  Cost to Company (₹)
                </Label>
                <Input
                  type="number"
                  id="ctc"
                  value={ctc}
                  onChange={(e) => setCtc(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bonusAmount" className="text-blue-100">
                  Bonus Amount (₹)
                </Label>
                <Input
                  type="number"
                  id="bonusAmount"
                  value={bonusAmount}
                  onChange={(e) => setBonusAmount(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="professionalTax" className="text-blue-100">
                  Professional Tax (₹)
                </Label>
                <Input
                  type="number"
                  id="professionalTax"
                  value={professionalTax}
                  onChange={(e) => setProfessionalTax(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employerPF" className="text-blue-100">
                  Employer PF (₹)
                </Label>
                <Input
                  type="number"
                  id="employerPF"
                  value={employerPF}
                  onChange={(e) => setEmployerPF(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeePF" className="text-blue-100">
                  Employee PF (₹)
                </Label>
                <Input
                  type="number"
                  id="employeePF"
                  value={employeePF}
                  onChange={(e) => setEmployeePF(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeInsurance" className="text-blue-100">
                  Employee Insurance (₹)
                </Label>
                <Input
                  type="number"
                  id="employeeInsurance"
                  value={employeeInsurance}
                  onChange={(e) => setEmployeeInsurance(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalDeduction1" className="text-blue-100">
                  Additional Deduction 1 (₹)
                </Label>
                <Input
                  type="number"
                  id="additionalDeduction1"
                  value={additionalDeduction1}
                  onChange={(e) => setAdditionalDeduction1(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalDeduction2" className="text-blue-100">
                  Additional Deduction 2 (₹)
                </Label>
                <Input
                  type="number"
                  id="additionalDeduction2"
                  value={additionalDeduction2}
                  onChange={(e) => setAdditionalDeduction2(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={calculateSalary}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              Calculate Salary
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">Salary Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Total Monthly Deductions</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.totalMonthlyDeductions}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Total Annual Deductions</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.totalAnnualDeductions}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Net Take-Home Monthly</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.netTakeHomeMonthly}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Net Take-Home Annual</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.netTakeHomeAnnual}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
