// src/hooks/useTransactions.js

import { useState, useEffect } from "react";
import { apiStatusConstants } from "@/lib/constants";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress);
      const response = await fetch("/api/transactions");
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.data);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  return { transactions, apiStatus, fetchTransactions };
}
