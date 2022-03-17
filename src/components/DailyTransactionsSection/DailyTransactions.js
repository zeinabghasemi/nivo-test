import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./DailyTransactions.css";

function DailyTransactionsSection(props) {
  function monthDataGenerate() {
    var sum = 0;
    props.data.map((m) => {
      if (m["type"] == "paid") {
        sum = sum - m["price"];
      }
      if (m["type"] == "recieved") {
        sum = sum + m["price"];
      }

    });
    return sum;
  }
  return (
    <div className="main-section">
      <div className="date-label">
        <span className="date"> {props.num +" "+ props.month}</span>
        <span>{monthDataGenerate() < 0 ? Math.abs(monthDataGenerate()) + "-" : monthDataGenerate() + "+"}</span>
      </div>
        {
        props.data.map((item) =>
        <div className="transaction-section">
        <div className="tarnsaction-title">
          <Avatar alt="transaction" className="avatar"><CreditCardIcon /></Avatar>
          <p className="name">{item["category"]}</p>
        </div>
        <div className="transaction-price">
              <p>{item["type"] == "recieved" ? item["price"] + "+": item["price"] + "-"}</p>
        </div>
      </div>
          )
        }
    </div>
  );
}

export default DailyTransactionsSection;