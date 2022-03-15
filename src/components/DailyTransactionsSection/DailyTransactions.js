import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./DailyTransactions.css";

class DailyTransactionsSection extends Component {
  render() {
    return (
      <div className="main-section">
        <div className="date-label">
          <span className="date">دوشنبه 23 اسفند</span>
          <span>265,000,000</span>
        </div>
        <div className="transaction-section">
          <div className="tarnsaction-title">
            <Avatar alt="transaction" className="avatar"><CreditCardIcon/></Avatar>
            <p className="name">سرمایه گذاری</p>
          </div>
          <div className="transaction-price">
            <p>265,000,000-</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyTransactionsSection;