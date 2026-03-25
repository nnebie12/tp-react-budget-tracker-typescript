import { useState } from 'react';
import { Transaction } from '../types';

export function useTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction): void => {
    setTransactions([...transactions, transaction]);
  };

  return {
    transactions,
    addTransaction,
  };
}
