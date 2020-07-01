$(function () {
  $(".courses__slider").slick({
    mobileFirst: true,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          arrows: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      }
    ]
  });

  $(".courses__slider.collapse").on("shown.bs.collapse", function () {
    $(this).slick("setPosition");
  });
});
