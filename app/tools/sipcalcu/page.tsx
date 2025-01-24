"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function SIPCalculator() {
  const [sipAmount, setSipAmount] = useState<number>(5000);
  const [sipPeriod, setSipPeriod] = useState<number>(26); // in years
  const [returnRate, setReturnRate] = useState<number>(12); // annual return rate in %
  const [result, setResult] = useState<{
    investedAmount: string;
    wealthGained: string;
    totalWealth: string;
  } | null>(null);

  const calculateSIP = () => {
    const monthlyRate = returnRate / 12 / 100; // Convert annual rate to monthly
    const totalMonths = sipPeriod * 12;
    const investedAmount = sipAmount * totalMonths;

    // Calculate future value of SIP using the formula: FV = P × [(1 + r)^n - 1] × (1 + r) / r
    const totalWealth =
      sipAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) * (1 + monthlyRate)) / monthlyRate;
    const wealthGained = totalWealth - investedAmount;

    setResult({
      investedAmount: `₹${investedAmount.toFixed(2)}`,
      wealthGained: `₹${wealthGained.toFixed(2)}`,
      totalWealth: `₹${totalWealth.toFixed(2)}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">About SIP Calculator</CardTitle>
          <CardDescription className="text-blue-100/70">
            This SIP calculator helps you estimate the future value of your systematic investment
            plan. Input your monthly SIP amount, investment period, and expected return rate to
            calculate your total wealth, invested amount, and wealth gained.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
          SIP Calculator
        </h1>
        <p className="mt-2 text-blue-100/80">Calculate your SIP returns online</p>
      </div>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">SIP Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="sipAmount" className="text-blue-100">
                  Monthly SIP Amount (₹)
                </Label>
                <Input
                  type="number"
                  id="sipAmount"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sipPeriod" className="text-blue-100">
                  SIP Period (Years)
                </Label>
                <Input
                  type="number"
                  id="sipPeriod"
                  value={sipPeriod}
                  onChange={(e) => setSipPeriod(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnRate" className="text-blue-100">
                  Expected Return Rate (p.a) (%)
                </Label>
                <Input
                  type="number"
                  id="returnRate"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={calculateSIP}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              Calculate SIP
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">SIP Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Invested Amount</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.investedAmount}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Wealth Gained</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.wealthGained}
              </AlertDescription>
              <AlertTitle className="text-lg font-bold text-blue-100 mt-4">Total Wealth</AlertTitle>
              <AlertDescription className="text-xl font-bold text-blue-100">
                {result.totalWealth}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
