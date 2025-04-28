"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiStatusConstants } from "@/lib/constants";
import { useState } from "react";
import { transactionSchema } from "@/lib/validations/validateTransaction";

export function TransactionForm({ refreshTransactions }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const [apiStatus, setApiStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      setApiStatus(apiStatusConstants.inProgress);

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(data.amount),
          date: data.date,
          description: data.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      reset();
      refreshTransactions();
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error(error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white mb-6">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            className="w-full p-2 border rounded-md"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full p-2 border rounded-md"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <input
            type="text"
            {...register("description")}
            className="w-full p-2 border rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          disabled={apiStatus === apiStatusConstants.inProgress}
        >
          {apiStatus === apiStatusConstants.inProgress
            ? "Saving..."
            : "Add Transaction"}
        </button>

        {apiStatus === apiStatusConstants.success && (
          <div className="text-green-600 mt-2">
            Transaction added successfully!
          </div>
        )}
        {apiStatus === apiStatusConstants.failure && (
          <div className="text-red-600 mt-2">Failed to add transaction</div>
        )}
      </form>
    </div>
  );
}
