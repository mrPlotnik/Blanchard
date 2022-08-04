document.addEventListener('DOMContentLoaded', function() {



   // Бургер
   function burger() {
    const burger = document.querySelector('.nav__burger');
    const menuMobile = document.querySelector('.nav__mobile');
    const closeMenu = document.querySelector('.nav__close');

    const toggleMenu = function(q) {
      q.classList.toggle('nav__open');
    }

    burger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu(menuMobile);
    })

    closeMenu.addEventListener('click', function(e) {
      toggleMenu(menuMobile);
    })

    // Отслеживаю клик вне контейнера .site-header__menu-mobile
    document.addEventListener('click', function(e) {
      // Определяю место клика
      const target = e.target;
      // Клик был на .site-header__menu-mobile и его вложенные элементы или нет?
      const itsMenu = target == menuMobile || menuMobile.contains(target);
      // .site-header__menu-mobile открыт?
      const menuIsActive = menuMobile.classList.contains('open');

      // Если клик был вне .site-header__menu-mobile и .site-header__menu-mobile открыт, то выполняю код
      if (!itsMenu && menuIsActive) {
        toggleMenu(menuMobile);
      }
    });
  }

  // ---------- Кастомизация инпута choices.js в секции galery

   const el = document.querySelector('select');
   const choises = new Choices(el,{
     searchEnabled: false,
     itemSelectText: '',
   });

  // ---------- Первый свайпер в секции galery

  const swiper1 = new Swiper('#swiper-galery', {
    effect: "fade",
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // "Grab" курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
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
    icons: false,
    heightStyle: "content",
    collapsible: true
  });

  // ---------- Второй свайпер в секции events

  const swiper2 = new Swiper('#swiper-events', {
    effect: "fade",
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // "Grab" курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // ---------- Третий свайпер в секции projects

  const swiper3 = new Swiper('#swiper-partners', {
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // "Grab" курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".swiper-button-next1",
      prevEl: ".swiper-button-prev1",
    },
  });

  burger();

});

// ---------- Yandex-карты

// Дождёмся загрузки API и готовности DOM
ymaps.ready(init);
function init() {
  // Создание экземпляра карты и его привязка к контейнеру с
  // заданным id ("map")
  myMap = new ymaps.Map("map", {
      // Координаты центра карты
      center: [55.760000, 37.614700],
      // Уровень масштабирования. От 0 (весь мир) до 19
      zoom: 14
  });

  myPlacemark = new ymaps.Placemark([55.76000, 37.614700], {}, {
    // Опции
    // Необходимо указать данный тип макета
    iconLayout: 'default#image',
     // Своё изображение иконки метки
    iconImageHref: '../img/map-point.svg',
    // Размеры метки
    iconImageSize: [20, 20],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки)
    iconImageOffset: [-10, -10]
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
}
