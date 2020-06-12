$(function () {
  // Toggle side menu when click on the toggler
  $(".header__toggler").click(function () {
    $(".header__backdrop").toggleClass("active");
  });
  // Close side menu when click on the backdrop
  $(".header__backdrop").click(function (e) {
    if (e.target.className === "header__backdrop active") {
      $(this).removeClass("active");
    }
  });
  // When click a value in location modal on mobile, the value will be updated in location link in side menu
  $("#locationModal li").click(function () {
    var text = $(this).text();
    $(".header__side-menu__location").text(text);
    $("#locationModal").modal("hide");
  });

  // Close side menu when click a link in the menu except location link
  $(".header__side-menu a:not(.header__side-menu__location)").click(
    function () {
      $(".header__backdrop").toggleClass("active");
    }
  );
});
