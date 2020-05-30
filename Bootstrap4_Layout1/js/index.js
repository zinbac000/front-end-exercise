import { CountUp } from "./countUp/countUp.min.js";

// Check if the element is on viewport or not
function isOnScreen(el) {
  const viewPortTop = $(window).scrollTop();
  const viewPortBottom = viewPortTop + $(window).height();
  const top = $(el).offset().top;
  const bottom = top + $(el).innerHeight();

  return !(viewPortBottom < top || viewPortTop > bottom);
}

$(function () {
  const countUpList = [];
  $(".stat__item [data-stat]").each((index, element) => {
    const countUp = new CountUp(element, +$(element).data("stat"));
    countUpList.push(countUp);
  });

  var isCounting = false;

  if (isOnScreen("#stat")) {
    isCounting = true;
    countUpList.forEach((counter) => {
      counter.start();
    });
  }
  $(window).on("scroll", () => {
    if (isOnScreen("#stat") && !isCounting) {
      isCounting = true;
      countUpList.forEach((counter) => {
        counter.start();
      });
    }
  });
});
