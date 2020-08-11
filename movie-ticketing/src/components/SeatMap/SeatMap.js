import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./SeatMap.module.css";
import * as constants from "../../shared/constants";
import * as actions from "../../redux/actions/index";

class SeatMap extends Component {
  renderColLabels = () => {
    return this.props.seatMap.labels.colLabels.map((label) => (
      <div key={label} className={classes.CellWrapper}>
        {label}
      </div>
    ));
  };

  handleSelectSeat = (row, col) => {
    this.props.selectSeat(row, col);
  };

  renderRowData = () => {
    return this.props.seatMap.rowData.map((row, rowIndex) => (
      <div key={rowIndex} className={classes.Row}>
        <div className={classes.Label}>{this.props.seatMap.labels.rowLabels[rowIndex]}</div>
        {row.map((value, colIndex) => (
          <div key={colIndex} className={classes.CellWrapper}>
            {value !== constants.NOT_SEAT ? (
              <div className={[classes.SeatCell, this.getSeatClass(value)].join(" ")} onClick={() => this.handleSelectSeat(rowIndex, colIndex)}></div>
            ) : null}
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.props.seatSelectable ? <p className={classes.SelectWarning}>Please select your seat NOW!</p> : null}
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

const mapStateToProps = (state) => ({
  seatMap: state.movieSeatSelection.seatMap,
  seatSelectable: state.movieSeatSelection.seatSelectable
});

const mapDispatchToProps = {
  selectSeat: actions.selectSeat
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatMap);
