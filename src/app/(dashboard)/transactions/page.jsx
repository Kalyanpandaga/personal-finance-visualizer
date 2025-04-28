"use client";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { MonthlyBarChart } from "@/components/MonthlyBarChart";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <TransactionForm refreshTransactions={fetchTransactions} />
      <TransactionList
        transactions={transactions}
        refreshTransactions={fetchTransactions}
      />
      <MonthlyBarChart transactions={transactions} />
    </div>
  );
}
