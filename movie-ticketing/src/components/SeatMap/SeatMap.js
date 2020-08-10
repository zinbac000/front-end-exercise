import React, { Component } from "react";

import classes from "./SeatMap.module.css";
import * as constants from "../../shared/constants";

export default class SeatMap extends Component {
  seatMap = {
    labels: {
      colLabels: ["1", "2", "3", "4", "5", "", "6", "7", "8", "9", "10", "11", "12"],
      rowLabels: ["A", "B", "C", "D", "E", "", "F", "G", "H", "I", "J"]
    },
    rowData: [
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0]
    ]
  };

  renderColLabels = () => {
    return this.seatMap.labels.colLabels.map((label) => (
      <div key={label} className={classes.CellWrapper}>
        {label}
      </div>
    ));
  };

  renderRowData = () => {
    return this.seatMap.rowData.map((row, index) => (
      <div key={index} className={classes.Row}>
        <div className={classes.Label}>{this.seatMap.labels.rowLabels[index]}</div>
        {row.map((value, index) => (
          <div key={index} className={classes.CellWrapper}>
            {value !== constants.NOT_SEAT ? <div className={[classes.SeatCell, this.getSeatClass(value)].join(" ")}></div> : null}
          </div>
        ))}
      </div>
    ));
  };

  getSeatClass = (value) => {
    switch (value) {
      case constants.SEAT_EMPTY:
        return classes.Empty;
      case constants.SEAT_RESERVED:
        return classes.Reserved;
      case constants.SEAT_SELECTED:
        return classes.Selected;
      default:
        throw Error("seat type is not supported");
    }
  };

  render() {
    return (
      <div className={classes.SeatMap}>
        <div className={classes.SeatAnnotation}>
          <span className={classes.Selected}>Selected Seat</span>
          <span className={classes.Reserved}>Reserved Seat</span>
          <span className={classes.Empty}>Empty Seat</span>
        </div>
        <div className={classes.MapWrapper}>
          <div className={classes.Map}>
            <div className={classes.Row}>
              <div className={classes.Label}></div>
              {this.renderColLabels()}
            </div>
            {this.renderRowData()}
            <div className={classes.Screen}>SCREEN THIS WAY</div>
          </div>
        </div>
      </div>
    );
  }
}
