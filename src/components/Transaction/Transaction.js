import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import "./Transaction.css";

class Transaction extends Component {
  render() {
    return (
      <div className="main">
        <div className="report">
          <Grid container alignContent="space-around">
            <Grid item xs={6}>
              <div onClick={() => alert("Hello from here")}>
                <div className={"paper received-color"}>
                  <p className="title">دریافتی دوره</p>
                  <p className="sum"> 405000000 تومان</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={"paper payment-color"}>
                <p className="title">پرداختی دوره</p>
                <p className="sum">36500000 تومان</p>
              </div>
            </Grid>
          </Grid>
          <Grid container alignContent="space-around">
            <Grid item xs={6}>
              <div className={"whole"}>
                <p className="title">کل دوره :</p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={"whole"}>
                <p className="title">+47545000</p>
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
        <div className="details">
          <div className="excel-blocl">
            <Button
              className="excel"
              variant="contained"
              startIcon={<SaveAltIcon className="excel-icon" />}
            >
              دانلود خروجی اکسل
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
