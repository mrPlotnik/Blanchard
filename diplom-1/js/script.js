document.addEventListener('DOMContentLoaded', function() {

  // --- Бургер

  burger();

  function burger() {
    const body = document.querySelector('body');
    const burger = document.querySelector('.nav__burger');
    const menuMobile = document.querySelector('.nav__mobile');
    const links = document.querySelectorAll('.nav-mobile__list-item a');
    // Выбираем все элементы для индекса в мобильном меню
    const elTab = document.querySelectorAll('.nav__burger, .nav-mobile__list-item a, .nav-mobile__login-link');

    // Что происходит после нажатия на бургер
    burger.addEventListener('click', function() {

      body.classList.toggle('stop-scroll');
      burger.classList.toggle('nav__burger--close');
      menuMobile.classList.toggle('nav-mobile--active');

      // Индексация в мобильном меню с клавиатуры
      elTab.forEach((tab, index) => {
        // Добавляем прослушку события на 'активный'
        // текущий элемент
        tab.addEventListener('keydown', (e) => {
          // Если нажата клавиша tab, то
          if (e.keyCode == 9) {
            // предотвращаем поведение по умолчанию
            e.preventDefault();
            // Если элемент не последний
            if (index != elTab.length - 1) {
              // задаем следующему элементу tabindex в 1
              // и вызываем метод фокуса на него
              elTab[index + 1].focus();
            } else {
              // Когда мы добираемся до последнего элемента,
              // устанавливаем фокус на первый элемент
              elTab[0].focus();
            }
          };
        });
      });
    });

    // Что происходит после кликов на ссылки
    links.forEach((el, index) => {
      el.addEventListener('click', function(e) {
        menuMobile.classList.toggle('nav-mobile--active');
        body.classList.toggle('stop-scroll');

        // Плавный скролл до элемента
        // предотвращаем поведение по умолчанию
        e.preventDefault();
        // Берем значение атрибута href
        let href = el.getAttribute('href');
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }

  // --- Выпадающее меню

  const navBarBtn =  document.querySelectorAll('.nav-bar__btn');
  const navBarDropdown = document.querySelectorAll('.nav-bar__items-wrap');

  // Переключатель видимости меню
  const toggleDropdownMenu = function(q) {
    q.classList.toggle('nav-bar__items-wrap--active');
  }
  const toggleArrowRoute = function(q) {
    q.classList.toggle('nav-bar__btn--active');
  }

  let isActive = null;

  navBarBtn.forEach((el, index) => {
    el.addEventListener('click', function(e) {

      if (isActive == null) {
        toggleDropdownMenu(navBarDropdown[index]);
        toggleArrowRoute(el);
        isActive = e.target;
      } else if (isActive == e.target) {
        toggleDropdownMenu(navBarDropdown[index]);
        toggleArrowRoute(el);
        isActive = null;
      } else {
        navBarDropdown.forEach((el, index) => {
          el.classList.remove('nav-bar__items-wrap--active');
        });
        navBarBtn.forEach((el, index) => {
          el.classList.remove('nav-bar__btn--active');
        });
        toggleDropdownMenu(navBarDropdown[index]);
        toggleArrowRoute(el);
        isActive = e.target;
      }

    });

  });

  // document.querySelectorAll('.nav-bar__btn').forEach(function(heroBtn) {
  //   heroBtn.addEventListener('click', function(event) {
  //     const path = event.currentTarget.dataset.path

  //     document.querySelectorAll('.nav-bar__dropdown-list').forEach(function(menuContent) {
  //       menuContent.classList.remove('nav-bar__dropdown-list--active')
  //     })
  //     document.querySelector(`[data-target="${path}"]`).classList.toggle('nav-bar__dropdown-list--active')
  //   })
  // })

  // --- Поиск

  const searchBtn = document.querySelector('.header__search');
  const searchBig = document.querySelector('.header__search-big-wrap');
  const searchCloseBtn = document.querySelector('.header__search-close');
  const searchInput = document.querySelector('#search');

  // Переключатель видимости поиска
  const toggleSearch = function(q) {
    q.classList.toggle('search__open');
  }

  // Что происходит после клика на лупу
  searchBtn.addEventListener('click', function(e) {
    // предотвращаем поведение по умолчанию
    e.stopPropagation();
    toggleSearch(searchBig);
    // Из-за анимации свойства visibility ставим задержку
    setTimeout(() => {searchInput.focus()},100);
  })

  // Что происходит после клика на крестик
  searchCloseBtn.addEventListener('click', function() {
    toggleSearch(searchBig);
  })

  // Что происходит после клика вне поиска
  document.addEventListener('click', function(e) {
    // Определяю место клика
    let target = e.target;
    // Клик был на .searchBig и его вложенные элементы или нет?
    let itsSearch = target == searchBig || searchBig.contains(target);
    // .searchBig открыт?
    let searchIsActive = searchBig.classList.contains('search__open');

    // Если клик был вне .searchBig и .searchBig открыт, то выполняю код
    if (!itsSearch && searchIsActive) {
      toggleSearch(searchBig);
    }
  });




  // --- Инициализация инпута choices.js в секции galery

  const el = document.querySelector('select');
  const choises = new Choices(el,{
    searchEnabled: false,
    itemSelectText: '',
  });

  // --- Первый свайпер в секции galery

  const swiper1 = new Swiper('#swiper-galery', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 38,
    // loop: true,
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // 'Grab' курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
    },
    breakpoints: {
      321: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1025: {
        spaceBetween: 36,
      },
      1441: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // --- Аккордион на jQuery в сеrции catalog

  $('#accordion').accordion({
    icons: false,
    heightStyle: 'content',
    collapsible: true
  });

  // --- Второй свайпер в секции events

  const swiper2 = new Swiper('#swiper-events', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 35,
    // effect: 'fade',
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // 'Grab' курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
    },
     breakpoints: {
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1001: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 28,
      },
      1441: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // --- Третий свайпер в секции projects

  const swiper3 = new Swiper('#swiper-partners', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    // spaceBetween: 20,
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // 'Grab' курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1441: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 0,
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // --- Yandex-карты

  // Дождёмся загрузки API и готовности DOM
  ymaps.ready(init);
  function init() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ('map')
    myMap = new ymaps.Map('map', {
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
      // её 'ножки' (точки привязки)
      iconImageOffset: [-10, -10]
    });

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myPlacemark);
  }








});
