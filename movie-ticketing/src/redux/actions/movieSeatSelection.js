import * as actionTypes from "./actionTypes";

export const submitInfo = (userInfo) => ({
  type: actionTypes.SUBMIT_INFO,
  userInfo
});

export const confirmSeat = () => ({
  type: actionTypes.CONFIRM_SEAT
});

export const selectSeat = (row, col) => ({
  type: actionTypes.SELECT_SEAT,
  seat: {
    row,
    col
  }
});
