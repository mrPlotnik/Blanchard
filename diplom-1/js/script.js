document.addEventListener('DOMContentLoaded', function() {

  // Бургер
  function burger() {
    const burger = document.querySelector('.nav__burger');
    const menuMobile = document.querySelector('.nav__mobile');
    const closeMenu = document.querySelector('.nav__close');
    const links = document.querySelectorAll('.nav__mobile-list-item a');

    // Выбираем все элементы для индекса в 'модальном' окне
    let elTab = document.querySelectorAll('.nav__close, .nav__mobile-list-item a');

    const toggleMenu = function(q) {
      q.classList.toggle('nav__open');
    }

    burger.addEventListener('click', function() {
      // Прекращаем дальнейшую передачу текущего события
      // (предотвращает всплытие по дереву DOM)
      // e.stopPropagation();
      toggleMenu(menuMobile);

      // Индексация в мобильном меню с клавиатуры
      // При отрытии меню сразу фокус на крестик
      // setTimeout(() => {closeMenu.focus()},100);
      closeMenu.focus();
      elTab.forEach((tab, index) => {
        // Устанавливаем tabindex первой кнопки в 0
        // а tabindex всех остальных кнопок в -1
        if (index != 0) {
          tab.setAttribute('tabindex', -1);
        } else {
          tab.setAttribute('tabindex', 0);
        }
        // Добавляем прослушку события на 'активный' текущий элемент
        tab.addEventListener('keydown', (e) => {

          if (e.keyCode == 9) {
            // Предотвращаем поведение по умолчанию
            e.preventDefault();
            // Устанавливаем текущему элементу tabindex в -1
            tab.setAttribute('tabindex', -1);
            // Если элемент не последний задаем следующему элементу tabindex в 0
            // и вызываем метод фокуса на него
            if (index != elTab.length - 1) {
              let nextEl = elTab[index + 1];
              nextEl.setAttribute('tabindex', 0);
              nextEl.focus();
            } else {
              // Когда мы добираемся до последнего элемента, устанавливаем для
              // первого элемента tabindex 0 и вызовем на нем метод фокуса
              let firstEl = elTab[elTab.length-elTab.length];
              firstEl.setAttribute('tabindex', 0);
              firstEl.focus();
            }
          }
        });
      });
    })

    // Что происходит при клике на крестик
    closeMenu.addEventListener('click', function() {
      // Закрыть меню
      toggleMenu(menuMobile);
      // Удалить атрибут tabindex у текушего элемента
      // (кнопка закрытия)
      this.setAttribute('tabindex', -1);
      // Фокус на бургер
      burger.focus();
    })

    // Что происходит при кликах на ссылки
    links.forEach((el, index) => {
      // Вешаем на все ссылки меню прослушки
      el.addEventListener('click', function() {
        // Закрыть меню
        toggleMenu(menuMobile);
        // Удалить атрибут tabindex у текушего элемента
        // (ссылка на которую кликнули)
        el.setAttribute('tabindex', -1);
        // и с крестика тоже
        closeMenu.setAttribute('tabindex', -1);
      })
    });

  };

  // ---------- Кастомизация инпута choices.js в секции galery

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
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
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
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
  });

  burger();

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
