document.addEventListener('DOMContentLoaded', function() {

  // ---------- Кастомизация инпута choices.js в секции galery

   const el = document.querySelector('select');
   const choises = new Choices(el,{
     searchEnabled: false,
     itemSelectText: '',
   });

  // ---------- Первый свайпер в секции galery

  const swiper1 = new Swiper('#swiper-galery', {
    effect: "fade",
    simulateTouch: true, // Принимает события мыши, как событие касания пальцами
    grabCursor: true, // "Grab" курсор для повышения юзабилити на десктопах
    autoplay: {
      disableOnInteraction: true, // Автоплей не останавливается после конца итереций
    },
    pagination: {
      el: '.swiper-pagination',
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next1",
      prevEl: ".swiper-button-prev1",
    },
  });

  // ---------- Аккордион на jQuery в сеrции catalog

  $("#accordion").accordion({
    // header: ".section-faq__item",
    icons: false,
    heightStyle: "content",
    collapsible: true
  });

// ---------- Второй свайпер в секции events

  const swiper2 = new Swiper('#swiper-events', {
    // loop: true,
    effect: "fade",
    simulateTouch: true, // Принимает события мыши, как событие касания пальцами
    grabCursor: true, // "Grab" курсор для повышения юзабилити на десктопах
    autoplay: {
      disableOnInteraction: true, // Автоплей не останавливается после конца итереций
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

// ---------- ВТретий свайпер в секции projects

const swiper3 = new Swiper('#swiper-partners', {
  // loop: true,
  simulateTouch: true, // Принимает события мыши, как событие касания пальцами
  grabCursor: true, // "Grab" курсор для повышения юзабилити на десктопах
  autoplay: {
    disableOnInteraction: true, // Автоплей не останавливается после конца итереций
  },
  navigation: {
    nextEl: ".swiper-button-next1",
    prevEl: ".swiper-button-prev1",
  },
});



});
