import React from "react";
import "./Transaction.css";
import moment from "moment-jalaali";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { makeStyles, Dialog } from "@material-ui/core";
import AddTransaction from "../AddTransaction/AddTransaction";
import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DailyTransactionsSection from "../DailyTransactionsSection/DailyTransactions";

import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  listData,
} from "../../app/dataSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var method = "";
const faMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const initialDateState = {
  monthHead: Number(moment(Date.now()).format("jMM")),
  yearHead: Number(moment(Date.now()).format("jYYYY")),
};

const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: "30px 30px 0px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: -30,
    padding: "1rem",
  },
}));

export default function Transaction() {
  const data = useSelector(listData);
  const monthData = new Array();
  const days = new Set();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openItems, setOpenItems] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [dateState, setDateState] = React.useState(initialDateState);
  const date = moment(Date.now()).format("jYYYY/jMM/jDD");
  const handleClickOpen = () => {
    setOpen(true);
    setOpenItems(false);
  };
  const handleClickOpenItems = () => {
    setOpenItems(true);
  };

  const HandleCloseItems = () => {
    setOpenItems(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function monthDataGenerate() {
    var paidSum = 0;
    var recievedSum = 0;
    monthData.splice(0, monthData.length);
    days.clear();
    data.map((tr) => {
      if (
        tr["year"] == dateState.yearHead &&
        tr["month"] == dateState.monthHead
      ) {
        monthData.push(tr);
      }
    });
    monthData.map((m) => {
      days.add(m["day"])
      if (m["type"] == "paid") {
        paidSum = paidSum + m["price"];
      }
      if (m["type"] == "recieved") {
        recievedSum = recievedSum + m["price"];
      }

    });
    return [monthData, monthData.length, days, paidSum, recievedSum];
  }
  const [mData, mDataLength, daysSet, pSum, rSum] = monthDataGenerate();
  function dayDataGenerate(item) {
    const dayInfo = new Array();
    dayInfo.splice(0, dayInfo.length);
    monthData.forEach((m) => {
      if (m["day"] == item) {
        dayInfo.push(m)
      }
    });
    return dayInfo;
  }

  function nextMonth() {
    if (dateState.monthHead < 12) {
      dateState.monthHead = dateState.monthHead + 1;
    } else {
      dateState.yearHead = dateState.yearHead + 1;
      dateState.monthHead = 1;
    }

    setDateState({ ...dateState });
  }

  function prevMonth() {
    if (dateState.monthHead > 1) {
      dateState.monthHead = dateState.monthHead - 1;
    } else {
      dateState.yearHead = dateState.yearHead - 1;
      dateState.monthHead = 12;
    }

    setDateState({ ...dateState });
  }

  function get3Month() {
    return [
      dateState.monthHead == 1 ? 12 : dateState.monthHead - 1,
      dateState.monthHead,
      dateState.monthHead == 12 ? 1 : dateState.monthHead + 1,
    ];
  }

  function getFaMonth(m) {
    return faMonths[m - 1];
  }

  const [mBefore, mCurrent, mNext] = get3Month();
  return (
    <div className="main">
      <div className="month-parts">
        <Button
          className="arrow-icon-button"
          startIcon={
            <ArrowForwardIosIcon id="next-month" className="icons-style" />
          }
          variant="contained"
          onClick={nextMonth}
        >
          {getFaMonth(mNext)}
        </Button>
        <div className="arrow-icon-button this-month">
          {getFaMonth(mCurrent) + " " + dateState.yearHead}
        </div>
        <Button
          className="arrow-icon-button"
          variant="contained"
          endIcon={<ArrowBackIosNewIcon className="icons-style" />}
          onClick={prevMonth}
        >
          {getFaMonth(mBefore)}
        </Button>
      </div>
      <div className="report-block">
        <Grid container alignContent="space-around">
          <Grid item xs={6}>
            <div className={"paper payment-color"}>
              <h3 className="title">پرداختی دوره</h3>
              <p className="sum">{pSum} تومان</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div onClick={() => alert("Hello from here")}>
              <div className={"paper received-color"}>
                <h3 className="title">دریافتی دوره</h3>
                <p className="sum"> {rSum} تومان</p>
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
              <p className="title">
                {rSum - pSum < 0 ? pSum - rSum + "-" : rSum - pSum}
              </p>
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
              <p className="title">{mDataLength}</p>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="buttons-block">
        <Button className="icon-button" variant="contained">
          دانلود خروجی اکسل
        </Button>
        <Button
          className="icon-button"
          variant="contained"
          onClick={handleClickOpenItems}
        >
          تراکنش جدید
        </Button>
        <Dialog
          classes={{
            paper: classes.dialog,
          }}
          open={openItems}
          onClose={HandleCloseItems}
          TransitionComponent={Transition}
        >
          <List className="dialog">
            <div className="align">
              <b>تراکنش جدید</b>
            </div>
            <div className="align clickable" onClick={() => { method = "paid"; handleClickOpen() }}>
              پرداخت
            </div>
            <Divider />
            <div className="align clickable" onClick={() => { method = "recieved"; handleClickOpen() }}>دریافت</div>
            <Divider />
            <div className="align clickable" onClick={() => { method = "change"; handleClickOpen() }}>جیب به جیب</div>
            <Divider />
          </List>
        </Dialog>
        <Dialog
          classes={{
            paper: classes.dialog,
          }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AddTransaction method={method} date={date} />
        </Dialog>
      </div>
      <div className="transaction-block">
        {Array.from(daysSet).map((item) => (<DailyTransactionsSection num={item} month={getFaMonth(mCurrent)} data={dayDataGenerate(item)} />))}

      </div>
    </div>
  );
}