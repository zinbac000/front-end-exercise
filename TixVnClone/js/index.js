$(function () {
  // TRAILER SLIDER INIT
  $(".trailer__slider").slick({
    arrows: true,
    dots: true,
    autoplay: true
  });
  // MOVIE SLIDER INIT
  $(".movie__slider").slick({
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          arrows: true
        }
      }
    ]
  });

  $(".apps__slider").slick({
    autoplay: true,
    arrows: false,
    dots: false
  });

  $('a[data-toggle="tab"]').on("shown.bs.tab", () => {
    $(".slider").slick("setPosition");
  });
});
