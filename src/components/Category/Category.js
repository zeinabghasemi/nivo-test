import React from "react";
import "./Category.css";
import Avatar from "@material-ui/core/Avatar";
import CategoryIcon from "@material-ui/icons/Category";
import ClearIcon from "@material-ui/icons/Clear";

import { useSelector, useDispatch } from "react-redux";
import { listCategories } from "../../app/dataSlice";

function CategoryDialog(props) {
  const categories = useSelector(listCategories);
  const { handleCategory } = props;

  return (
    <div className="category-main-section">
      <div className="header-section">
        <p>انتخاب دسته بندی</p>
        <ClearIcon
          className="icon-clear-style"
          onClick={() => {
            props.onClick();
          }}
        />
      </div>
      {props.method == "paid"
        ? categories.paid.map((item, i) => (
            <div key={i}>
              <div
                className="transaction-section"
                onClick={() => {
                  props.onClick();
                  handleCategory(item);
                }}
              >
                <div className="tarnsaction-title">
                  <Avatar alt="transaction" className="avatar">
                    <CategoryIcon />
                  </Avatar>
                  <p className="name">{item}</p>
                </div>
              </div>
            </div>
          ))
        : categories.recieved.map((item, i) => (
            <div key={i}>
              <div
                className="transaction-section"
                onClick={() => {
                  props.onClick();
                  handleCategory(item);
                }}
              >
                <div className="tarnsaction-title">
                  <Avatar alt="transaction" className="avatar">
                    <CategoryIcon />
                  </Avatar>
                  <p className="name">{item}</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default CategoryDialog;
