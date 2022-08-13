document.addEventListener('DOMContentLoaded', function() {

  // Бургер
  function burger() {
    const body = document.querySelector('body');
    const burger = document.querySelector('.nav__burger');
    const menuMobile = document.querySelector('.nav__mobile');
    const closeMenu = document.querySelector('.nav-mobile__close-btn');
    const links = document.querySelectorAll('.nav-mobile__list-item a');

    // Выбираем все элементы для индекса в 'модальном' окне
    let elTab = document.querySelectorAll('.nav-mobile__close-btn, .nav-mobile__login-link, .nav-mobile__list-item a');

    const toggleMenu = function(q) {
      q.classList.toggle('nav__open');
    }
    const toggleBody = function(q) {
      q.classList.toggle('body-hidden');
    }

    burger.addEventListener('click', function() {
      // Прекращаем дальнейшую передачу текущего события
      // (предотвращает всплытие по дереву DOM)
      // e.stopPropagation();
      toggleMenu(menuMobile);
      toggleBody(body);
      // Индексация в мобильном меню с клавиатуры
      // При отрытии меню сразу фокус на крестик
      // Из-за анимации свойства visibility ставим задержку
      setTimeout(() => {closeMenu.focus()},100);
      // closeMenu.focus();
      elTab.forEach((tab, index) => {
        // Добавляем прослушку события на 'активный' текущий элемент
        tab.addEventListener('keydown', (e) => {
          if (e.keyCode == 9) {
            // Предотвращаем поведение по умолчанию
            e.preventDefault();
            // Если элемент не последний задаем следующему элементу tabindex в 0
            // и вызываем метод фокуса на него
            if (index != elTab.length - 1) {
              elTab[index + 1].focus();
            } else {
              // Когда мы добираемся до последнего элемента,
              // устанавливаем фокус на первый элемент
              elTab[0].focus();
            }
          }
        });
      });
    })

    // Что происходит при клике на крестик
    closeMenu.addEventListener('click', function() {
      // Закрыть меню
      toggleMenu(menuMobile);
      toggleBody(body);
      // Фокус на бургер
      burger.focus();
    })

    // Что происходит при кликах на ссылки
    links.forEach((el, index) => {
      // Вешаем на все ссылки меню прослушки
      el.addEventListener('click', function() {
        // Закрыть меню
        toggleMenu(menuMobile);
        toggleBody(body);
      })
    });

  };

  // Поиск
  function search() {
    const searchBtn = document.querySelector('.header__search');
    const searchBig = document.querySelector('.header__search-big');
    const searchCloseBtn = document.querySelector('.header__search-close');
    const searchInput = document.querySelector('#search');
    // const btnSearch = document.querySelector('.btn--search');

    const toggleSearch = function(q) {
      q.classList.toggle('search__open');
    }

    searchBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSearch(searchBig);
      // Из-за анимации свойства visibility ставим задержку
      setTimeout(() => {searchInput.focus()},100);
    })

    searchCloseBtn.addEventListener('click', function() {
      toggleSearch(searchBig);
    })

    // btnSearch.addEventListener('click', function() {
    //   toggleSearch(searchBig);
    // })

    // Отслеживаю клик вне контейнера .searchBig
    document.addEventListener('click', function(e) {
      // Определяю место клика
      const target = e.target;
      // Клик был на .searchBig и его вложенные элементы или нет?
      const itsSearch = target == searchBig || searchBig.contains(target);
      // .searchBig открыт?
      const searchIsActive = searchBig.classList.contains('search__open');

      // Если клик был вне .searchBig и .searchBig открыт, то выполняю код
      if (!itsSearch && searchIsActive) {
        toggleSearch(searchBig);
      }
    });
  }

  burger();
  search();

  // ---------- Инициализация инпута choices.js в секции galery

  const el = document.querySelector('select');
  const choises = new Choices(el,{
    searchEnabled: false,
    itemSelectText: '',
  });

  // ---------- Первый свайпер в секции galery

  const swiper1 = new Swiper('#swiper-galery', {
    effect: 'fade',
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // 'Grab' курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
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

  // ---------- Аккордион на jQuery в сеrции catalog

  $('#accordion').accordion({
    icons: false,
    heightStyle: 'content',
    collapsible: true
  });

  // ---------- Второй свайпер в секции events

  const swiper2 = new Swiper('#swiper-events', {
    effect: 'fade',
    // Принимает события мыши, как событие касания пальцами
    simulateTouch: true,
    // 'Grab' курсор для повышения юзабилити на десктопах
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
    // 'Grab' курсор для повышения юзабилити на десктопах
    grabCursor: true,
    // Автоплей
    autoplay: {
      // Автоплей не останавливается после конца итереций
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });



});

// ---------- Yandex-карты

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
