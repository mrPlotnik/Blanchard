document.addEventListener('DOMContentLoaded', function() {

  // ---------- Кастомизация инпута

   const el = document.querySelector('select');
   const choises = new Choices(el,{
     searchEnabled: false,
     itemSelectText: '',
   });

  // ---------- Галерея с навигацией  пагинацией

  const swiper = new Swiper('.mySwiper', {
    // loop: true,
    effect: "fade",
    allowTouchMove: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    pagination: {
      el: '.swiper-pagination',
      type: "fraction",
      // clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next1",
      prevEl: ".swiper-button-prev1",
    },
    // pagination: true,
  });

  // ---------- Аккордион на jQuery

  $("#accordion").accordion({
    // header: ".section-faq__item",
    icons: false,
    heightStyle: "content",
    collapsible: true
  });

});


