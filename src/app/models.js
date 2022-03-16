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