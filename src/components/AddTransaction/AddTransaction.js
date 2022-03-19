import React, { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Radio from "@mui/material/Radio";
import Slide from "@mui/material/Slide";
import { makeStyles, Dialog } from "@material-ui/core";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import CategoryDialog from "../Category/Category";
import "./AddTransaction.css";

import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  listData,
} from "../../app/dataSlice";
import {
  TransactionModel,
  getNextTransactionSequenceId,
} from "../../app/models";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  dialog: {
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    padding: "1rem",
  },
}));

function AddTransaction(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isCategoryDialogOpen, categoryDialogSetState] = React.useState(false);
  const [state, setState] = React.useState({
    price: props.price || 0,
    note: props.note || "",
    category: props.category || "",
  });
  const { onClose, operation } = props;
  const [selectedDay, setSelectedDay] = useState(null);

  const handlePrice = (event) => {
    setState({ ...state, price: Number(event.target.value) });
  };
  const handleCategory = (category) => {
    setState({ ...state, category });
  };
  const handleNote = (event) => {
    setState({ ...state, note: event.target.value });
  };
  const showCategoryDialog = () => {
    categoryDialogSetState(true);
  };
  const closeCategoryDialog = () => {
    categoryDialogSetState(false);
  };

  function makeTransaction(operation) {
    const today = props.date.split("/");
    return new TransactionModel(
      operation == "add" ? getNextTransactionSequenceId() : props.id,
      props.method,
      state.price,
      state.note,
      state.category,
      Number(selectedDay == null ? today[0] : selectedDay.year),
      Number(selectedDay == null ? today[1] : selectedDay.month),
      Number(selectedDay == null ? today[2] : selectedDay.day)
    );
  }

  return (
    <List className="dialog-list">
      <div className="item-align">
        {operation == "edit" ? (
          <DeleteIcon
            className="delete"
            onClick={() => {
              dispatch(
                deleteTransaction(new TransactionModel(props.id).toJson())
              );
              onClose();
            }}
          />
        ) : (
          <></>
        )}
        <b className="add-title">
          {operation == "add" ? "تراکنش جدید" : "ویرایش تراکنش "}
        </b>
      </div>
      <div className="date-section">
        <CalendarTodayIcon className="calendar" />
        <DatePicker
          className="date-piker"
          value={selectedDay}
          onChange={setSelectedDay}
          inputPlaceholder={props.date}
          shouldHighlightWeekends
          locale="fa"
        />
      </div>
      <Divider />
      <RadioGroup
        className="radio-group"
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          className="pppp"
          value="paid"
          control={
            <Radio
              color="success"
              checked={props.method == "paid" ? true : false}
            />
          }
          label="پرداخت"
        />
        <FormControlLabel
          value="recieved"
          control={
            <Radio
              color="success"
              checked={props.method == "recieved" ? true : false}
            />
          }
          label="دریافت"
        />
        {/* <FormControlLabel
          value="change"
          control={
            <Radio
              color="success"
              checked={props.method == "change" ? true : false}
            />
          }
          label="جیب به جیب"
        /> */}
      </RadioGroup>
      <Divider />

      <div className="price-section">
        <p>مبلغ:</p>
        <TextField
          id="standard-size-normal"
          defaultValue={operation == "add" ? "" : props.price}
          variant="standard"
          className="price-textField-style"
          onChange={handlePrice}
        />
      </div>
      <Divider />
      <div
        className="category-section"
        onClick={() => {
          showCategoryDialog();
        }}
      >
        <p>دسته بندی:</p>
        <span className="category-text">{state.category}</span>
      </div>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        open={isCategoryDialogOpen}
        onClose={closeCategoryDialog}
        TransitionComponent={Transition}
      >
        <CategoryDialog
          method={props.method}
          onClick={closeCategoryDialog}
          handleCategory={handleCategory}
        />
      </Dialog>
      <Divider />
      <div className="note-section">
        <p>یادداشت:</p>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={2}
          variant="standard"
          defaultValue={operation == "add" ? "" : props.note}
          className="note-textField-style"
          onChange={handleNote}
        />
      </div>
      <div className="actions-block">
        <Button
          className="ok-icon-button"
          startIcon={<CheckIcon className="icons-style" />}
          variant="contained"
          onClick={() => {
            if (operation == "add") {
              dispatch(addTransaction(makeTransaction(operation).toJson()));
            }
            if (operation == "edit") {
              dispatch(updateTransaction(makeTransaction(operation).toJson()));
            }

            onClose();
          }}
        >
          تایید
        </Button>
        <Button
          className="cancel-icon-button"
          startIcon={<ClearIcon className="icons-style" />}
          variant="contained"
          onClick={onClose}
        >
          لغو
        </Button>
      </div>
    </List>
  );
}
export default  AddTransaction;