const btnPlay = document.querySelector(".movie-detail__play");
btnPlay.addEventListener("click", function () {
  const trailer = document.querySelector(".movie-detail__trailer");
  console.log(trailer);
  trailer.style.display = "block";
});
