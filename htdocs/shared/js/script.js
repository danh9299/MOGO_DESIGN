function openHeaderMenu() {
  document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.querySelector(".Header-container-top");
    const headerMenu = document.querySelector(".Header-container-top-menu");
    const headerModal = document.querySelector(".Header-container-top__modal");
    const body = document.body;

    const openMenu = () => {
      headerContainer.classList.add("js-openHeaderTopNav");
      body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      headerContainer.classList.remove("js-openHeaderTopNav");
      body.style.overflow = "auto";
    };

    headerMenu.addEventListener("click", () => {
      const isMenuOpen = headerContainer.classList.contains(
        "js-openHeaderTopNav"
      );
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    headerModal.addEventListener("click", closeMenu);
  });
}

function slickSlider() {
  $(document).ready(function () {
    $(".Header-container-slider").slick({
      dots: false,
      arrows: false,
      prevArrow: false,
      nextArrow: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
    });

    $(".Header-container-slider").on(
      "afterChange",
      function (event, slick, currentSlide) {
        updateProgressFill(currentSlide);
      }
    );

    $(".Header-container-category-list li").on("click", function () {
      var index = $(this).data("slide");
      $(".Header-container-slider").slick("slickGoTo", index);
    });

    updateProgressFill(0);
  });

  function updateProgressFill(currentSlide) {
    const progressWidth = $(
      ".Header-container-category-list-item-progress"
    ).width();
    const totalSlides = $(".Header-container-category-list-item").length;

    const segmentWidth = progressWidth / totalSlides;
    const leftPosition = currentSlide * segmentWidth;

    const progressFill = $(
      ".Header-container-category-list-item-progress__fill"
    );
    progressFill.css({
      left: leftPosition + "px",
      width: segmentWidth + "px",
    });
  }
}

openHeaderMenu();
slickSlider();
