import { createSlice } from '@reduxjs/toolkit';

import { TransactionModel, getNextTransactionSequenceId } from './models';

const data = TransactionModel.fromJsonArray([
  {
    id: getNextTransactionSequenceId(),
    type: "paid",
    price: 450000,
    note: "450000 paid",
    category: "سرگرمی",
    year: 1400,
    month: 12,
    day: 2,
  },
  {
    id: getNextTransactionSequenceId(),
    type: "recieved",
    price: 30000000,
    note: "30000000 recieved",
    category: "حقوق",
    year: 1400,
    month: 12,
    day: 2,
  },
  {
    id: getNextTransactionSequenceId(),
    type: "paid",
    price: 60000,
    note: "60000 paid",
    category: "خرید",
    year: 1400,
    month: 12,
    day: 1,
  },
  {
    id: getNextTransactionSequenceId(),
    type: "paid",
    price: 200000,
    note: "200000 paid",
    category: "پوشاک",
    year: 1400,
    month: 12,
    day: 1,
  },
  {
    id: getNextTransactionSequenceId(),
    type: "recieved",
    price: 6000000,
    note: "6000000 recieved",
    category: "حقوق",
    year: 1401,
    month: 1,
    day: 2,
  },
  {
    id: getNextTransactionSequenceId(),
    type: "paid",
    price: 200000,
    note: "200000 paid",
    category: "خرید",
    year: 1401,
    month: 1,
    day: 2,
  }
]);

const initialState = {
  data: TransactionModel.toJsonArray(data),
};

const dataSlice = createSlice({
  name: 'nivo-test',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.data.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const updatedDoc = action.payload;
      const idx = state.data.findIndex((tr) => tr.id == updatedDoc.id);

      if (idx != -1) {
        state.data[idx] = updatedDoc;
      }
    },
    deleteTransaction: (state, action) => {
      const doc = action.payload;
      const idx = state.data.findIndex((tr) => tr.id == doc.id);

      if (idx != -1) {
        state.data.splice(idx, 1);
      }
    },
  }
});

export const { addTransaction, updateTransaction, deleteTransaction } = dataSlice.actions;

export const listData = (state) => state.myReducer.data;

export default dataSlice.reducer;