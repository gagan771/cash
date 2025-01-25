"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addMonths, eachMonthOfInterval } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";

type FormStep = 1 | 2;

interface Receipt {
  receiptNo: number;
  date: string;
  amount: string;
  tenantName: string;
  address: string;
  periodStart: string;
  periodEnd: string;
  landlordName: string;
}

export default function RentPage() {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState({
    rent: "",
    address: "",
    name: "",
    email: "",
    ownerName: "",
    ownerPAN: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined, field: "startDate" | "endDate") => {
    if (date) {
      setFormData((prev) => ({ ...prev, [field]: date }));
    }
  };

  const generateReceipts = () => {
    const months = eachMonthOfInterval({
      start: formData.startDate,
      end: formData.endDate,
    });

    const newReceipts = months.map((month, index) => ({
      receiptNo: index + 1,
      date: format(addMonths(month, 1), "MMM dd yyyy"),
      amount: formData.rent,
      tenantName: formData.name,
      address: formData.address,
      periodStart: format(month, "MMM dd yyyy"),
      periodEnd: format(addMonths(month, 1), "MMM dd yyyy"),
      landlordName: formData.ownerName,
    }));

    setReceipts(newReceipts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      generateReceipts();
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    receipts.forEach((receipt, index) => {
      if (index > 0) doc.addPage();

      doc.setFontSize(16);
      doc.text(`RENT RECEIPT - ${format(new Date(receipt.periodStart), "MMMM yyyy")}`, 10, 10);
      doc.setFontSize(12);
      doc.text(`Receipt No: ${receipt.receiptNo}`, 10, 20);
      doc.text(`Date: ${receipt.date}`, 10, 30);
      doc.text(
        `Received sum of INR Rs.${receipt.amount} from ${receipt.tenantName} towards the rent of property located at ${receipt.address} for the period from ${receipt.periodStart} to ${receipt.periodEnd}.`,
        10,
        40,
        { maxWidth: 190 }
      );
      doc.text(`Landlord: ${receipt.landlordName}`, 10, 90);
    });

    doc.save("RentReceipts.pdf");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generate Rent Receipts</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rent Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="rent">What is your monthly rent?</Label>
                      <Input
                        id="rent"
                        name="rent"
                        placeholder="Enter amount"
                        value={formData.rent}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="address">What is the house address?</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">What is your name?</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">What is your email?</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="ownerName">What is the name of your house owner?</Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        placeholder="Enter owner's name"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="ownerPAN">What is your House Owner's PAN no (optional)?</Label>
                      <Input
                        id="ownerPAN"
                        name="ownerPAN"
                        placeholder="Enter PAN number"
                        value={formData.ownerPAN}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label>From when would you like to generate the rent receipt?</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => handleDateChange(date, "startDate")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label>Till when would you like to generate the receipt?</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => handleDateChange(date, "endDate")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </>
              )}
              <CardFooter className="mt-4 p-0">
                <Button type="submit" className="w-full">
                  {step === 1 ? "Next" : "Generate Receipts"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
        {receipts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {receipts.map((receipt, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-2">
                        RENT RECEIPT {format(new Date(receipt.periodStart), "MMMM yyyy")}
                      </h3>
                      <p>Generated on Cash.ai</p>
                      <p>Receipt No: {receipt.receiptNo}</p>
                      <p>Date: {receipt.date}</p>
                      <p>
                        Received sum of INR Rs.{receipt.amount} from {receipt.tenantName} towards the rent of property
                        located at {receipt.address} for the period from {receipt.periodStart} to {receipt.periodEnd}
                      </p>
                      <p className="mt-4">{receipt.landlordName} (Landlord)</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button onClick={downloadPDF} className="mt-4 w-full">
                Download PDF
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
