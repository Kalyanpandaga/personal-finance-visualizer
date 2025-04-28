"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  date: z.string(),
  description: z.string().min(1, "Description is required"),
});

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export function TransactionForm({ refreshTransactions }) {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add transaction");

      setApiStatus(apiStatusConstants.success);
      reset();
      refreshTransactions();
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="number"
              placeholder="Amount"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <Input type="date" {...register("date")} />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button
            className="cursor-pointer"
            type="submit"
            disabled={apiStatus === apiStatusConstants.inProgress}
          >
            {apiStatus === apiStatusConstants.inProgress
              ? "Saving..."
              : "Add Transaction"}
          </Button>

          {apiStatus === apiStatusConstants.success && (
            <p className="text-green-600 text-sm mt-2">
              Transaction added successfully!
            </p>
          )}
          {apiStatus === apiStatusConstants.failure && (
            <p className="text-red-600 text-sm mt-2">
              Failed to add transaction
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
