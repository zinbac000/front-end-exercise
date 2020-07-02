$(function () {
  $(".courses__slider, .testimonial__slider").slick({
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
          arrows: false
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          arrows: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          arrows: true
        }
      }
    ]
  });

  $(".courses__slider.collapse").on("shown.bs.collapse", function () {
    $(this).slick("setPosition");
  });

  $(".courses__desktop .nav-link").on("shown.bs.tab", function () {
    let targetTab = $(this).attr("href");
    $(targetTab).slick("setPosition");
  });
});
