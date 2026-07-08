

const thumbSwiper = new Swiper(".thumb-swiper", {
  direction: "vertical",
  slidesPerView: "auto",
  spaceBetween: 50,
  centeredSlides: false,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
  speed: 1000,
  loop: true,
  freeMode: true,
});

const imageSwiper = new Swiper(".image-swiper", {
    direction: "vertical",
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    mousewheel: true,
    slideToClickedSlide: true,
    
});

const mainSwiper = new Swiper(".main-swiper", {
    direction: "vertical",
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    mousewheel: true,
    thumbs: {
        swiper: thumbSwiper,
    },
    controller: {
    inverse: true,
  },
});
// mainSwiper.controller.control = imageSwiper;
// imageSwiper.controller.control = mainSwiper;
// thumbSwiper.controller.control = mainSwiper;

const banner = new Swiper('.banner', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 5000,
  },
});


$(document).ready(function () {
  $(".deal-name a").click(function (e) {
    e.preventDefault();
    $(this).closest(".deal-box-outer").find(".USP-detail").slideToggle("fast");
  });

});


const items = document.querySelectorAll(".item-desc");

items.forEach((item) => {
  item.addEventListener("click", () => {
    removeActiveClasses();
    item.classList.add("active");
  });
});

function removeActiveClasses() {
  items.forEach((item) => {
    item.classList.remove("active");
  });
}

$(".reamoredbtn").click(function () {
    $(".moretext").slideToggle("slow");
    if ($(this).text() == "Read More") $(this).text("Read Less")
    else $(this).text("Read More");
});


function calculateWheel() {
    const slides = document.querySelectorAll(
        '.thumb-swiper .swiper-slide'
    );

    const active = thumbSwiper.activeIndex;

    slides.forEach((slide, index) => {

        let diff = index - active;

        // Fix loop mode
        const total = slides.length;

        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        const abs = Math.abs(diff);

        // Move cards toward left
        const translateX = -(abs * abs * 12);

        // Vertical spacing
        const translateY = diff * 110;

        // Rotation
        const rotate = diff * 12;

        // Active card larger
        const scale = abs === 0 ? 1 : 0.85;

        slide.style.transform = `
            translate(${translateX}px, ${translateY}px)
            rotate(${rotate}deg)
            scale(${scale})
        `;

        slide.style.zIndex = 100 - abs;
    });
}

thumbSwiper.on('setTranslate', calculateWheel);
thumbSwiper.on('slideChange', calculateWheel);

calculateWheel();




