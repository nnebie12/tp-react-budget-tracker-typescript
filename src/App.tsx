import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import { Transaction } from './types';
import TransactionList from './components/TransactionList';
import Balance from './components/Balance';

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

  const deleteTransaction = (id: number): void => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const sortedAndFiltered = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  return (
    <div
    
    >
        <Balance transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1">
            <h2 className="text-4xl font-extrabold">Ajouter</h2>
            <TransactionForm onAddTransaction={addTransaction} />
          </section>

          <section className="lg:col-span-2">

            <TransactionList
              transactions={sortedAndFiltered}
              onDeleteTransaction={deleteTransaction}
            />
          </section>

        </div>
    </div>
  );
}

export default App;
