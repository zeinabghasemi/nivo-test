import React, { Component } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import FormLabel from "@mui/material/FormLabel";
// import { DatePicker } from "jalali-react-datepicker";
import "./AddTransaction.css";

class AddTransaction extends Component {
  render() {
    return (
      <List className="dialog-list">
        <div className="item-align">
          <b>تراکنش جدید</b>
        </div>
        <div className="date-section" onClick={() => {}}>
          <CalendarTodayIcon className="calendar" />
          <TextField
            disabled
            className="textField-style"
            id="standard-size-normal"
            defaultValue="1370/02/02"
            variant="standard"
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
            value="paid"
            control={<Radio color="success" />}
            label="پرداخت"
          />
          <FormControlLabel
            value="recieved"
            control={<Radio color="success" />}
            label="دریافت"
          />
          <FormControlLabel
            value="change"
            control={<Radio color="success" />}
            label="جیب به جیب"
          />
        </RadioGroup>
        <Divider />
        <div className="price-section">
          <p>مبلغ:</p>
          <TextField
            id="standard-size-normal"
            defaultValue=""
            variant="standard"
            className="price-textField-style"
          />
        </div>
        <Divider />
        <div className="note-section">
          <p>یادداشت:</p>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={2}
            variant="standard"
            defaultValue=""
            className="note-textField-style"
          />
        </div>
        <div className="actions-block">
          <Button
            className="ok-icon-button"
            startIcon={<CheckIcon className="icons-style" />}
            variant="contained"
            onClick={() => {}}
          >
            تایید
          </Button>
          <Button
            className="cancel-icon-button"
            startIcon={<ClearIcon className="icons-style" />}
            variant="contained"
            onClick={() => {}}
          >
            لغو
          </Button>
        </div>
      </List>
    );
  }
}

export default AddTransaction;
