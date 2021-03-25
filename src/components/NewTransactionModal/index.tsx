import { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions';

import close from '../../assets/close.svg';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import { api } from '../../services/api';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface newTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void,
}

export function NewTransactionModal({ isOpen, onRequestClose }: newTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    });

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={close} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder='Título'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder='Valor'
          type='number'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={income} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type='button'
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcome} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder='Categoria'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}
