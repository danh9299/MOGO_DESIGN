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

function slickSliderHeader() {
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

    $(".Header-container-category-list-item").on("click", function () {
      var index = $(this).data("slide");
      $(".Header-container-slider").slick("slickGoTo", index);
    });

    updateProgressFill(0);
  });

  function updateProgressFill(currentSlide) {
    const categoryItems = $(".Header-container-category-list-item");
    const progressItems = $(
      ".Header-container-category-list-item-progress__fill"
    );

    categoryItems.removeClass("js-activeSlide");
    progressItems.css("width", "0");

    categoryItems.eq(currentSlide).addClass("js-activeSlide");
    progressItems.eq(currentSlide).css("width", "25%");
  }
}

//Slick Slider Quote
function slickSliderQuote() {
  $(document).ready(function () {
    $(".Quote-container-slider").slick({
      dots: false,
      prevArrow:
        '<div class="slick-prev Quote-container-slider-slick-prev"> <img src="shared/img/quote_ico_arrowleft01_pc_on.png"> </div>',
      nextArrow:
        '<div class="slick-next Quote-container-slider-slick-next">  <img src="shared/img/quote_ico_arrowright01_pc_on.png"> </div>',
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
    });
  });
}

//show Map
function showMap() {
  const mapToggleBtn = document.getElementById("mapToggleBtn");
  const mapContent = document.getElementById("mapContent");
  const mapOverlay = document.getElementById("mapOverlay");

  mapToggleBtn.addEventListener("click", function () {
    mapContent.classList.add("js-showMap");
    mapOverlay.classList.add("js-showOverlay");
    document.body.style.overflow = "hidden";
  });

  mapOverlay.addEventListener("click", function () {
    mapContent.classList.remove("js-showMap");
    mapOverlay.classList.remove("js-showOverlay");
    document.body.style.overflow = "";
  });
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

//Open dropdown
function dropDown() {
  document
    .querySelectorAll(".Support-container-task-list-item-content")
    .forEach((arrow) => {
      arrow.addEventListener("click", function () {
        const listItem = this.closest(".Support-container-task-list-item");

        const textContainer = listItem.querySelector(
          ".Support-container-task-list-item-description"
        );

        const isCurrentlyOpen =
          textContainer.style.maxHeight &&
          textContainer.style.maxHeight !== "0px";

        document
          .querySelectorAll(".Support-container-task-list-item-description")
          .forEach((otherTextContainer) => {
            otherTextContainer.style.maxHeight = "0";
            otherTextContainer.style.paddingTop = "0";
            otherTextContainer.style.paddingBottom = "0";
            otherTextContainer.style.borderBottom = "none";
          });

        if (isCurrentlyOpen) {
          textContainer.style.maxHeight = "0";
          textContainer.style.paddingTop = "0";
          textContainer.style.paddingBottom = "0";
          textContainer.style.borderBottom = "none";
        } else {
          textContainer.style.maxHeight = `${textContainer.scrollHeight}px`;
          textContainer.style.paddingTop = "10px";
          textContainer.style.paddingBottom = "10px";
          textContainer.style.borderBottom = " 1px solid #b6b6b6";
        }
      });
    });
}

//Show more
function showMoreIgPhotos() {
  document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.getElementById("showMoreBtn");
    const hiddenImages = document.querySelectorAll(
      ".Footer-container-ig-list__img--hidden-image"
    );
    let isExpanded = false;

    showMoreBtn.addEventListener("click", function () {
      if (!isExpanded) {
        hiddenImages.forEach((img) => (img.style.display = "block"));
        showMoreBtn.textContent = "View less photos";
        isExpanded = true;
      } else {
        hiddenImages.forEach((img) => (img.style.display = "none"));
        showMoreBtn.textContent = "View more photos";
        isExpanded = false;
      }
    });
  });
}

dropDown();
openHeaderMenu();
slickSliderHeader();
countNumber();
slickSliderQuote();
showMoreIgPhotos();
showMap();
