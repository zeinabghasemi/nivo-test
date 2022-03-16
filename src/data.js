import { configureStore, createSlice } from '@reduxjs/toolkit';

export class TransactionModel {
  constructor(
    id,
    type,
    price,
    note,
    category,
    year,
    month,
    day,
  ) {
    this.id = id;
    this.type = type;
    this.price = price;
    this.note = note;
    this.category = category;
    this.year = year;
    this.month = month;
    this.day = day;
  }

  static fromJson(json) {
    const tr = new TransactionModel();

    for (const [k, v] of Object.entries(json)) {
      tr[k] = v;
    }

    return tr;
  }

  static fromJsonArray(jsonArray) {
    const result = [];

    for (const json of jsonArray) {
      result.push(TransactionModel.fromJson(json));
    }

    return result;
  }

  toJson() {
    return {
      id: this.id,
      type: this.type,
      price: this.price,
      note: this.note,
      category: this.category,
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }

  static toJsonArray(trArray) {
    const result = [];

    for (const tr of trArray) {
      result.push(tr.toJson());
    }

    return result;
  }
}

const data = TransactionModel.fromJsonArray([
  {
    id: 1,
    type: "paid",
    price: 200000,
    note: "200000 paid",
    category: "سرگرمی",
    year: 1400,
    month: 12,
    day: 1,
  },
  {
    id: 2,
    type: "paid",
    price: 200000,
    note: "200000 paid",
    category: "خرید",
    year: 1400,
    month: 12,
    day: 1,
  },
  {
    id: 3,
    type: "paid",
    price: 200000,
    note: "200000 paid",
    category: "سرگرمی",
    year: 1401,
    month: 1,
    day: 2,
  },
  {
    id: 4,
    type: "paid",
    price: 200000,
    note: "200000 paid",
    category: "خرید", year: 1401,
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

export const store = configureStore({
  reducer: {
    myReducer: dataSlice.reducer,
  },
});
