$(function () {
  // SELECT INPUT JAVASCRIPT
  $(".select-input .dropdown-item").click(function () {
    var text = $(this).text();
    $(this)
      .parents(".select-input")
      .find(".select-input__link span")
      .text(text);
  });
});
