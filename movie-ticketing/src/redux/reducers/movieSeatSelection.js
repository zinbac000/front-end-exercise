import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userInfo: {
    name: "",
    seatNumbers: 0
  },
  seatMap: {
    labels: {
      colLabels: ["1", "2", "3", "4", "5", "", "6", "7", "8", "9", "10", "11", "12"],
      rowLabels: ["A", "B", "C", "D", "E", "", "F", "G", "H", "I", "J"]
    },
    rowData: [
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 2, 2, 2, 2, 0],
      [0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  seatSelectable: false,
  selectedSeats: [],
  confirmedTicket: {
    name: null,
    seatNumbers: null,
    seats: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_INFO:
      return { ...state, userInfo: action.userInfo, seatSelectable: true };
    case actionTypes.SELECT_SEAT:
      if (!state.seatSelectable) {
        return state;
      }

      const { row, col } = action.seat;
      const newSelectedSeats = [...state.selectedSeats];
      const newRowData = [...state.seatMap.rowData];
      let seatValue;

      // Check if the seleting seat exists in the selected seats. If exists then user is trying to unselect it
      // Therefore, we will remove the seat in selectedSeats and set value in seat map to SEAT_EMPTY = 0
      // Otherwise, we will add the seat to selectedSeats and set value in seat map to SEAT_SELECTED = 1
      const selectedFound = newSelectedSeats.findIndex((selected) => selected.row === row && selected.col === col);
      if (selectedFound !== -1) {
        seatValue = 0;
        newSelectedSeats.splice(selectedFound, 1);
      } else if (newSelectedSeats.length < state.userInfo.seatNumbers) {
        seatValue = 1;
        newSelectedSeats.push(action.seat);
      } else {
        // If number of selected seats is greater than or equal to the seat numbers chosen from user, we won't change the state
        return state;
      }

      const newRow = [...newRowData[row]];
      newRow[col] = seatValue;
      newRowData.splice(row, 1, newRow);

      return { ...state, seatMap: { ...state.seatMap, rowData: newRowData }, selectedSeats: newSelectedSeats };
    case actionTypes.CONFIRM_SEAT:
      const {
        userInfo: { name, seatNumbers },
        seatMap: {
          labels: { rowLabels, colLabels }
        },
        selectedSeats
      } = state;
      const confirmedTicket = {
        name,
        seatNumbers,
        seats: selectedSeats.map(({ row, col }) => `${rowLabels[row]}${colLabels[col]}`).join(", ")
      };
      return { ...state, confirmedTicket, seatSelectable: false };
    default:
      return state;
  }
};
