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

let method = "";
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
const initialFilterState = {
  paidState: false,
  recievedState: false,
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

function getMonthInfo(data, filterState, { yearHead, monthHead }) {
  const days = new Set();
  const monthTransactions = new Array();
  let paidSum = 0;
  let recievedSum = 0;

  if (filterState.paidState == false && filterState.recievedState == false) {
    data.forEach((tr) => {
      if (tr["year"] == yearHead && tr["month"] == monthHead) {
        monthTransactions.push(tr);
      }
    });

    monthTransactions.forEach((m) => {
      days.add(m["day"]);
      if (m["type"] == "paid") {
        paidSum = paidSum + m["price"];
      }
      if (m["type"] == "recieved") {
        recievedSum = recievedSum + m["price"];
      }
    });
  } else if (
    filterState.paidState == true &&
    filterState.recievedState == false
  ) {
    data.forEach((tr) => {
      if (
        tr["year"] == yearHead &&
        tr["month"] == monthHead &&
        tr["type"] == "paid"
      ) {
        monthTransactions.push(tr);
      }
    });

    monthTransactions.forEach((m) => {
      days.add(m["day"]);
      if (m["type"] == "paid") {
        paidSum = paidSum + m["price"];
      }
      if (m["type"] == "recieved") {
        recievedSum = recievedSum + m["price"];
      }
    });
  } else if (
    filterState.paidState == false &&
    filterState.recievedState == true
  ) {
    data.forEach((tr) => {
      if (
        tr["year"] == yearHead &&
        tr["month"] == monthHead &&
        tr["type"] == "recieved"
      ) {
        monthTransactions.push(tr);
      }
    });

    monthTransactions.forEach((m) => {
      days.add(m["day"]);
      if (m["type"] == "paid") {
        paidSum = paidSum + m["price"];
      }
      if (m["type"] == "recieved") {
        recievedSum = recievedSum + m["price"];
      }
    });
  }

  return [monthTransactions, days, paidSum, recievedSum];
}

function getDays(monthTransactions, day) {
  const dayInfo = new Array();
  dayInfo.splice(0, dayInfo.length);
  monthTransactions.forEach((m) => {
    if (m["day"] == day) {
      dayInfo.push(m);
    }
  });

  return dayInfo;
}

function nextMonth(dateState) {
  if (dateState.monthHead < 12) {
    dateState.monthHead = dateState.monthHead + 1;
  } else {
    dateState.yearHead = dateState.yearHead + 1;
    dateState.monthHead = 1;
  }
}

function prevMonth(dateState) {
  if (dateState.monthHead > 1) {
    dateState.monthHead = dateState.monthHead - 1;
  } else {
    dateState.yearHead = dateState.yearHead - 1;
    dateState.monthHead = 12;
  }
}

function get3Month(dateState) {
  return [
    dateState.monthHead == 1 ? 12 : dateState.monthHead - 1,
    dateState.monthHead,
    dateState.monthHead == 12 ? 1 : dateState.monthHead + 1,
  ];
}

function getFaMonth(m) {
  return faMonths[m - 1];
}

function currentDate() {
  return moment(Date.now()).format("jYYYY/jMM/jDD");
}

export default function Transaction() {
  const data = useSelector(listData);
  console.log(data);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isNewTransactionDialogOpen, newTransactionDialogSetState] =
    React.useState(false);
  const [isTransactionDialogOpen, transactionDialogSetState] =
    React.useState(false);
  const [dateState, setDateState] = React.useState(initialDateState);
  const [filterState, setFilterState] = React.useState(initialFilterState);

  const showAddTransactionDialog = () => {
    newTransactionDialogSetState(false);
    transactionDialogSetState(true);
  };
  const showNewTransactionDialog = () => {
    newTransactionDialogSetState(true);
  };

  const closeNewTransactionDialog = () => {
    newTransactionDialogSetState(false);
  };

  const closeAddTransactionDialog = () => {
    transactionDialogSetState(false);
  };

  const [monthTransactions, daysSet, paidSum, recievedSum] = getMonthInfo(
    data,
    filterState,
    dateState
  );

  console.log(daysSet);

  function optionPressed(filter) {
    if (filterState.paidState == false && filterState.recievedState == false) {
      if (filter == "paid") {
        filterState.paidState = true;
      } else {
        filterState.recievedState = true;
      }
    } else if (
      filterState.paidState == false &&
      filterState.recievedState == true
    ) {
      filterState.recievedState = false;
    } else if (
      filterState.paidState == true &&
      filterState.recievedState == false
    ) {
      filterState.paidState = false;
    }
    setFilterState({ ...filterState });
  }

  const [mBefore, mCurrent, mNext] = get3Month(dateState);
  return (
    <div className="main">
      <div className="month-parts">
        <Button
          className="arrow-icon-button"
          startIcon={
            <ArrowForwardIosIcon id="next-month" className="icons-style" />
          }
          variant="contained"
          onClick={() => {
            nextMonth(dateState);
            setDateState({ ...dateState });
          }}
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
          onClick={() => {
            prevMonth(dateState);
            setDateState({ ...dateState });
          }}
        >
          {getFaMonth(mBefore)}
        </Button>
      </div>
      <div className="report-block">
        <Grid container alignContent="space-around">
          <Grid item xs={6}>
            <div
              onClick={() => {
                optionPressed("paid");
              }}
              className={
                (filterState.paidState == false &&
                  filterState.recievedState == false) ||
                (filterState.paidState == true &&
                  filterState.recievedState == false)
                  ? "paper payment-color"
                  : "paper-disabled payment-color"
              }
            >
              <h3 className="title">پرداختی دوره</h3>
              <p className="sum">{paidSum} تومان</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              onClick={() => {
                optionPressed("recieved");
              }}
              className={
                (filterState.paidState == false &&
                  filterState.recievedState == false) ||
                (filterState.recievedState == true &&
                  filterState.paidState == false)
                  ? "paper received-color"
                  : "paper-disabled received-color"
              }
            >
              <h3 className="title">دریافتی دوره</h3>
              <p className="sum"> {recievedSum} تومان</p>
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
                {recievedSum - paidSum < 0
                  ? paidSum - recievedSum + "-"
                  : recievedSum - paidSum}
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
              <p className="title">{monthTransactions.length}</p>
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
          onClick={showNewTransactionDialog}
        >
          تراکنش جدید
        </Button>
        <Dialog
          classes={{
            paper: classes.dialog,
          }}
          open={isNewTransactionDialogOpen}
          onClose={closeNewTransactionDialog}
          TransitionComponent={Transition}
        >
          <List className="dialog">
            <div className="align">
              <b>تراکنش جدید</b>
            </div>
            <div
              className="align clickable"
              onClick={() => {
                method = "paid";
                showAddTransactionDialog();
              }}
            >
              پرداخت
            </div>
            <Divider />
            <div
              className="align clickable"
              onClick={() => {
                method = "recieved";
                showAddTransactionDialog();
              }}
            >
              دریافت
            </div>
            <Divider />
            {/* <div
              className="align clickable"
              onClick={() => {
                method = "change";
                handleClickOpen();
              }}
            >
              جیب به جیب
            </div> */}
            <Divider />
          </List>
        </Dialog>
        <Dialog
          classes={{
            paper: classes.dialog,
          }}
          open={isTransactionDialogOpen}
          onClose={closeAddTransactionDialog}
          TransitionComponent={Transition}
        >
          <AddTransaction
            operation={"add"}
            method={method}
            date={currentDate()}
            onClose={closeAddTransactionDialog}
          />
        </Dialog>
      </div>
      <div className="transaction-block">
        {Array.from(daysSet).map((day, i) => (
          <DailyTransactionsSection
            key={i}
            num={day}
            month={getFaMonth(mCurrent)}
            data={getDays(monthTransactions, day)}
          />
        ))}
      </div>
    </div>
  );
}
