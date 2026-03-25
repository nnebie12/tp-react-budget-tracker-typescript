import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import { Transaction, FilterType } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedData = localStorage.getItem('transactions');
    return savedData ? (JSON.parse(savedData) as Transaction[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction: Transaction): void => {
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div
    
    >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1">
            <h2 className="text-4xl font-extrabold">Ajouter</h2>
            <TransactionForm onAddTransaction={addTransaction} />
          </section>

        </div>
    </div>
  );
}

export default App;
