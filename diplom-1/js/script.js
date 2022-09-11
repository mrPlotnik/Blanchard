document.addEventListener('DOMContentLoaded', function() {

  // --- Бургер

  burger();
  function burger() {
    const body = document.querySelector('body');
    const burger = document.querySelector('.nav__burger');
    const closeBtn = document.querySelector('.nav-mobile__close-btn');
    const menuMobile = document.querySelector('.nav__mobile');
    const links = document.querySelectorAll('.nav-mobile__list-item a');
    // Выбираем все элементы для индекса в мобильном меню
    const elTab = document.querySelectorAll('.nav-mobile__close-btn, .nav-mobile__list-item a, .nav-mobile__login-link');

    // Что происходит после нажатия на бургер
    burger.addEventListener('click', function(q) {

      body.classList.toggle('stop-scroll');
      burger.setAttribute("aria-expanded", "true");
      menuMobile.classList.toggle('nav-mobile--active');

      // При отрытии меню сразу фокус на крестик
      // Из-за анимации свойства visibility ставим
      // задержку
      setTimeout(() => {closeBtn.focus()},100);

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
              // и вызываем метод фокуса на следующий элемент
              elTab[index + 1].focus();
            } else {
              // Когда мы добираемся до последнего элемента,
              // устанавливаем фокус на первый элемент
              elTab[0].focus();
            }
          }
        })
      })
    })

    // Что происходит после клика на крестик
    closeBtn.addEventListener('click', function() {
      body.classList.toggle('stop-scroll');
      burger.setAttribute("aria-expanded", "false");
      menuMobile.classList.toggle('nav-mobile--active');
      // Фокус на бургер
      burger.focus();
    })


    // Что происходит после кликов на ссылки
    links.forEach((el, index) => {
      el.addEventListener('click', function(e) {
        body.classList.toggle('stop-scroll');
        burger.classList.toggle('nav__burger--close');
        menuMobile.classList.toggle('nav-mobile--active');

        // Плавный скролл до элемента
        // Берем значение атрибута href
        e.preventDefault();
        let href = el.getAttribute('href');
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    })
  };

  // --- Выпадающее меню

  dropdownMenu();
  function dropdownMenu() {
    const navBarBtn =  document.querySelectorAll('.nav-bar__btn');
    const navBarDropdown = document.querySelectorAll('.nav-bar__items-wrap');
    let isActive = null;

    navBarBtn.forEach((el, index) => {
      el.addEventListener('click', function(e) {
        if (isActive == null) {
          navBarDropdown[index].classList.add('nav-bar__items-wrap--active');
          navBarDropdown[index].setAttribute("aria-hidden", "false");
          el.classList.add('nav-bar__btn--active');
          el.setAttribute("aria-expanded", "true");
          isActive = e.target;
        } else if (isActive == e.target) {
          navBarDropdown[index].classList.remove('nav-bar__items-wrap--active');
          navBarDropdown[index].setAttribute("aria-hidden", "true");
          el.classList.remove('nav-bar__btn--active');
          el.setAttribute("aria-expanded", "false");
          isActive = null;
        } else {
          navBarDropdown.forEach((el) => {
            el.classList.remove('nav-bar__items-wrap--active');
            el.setAttribute("aria-hidden", "true");
          });
          navBarBtn.forEach((el) => {
            el.classList.remove('nav-bar__btn--active');
            el.setAttribute("aria-expanded", "false");
          });
          navBarDropdown[index].classList.add('nav-bar__items-wrap--active');
          navBarDropdown[index].setAttribute("aria-hidden", "false");
          el.classList.add('nav-bar__btn--active');
          el.setAttribute("aria-expanded", "true");
          isActive = e.target;
        }
      })
    })
  };

  // --- Поиск

  search ();
  function search() {
    const searchBtn = document.querySelector('.header__search-btn');
    const searchBig = document.querySelector('.search-big');
    const searchCloseBtn = document.querySelector('.search-big__close-btn');
    const searchInput = document.querySelector('#search');

    // Что происходит после клика на лупу
    searchBtn.addEventListener('click', function(e) {
      // предотвращаем поведение по умолчанию
      e.stopPropagation();
      searchBig.classList.toggle('search-big--open');
      // Из-за анимации свойства visibility ставим задержку
      setTimeout(() => {searchInput.focus()},100);
    })

    // Что происходит после клика на крестик
    searchCloseBtn.addEventListener('click', function() {
      searchBig.classList.toggle('search-big--open');
    })

    // Что происходит после клика вне поиска
    document.addEventListener('click', function(e) {
      // Определяю место клика
      let target = e.target;
      // Клик был на .searchBig и его вложенные элементы или нет?
      let itsSearch = target == searchBig || searchBig.contains(target);
      // .searchBig открыт?
      let searchIsActive = searchBig.classList.contains('search-big--open');

      // Если клик был вне .searchBig и .searchBig открыт, то выполняю код
      if (!itsSearch && searchIsActive) {
        searchBig.classList.toggle('search-big--open');
      }
    })
  };

  // --- Плавный скролл до элемента (горизонтальное меню 1920px)

  scroll();
  function scroll() {
    const links = document.querySelectorAll('.nav-major__list-item a')

    links.forEach((el, index) => {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        let href = el.getAttribute('href');
          document.querySelector(href).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
      })
    })
  }

  // --- gallery modal

  modal();
  function modal() {
    const btn = document.querySelectorAll('#swiper-galery .swiper-slide');
    const modal = document.querySelector('.modal');
    const notes = document.querySelectorAll('.modal__item');
    const exitBtn = document.querySelectorAll('.modal__close-btn');

    btn.forEach((element, index) => {
      element.addEventListener('click', () => {
        document.body.classList.toggle('stop-scroll');
        notes.forEach((el) => {
          el.classList.remove('modal__item--active');
        })
        document.querySelector(`#modal-item-${ index }`).classList.add('modal__item--active');
        modal.classList.add('modal--active');
        setTimeout(() => {
          let activeModal = document.querySelector('.modal__item--active');
          activeModal.querySelector('.note__btn').focus();
        }, 100);
      });
    });
    exitBtn.forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.body.classList.remove('stop-scroll');
        modal.classList.remove('modal--active');
        notes.classList.remove('modal__item--active');
      })
    })
    // modal.addEventListener('click', function (el) {
    //   if (el.target === modal) {
    //     notes.forEach(function (el) {
    //       el.classList.remove('modal__item--active');
    //     })
    //     document.body.classList.remove('stop-scroll');
    //     modal.classList.remove('modal--active');
    //   }
    // })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        notes.forEach(function (el) {
          el.classList.remove('modal__item--active');
        })
        document.body.classList.remove('stop-scroll');
        modal.classList.remove('modal--active');
      }
    })
  }

  // --- Инициализация инпута choices.js в секции galery

  const el = document.querySelector('select');
  const choises = new Choices(el,{
    searchEnabled: false,
    itemSelectText: '',
  });

  // --- SimpleBar в выпадающем меню

  Array.prototype.forEach.call(
    document.querySelectorAll('.nav-bar__items-wrap'),
    el => new SimpleBar(el, {
      autoHide: true,
      ariaLabel: 'Прокручиваемая область',
    })
  );

  // --- Аккордион на jQuery в сеrции catalog

  $('#accordion').accordion({
    icons: false,
    heightStyle: 'content',
    collapsible: true
  });

  // --- Первый свайпер в секции hero

  const swiper1 = new Swiper('#swiper-hero', {
    effect: 'fade',
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
    },
    a11y: {
      preventClicks: false,
      preventClicksPropagation: false,
      simulateTouch: false,
    },
  });

  // --- Второй свайпер в секции galery

  const swiper2 = new Swiper('#swiper-galery', {
    // preventClicksPropagation: false,
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

  // --- Третий свайпер в секции events

  const swiper3 = new Swiper('#swiper-events', {
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

   // --- Четвертый свайпер в секции projects

  const swiper4 = new Swiper('#swiper-partners', {
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
