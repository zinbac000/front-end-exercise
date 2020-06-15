const createTable = function () {
  var colCount = +document.getElementById("colCount").value;
  var rowCount = +document.getElementById("rowCount").value;

  if (isNaN(colCount) || isNaN(rowCount)) {
    alert("Xin nhập số cho hàng và cột");
    return;
  }

  var tBody = document.getElementById("tBody");

  var bodyHtml = "";

  for (var i = 0; i < rowCount; i++) {
    var rowHtml = "<tr>";
    for (var j = 0; j < colCount; j++) {
      var cellHtml = `<td>${i}${j}</td>`;
      rowHtml += cellHtml;
    }
    rowHtml += "</tr>";
    bodyHtml += rowHtml;
  }

  tBody.innerHTML = bodyHtml;
};

var btnCreate = document.getElementById("btnCreate");
btnCreate.addEventListener("click", createTable);
