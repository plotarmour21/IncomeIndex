import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const countries = [
  { name: "INDIA", code: "IND", currency: "INR" },
  { name: "United States", code: "US", currency: "USD" },
  { name: "United Kingdom", code: "UK", currency: "GBP" },
  { name: "Germany", code: "DE", currency: "EUR" },
  { name: "Japan", code: "JP", currency: "JPY" },
  { name: "Australia", code: "AU", currency: "AUD" },
];

const mockIncomeData = [
  { percentile: 10, income: 10000 },
  { percentile: 25, income: 25000 },
  { percentile: 50, income: 50000 },
  { percentile: 75, income: 75000 },
  { percentile: 90, income: 100000 },
  { percentile: 99, income: 200000 },
];

export default function Compare() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [income, setIncome] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      setError("Please select a country.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userIncome = Number(income);
      const userPercentile =
        mockIncomeData.findIndex((d) => userIncome <= d.income) * 10 + 10;
      setResult({ data: mockIncomeData, userPercentile, userIncome });
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Compare Your Income
      </h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>
            Provide your country, income, and preferred currency for comparison.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={selectedCountry}
                  onValueChange={(value) => {
                    setSelectedCountry(value);
                    setCurrency(
                      countries.find((c) => c.code === value)?.currency || "USD"
                    );
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Annual Income</Label>
                <Input
                  id="income"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem
                        key={country.currency}
                        value={country.currency}
                      >
                        {country.currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Calculating..." : "Compare Income"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Income Comparison</CardTitle>
              <CardDescription>
                Your income is in the top{" "}
                <span className="font-bold text-primary">
                  {100 - result.userPercentile}%
                </span>{" "}
                of {countries.find((c) => c.code === selectedCountry)?.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="percentile"
                      label={{
                        value: "Income Percentile",
                        position: "insideBottom",
                        offset: -10,
                      }}
                    />
                    <YAxis
                      label={{
                        value: `Annual Income (${currency})`,
                        angle: -90,
                        position: "insideLeft",
                      }}
                      tickFormatter={formatCurrency}
                    />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="income" fill="hsl(var(--primary))">
                      {result.data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Income Distribution</CardTitle>
              <CardDescription>
                Breakdown of income percentiles in{" "}
                {countries.find((c) => c.code === selectedCountry)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={result.data}
                      dataKey="income"
                      nameKey="percentile"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) =>
                        `${name}th: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {result.data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
