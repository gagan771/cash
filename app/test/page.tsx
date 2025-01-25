"use client";

import { useState } from "react";
import axios from "axios";

interface BankDetails {
  bank_name: string;
  branch: string;
  address: string;
  city: string;
  state: string;
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function IFSCCodeLookup() {
  const [ifscCode, setIfscCode] = useState("");
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [error, setError] = useState("");

  const fetchIFSCDetails = async () => {
    setError(""); // Clear previous error
    setBankDetails(null); // Clear previous results

    if (!ifscCode) {
      setError("Please enter a valid IFSC code.");
      return;
    }

    try {
      const endpoint = "https://bank-apis.justinclicks.com/API/V1/";
      const response = await axios.post(endpoint, { ifsc: ifscCode });

      if (response.data) {
        setBankDetails(response.data); // Update with fetched bank details
      } else {
        setError("No details found for the provided IFSC code.");
      }
    } catch (err) {
      setError("Failed to fetch details. Please try again later.");
      console.error("Error fetching IFSC details:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      {/* Description */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-100">IFSC Code Lookup</CardTitle>
          <CardDescription className="text-blue-100/70">
            Enter an IFSC code to fetch the corresponding bank details.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter IFSC Code (e.g., HDFC0001234)"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                className="bg-black/20 border-blue-500/20 text-blue-100 placeholder:text-blue-100/50"
              />
            </div>
            <Button
              onClick={fetchIFSCDetails}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-black font-medium"
            >
              Get Bank Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result Section */}
      {bankDetails && (
        <Card className="border-blue-500/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-blue-100">Bank Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-500/10 border border-blue-500/20">
              <AlertTitle className="text-lg font-bold text-blue-100">Details</AlertTitle>
              <AlertDescription className="text-blue-100">
                <p><strong>Bank Name:</strong> {bankDetails.bank_name}</p>
                <p><strong>Branch:</strong> {bankDetails.branch}</p>
                <p><strong>Address:</strong> {bankDetails.address}</p>
                <p><strong>City:</strong> {bankDetails.city}</p>
                <p><strong>State:</strong> {bankDetails.state}</p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/10 backdrop-blur-sm">
          <CardContent>
            <Alert className="bg-red-500/10 border border-red-500/20">
              <AlertTitle className="text-lg font-bold text-red-100">Error</AlertTitle>
              <AlertDescription className="text-red-100">{error}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
