import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./DailyTransactions.css";
import AddTransaction from "../AddTransaction/AddTransaction";
import { makeStyles, Dialog } from "@material-ui/core";
import Slide from "@mui/material/Slide";

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
  },
}));

function DailyTransactionsSection(props) {
  const classes = useStyles();
  function monthDataGenerate() {
    var sum = 0;
    props.data.forEach((m) => {
      if (m["type"] == "paid") {
        sum = sum - m["price"];
      }
      if (m["type"] == "recieved") {
        sum = sum + m["price"];
      }
    });
    return sum;
  }

  const dialogStateTable = {};
  props.data.map((d) => {
    dialogStateTable[d["id"]] = false;
  });
  const [isAddTransactionDialogOpenTable, addTransactionDialogSetState] =
    React.useState(dialogStateTable);

  if (
    !Object.keys(dialogStateTable).equals(
      Object.keys(isAddTransactionDialogOpenTable)
    )
  ) {
    addTransactionDialogSetState(dialogStateTable);
  }

  const closeAddTransactionDialog = (id) => {
    addTransactionDialogSetState({
      ...isAddTransactionDialogOpenTable,
      [id]: false,
    });
  };
  const showAddTransactionDialog = (id) => {
    addTransactionDialogSetState({
      ...isAddTransactionDialogOpenTable,
      [id]: true,
    });
  };

  return (
    <div className="main-section">
      <div className="date-label">
        <span className="date"> {props.num + " " + props.month}</span>
        <span>
          {monthDataGenerate() < 0
            ? Math.abs(monthDataGenerate()) + "-"
            : monthDataGenerate() + "+"}
        </span>
      </div>
      {props.data.map((item, i) => (
        <div key={i}>
          <div
            className="transaction-section"
            onClick={() => showAddTransactionDialog(item["id"])}
          >
            <div className="tarnsaction-title">
              <Avatar alt="transaction" className="avatar">
                <CreditCardIcon />
              </Avatar>
              <p className="name">{item["category"]}</p>
            </div>
            <div className="transaction-price">
              <p>
                {item["type"] == "recieved"
                  ? item["price"] + "+"
                  : item["price"] + "-"}
              </p>
            </div>
          </div>
          <Dialog
            classes={{
              paper: classes.dialog,
            }}
            open={isAddTransactionDialogOpenTable[item["id"]]}
            onClose={() => closeAddTransactionDialog(item["id"])}
            TransitionComponent={Transition}
          >
            <AddTransaction
              operation={"edit"}
              method={item["type"]}
              date={item["year"] + "/" + item["month"] + "/" + item["day"]}
              price={item["price"]}
              note={item["note"]}
              id={item["id"]}
              category={item["category"]}
              onClose={() => closeAddTransactionDialog(item["id"])}
            />
          </Dialog>
        </div>
      ))}
    </div>
  );
}

export default DailyTransactionsSection;
