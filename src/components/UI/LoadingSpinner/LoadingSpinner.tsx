import React from "react";
import classes from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
  return (
    <div className={classes.ldsring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
