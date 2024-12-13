// openHeaderMenu
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

// slick Slider
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

// countNumber
function countNumber() {
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".Number-container-info__num");
    const speed = 100;

    const countEffect = (counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      counter.innerText = "0";

      const updateCount = () => {
        const count = parseInt(counter.innerText, 10);
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countEffect(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  });
}

openHeaderMenu();
slickSlider();
countNumber();
