import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';
import { makeStyles, Dialog } from '@material-ui/core'
import DailyTransactionsSection from "../DailyTransactionsSection/DailyTransactions";
import AddTransaction from "../AddTransaction/AddTransaction";
import "./Transaction.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({

  dialog: {
    borderRadius: "30px 30px 0px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: -30,
    padding: "1rem",
  }
}));

export default function Transaction() {
  const classes = useStyles();
  const [openItems, setOpenItems] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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
        <Button className="icon-button" variant="contained" onClick={handleClickOpenItems} >
          تراکنش جدید
        </Button>
        <Dialog
          classes={{
            paper: classes.dialog
          }}
          open={openItems}
          onClose={HandleCloseItems}

          TransitionComponent={Transition}
        >
          <List className="dialog">
            <div className="align"><b>تراکنش جدید</b>
            </div>
            <div className="align clickable" onClick={handleClickOpen}>
              پرداخت</div>
            <Divider />
            <div className="align clickable">
              دریافت</div>
            <Divider />
            <div className="align clickable">
              جیب به جیب</div>
            <Divider />
          </List>
        </Dialog>
        <Dialog
          classes={{
            paper: classes.dialog
          }}
          open={open}
          onClose={handleClose}

          TransitionComponent={Transition}
        >
          <AddTransaction />
        </Dialog>
      </div>
      <div className="transaction-block">
        <DailyTransactionsSection />
      </div>
    </div>
  );
}

