import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            About IncomeIndex
          </CardTitle>
          <CardDescription>
            Understanding your financial standing in a global context
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            IncomeIndex is a powerful tool designed to help you understand your
            financial standing in a global context. By comparing your income
            with others in your country and around the world, we provide
            valuable insights into income distribution.
          </p>
          <p>
            Our goal is to promote financial literacy and transparency. We
            believe that understanding where you stand can help you make
            informed decisions about your career, savings, and financial future.
          </p>
          <p>
            Please note that all comparisons are based on pre-tax income and may
            not reflect the full picture of an individual's financial situation.
            Factors such as cost of living, taxes, and social benefits can
            significantly impact actual living standards.
          </p>
          <p>
            We are committed to providing accurate and up-to-date information.
            Our data is regularly updated and sourced from reputable
            international organizations and national statistical offices.
          </p>
          <p>
            For more information on our data sources, methodology, or if you
            have any questions, please don't hesitate to contact us.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
