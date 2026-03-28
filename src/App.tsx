import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Balance from './components/Balance';
import Filter from './components/Filter';
import { Transaction, FilterType } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedData = localStorage.getItem('transactions');
    return savedData ? (JSON.parse(savedData) as Transaction[]) : [];
  });

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>('all');

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
    .filter((t) => filter === 'all' || t.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold">Budget Tracker</h1>
          <button
            onClick={toggleDarkMode}
            className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform"
          >
            {darkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
          </button>
        </header>

        <Balance transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1">
            <h2 className="text-4xl font-extrabold">Ajouter</h2>
            <TransactionForm onAddTransaction={addTransaction} />
          </section>

          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-extrabold">Transactions</h2>
              <Filter currentFilter={filter} onFilterChange={setFilter} />
            </div>

            <TransactionList
              transactions={sortedAndFiltered}
              onDeleteTransaction={deleteTransaction}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
