import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import DailyTransactionsSection from "../DailyTransactionsSection/DailyTransactions";
import "./Transaction.css";
class Transaction extends Component {
  render() {
    return (
      <div className="main">
        <div className="report-block">
          <Grid container alignContent="space-around">
            <Grid item xs={6}>
              <div className={"paper payment-color"}>
                <h3 className="title">پرداختی دوره</h3>
                <p className="sum">36500000 تومان</p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div onClick={() => alert("Hello from here")}>
                <div className={"paper received-color"}>
                  <h3 className="title">دریافتی دوره</h3>
                  <p className="sum"> 405000000 تومان</p>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container alignContent="space-around">
            <Grid item xs={6}>
              <div className={"whole"}>
                <h3 className="title">کل دوره :</h3>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={"whole"}>
                <p className="title">47545000+</p>
              </div>
            </Grid>
          </Grid>
          <Grid container alignContent="space-around">
            <Grid item xs={6}>
              <div className={"whole"}>
                <p className="title">تعداد تراکنش :</p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={"whole"}>
                <p className="title">4</p>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="buttons-block">
          <Button className="icon-button" variant="contained">
            دانلود خروجی اکسل
          </Button>
          <Button className="icon-button" variant="contained">
            تراکنش جدید
          </Button>
        </div>
        <div className="transaction-block">
          <DailyTransactionsSection />
        </div>
      </div>
    );
  }
}

export default Transaction;
