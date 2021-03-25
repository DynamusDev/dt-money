import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface TransactionsProps {
  id: number,
  title: string,
  amount: number,
  category: string,
  type: string,
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode
}

type TransactionInput = Omit<TransactionsProps, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: TransactionsProps[],
  createTransaction: (transaction: TransactionInput) => Promise<void>,
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);


export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionImput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionImput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
};

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}