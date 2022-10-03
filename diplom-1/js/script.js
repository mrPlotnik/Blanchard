document.addEventListener('DOMContentLoaded', function() {

  // --- --- GLOBAL --- --- //
  // --- Плавный скролл до элемента (на все ссылки)
  // scroll();
  // function scroll() {
  //   const links = document.querySelectorAll('a[href*="#"]')

  //   for (let link of links) {
  //     link.addEventListener('click', function (e) {
  //       e.preventDefault()
  //       const blockID = link.getAttribute('href');
  //       document.querySelector(`${blockID}`).scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start'
  //       })
  //     })
  //   }
  // };

  // --- Yandex-карты
  map();
  function map() {
    // Дождёмся загрузки API и готовности DOM
    ymaps.ready(init);
    function init() {
      // Создание экземпляра карты и его привязка к контейнеру с
      // заданным id ('map')
      myMap = new ymaps.Map('map',
        {
          // Координаты центра карты
          center: [55.760000, 37.614700],
          // Уровень масштабирования. От 0 (весь мир) до 19
          zoom: 14,
          controls: ['geolocationControl', 'zoomControl']
        },
        {
          zoomControlSize: "small",
          geolocationControlPosition:  { top: "270px", right: "20px" },
          zoomControlPosition: { top: "170px", right: "20px" }
        }
      );

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
      myMap.behaviors.disable(['scrollZoom']);
      myMap.behaviors.disable('drag')
    }
  }

  // --- --- HEADER --- --- //
  // --- Бургер и мобильное меню
  burger();
  function burger() {
    const body = document.querySelector('body');
    const burger = document.querySelector('.ht__burger');
    const closeBtn = document.querySelector('.ht-nav__close-btn');
    const menuMobile = document.querySelector('.ht__nav');
    const links = document.querySelectorAll('.ht-nav__item a');
    // Выбираем все элементы для индекса в мобильном меню
    const elTab = document.querySelectorAll('.ht-nav__close-btn, .ht-nav__list-item a, .ht-nav__login-link');

    // Что происходит после нажатия на бургер
    burger.addEventListener('click', function(q) {

      body.classList.toggle('stop-scroll');
      burger.setAttribute("aria-expanded", "true");
      menuMobile.classList.toggle('ht__nav--active');

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
      menuMobile.classList.toggle('ht__nav--active');
      // Фокус на бургер
      burger.focus();
    })

    // Что происходит после кликов на ссылки
    links.forEach((el, index) => {
      el.addEventListener('click', function(e) {
        body.classList.toggle('stop-scroll');
        menuMobile.classList.toggle('ht__nav--active');
      })
    })
  };

  // --- Поиск
  search ();
  function search() {
    const searchmtn = document.querySelector('.ht__search-btn');
    const searchmig = document.querySelector('.ht-search');
    const searchCloseBtn = document.querySelector('.ht-search__close-btn');
    const searchInput = document.querySelector('#search');

    // Что происходит после клика на лупу
    searchmtn.addEventListener('click', function(e) {
      // предотвращаем поведение по умолчанию
      e.stopPropagation();
      searchCloseBtn.setAttribute("aria-expanded", "false");
      searchmig.classList.toggle('ht-search--open');
      // Из-за анимации свойства visibility ставим задержку
      setTimeout(() => {searchInput.focus()},100);
    })

    // Что происходит после клика на крестик
    searchCloseBtn.addEventListener('click', function() {
      searchCloseBtn.setAttribute("aria-expanded", "true");
      searchmig.classList.toggle('ht-search--open');
    })

    // Что происходит после клика вне поиска
    document.addEventListener('click', function(e) {
      // Определяю место клика
      let target = e.target;
      // Клик был на .searchmig и его вложенные элементы или нет?
      let itsSearch = target == searchmig || searchmig.contains(target);
      // .searchmig открыт?
      let searchIsActive = searchmig.classList.contains('ht-search--open');

      // Если клик был вне .searchmig и .searchmig открыт, то выполняю код
      if (!itsSearch && searchIsActive) {
        searchCloseBtn.setAttribute("aria-expanded", "true");
        searchmig.classList.toggle('ht-search--open');
      }
    })
  };

  // --- Выпадающее меню
  dropdownMenu();
  function dropdownMenu() {
    const navBarBtn =  document.querySelectorAll('.hm-item__btn');
    const navBarDropdown = document.querySelectorAll('.hm-item__wrap');
    let isActive = null;

    navBarBtn.forEach((el, index) => {
      el.addEventListener('click', function(e) {
        if (isActive == null) {
          navBarDropdown[index].classList.add('hm-item__wrap--active');
          navBarDropdown[index].setAttribute("aria-hidden", "false");
          el.classList.add('hm-item__btn--active');
          el.setAttribute("aria-expanded", "true");
          isActive = e.target;
        } else if (isActive == e.target) {
          navBarDropdown[index].classList.remove('hm-item__wrap--active');
          navBarDropdown[index].setAttribute("aria-hidden", "true");
          el.classList.remove('hm-item__btn--active');
          el.setAttribute("aria-expanded", "false");
          isActive = null;
        } else {
          navBarDropdown.forEach((el) => {
            el.classList.remove('hm-item__wrap--active');
            el.setAttribute("aria-hidden", "true");
          });
          navBarBtn.forEach((el) => {
            el.classList.remove('hm-item__btn--active');
            el.setAttribute("aria-expanded", "false");
          });
          navBarDropdown[index].classList.add('hm-item__wrap--active');
          navBarDropdown[index].setAttribute("aria-hidden", "false");
          el.classList.add('hm-item__btn--active');
          el.setAttribute("aria-expanded", "true");
          isActive = e.target;
        }
      })
    })
  };

  // --- SimpleBar в выпадающем меню
  simplebar1();
  function simplebar1() {
    const bars = document.querySelectorAll('[data-simplebar]')
    bars.forEach(el => {
      new SimpleBar(el, {
        ariaLabel: 'Прокручиваемая область'
      })
    })
  };

  // --- Первый свайпер в секции hero
  swiper1();
  function swiper1() {
     const swiper1 = new Swiper('#swiper-hero', {
       effect: 'fade',
       autoplay: {
         disableOnInteraction: true
       },
       a11y: {
         preventClicks: false,
         preventClicksPropagation: false,
         simulateTouch: false
       }
     })
  };

  // --- --- MAIN --- --- //
  // --- choices.js в секции galery
  choises();
  function choises() {
     const el = document.querySelector('select');
     const choises = new Choices(el,{
       searchEnabled: false,
       itemelectText: ''
     })
  };

  // --- Второй свайпер в секции galery
  swiper2();
  function swiper2() {
    const swiper2 = new Swiper('#swiper-gallery', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 38,
      simulateTouch: true, // Принимает события мыши, как событие касания пальцами
      autoplay: {
        disableOnInteraction: true // Автоплей не останавливается после конца итереций
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1024: {
          spaceBetween: 34
        },
        1440: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  };

  // --- Аккордион на jQuery в сеrции catalog
  new Accordion('#accordion', {
    elementClass: 'ac__item',
    triggerClass: 'ac__trigger',
    panelClass: 'ac__panel',
    activeClass: 'accordion--active',
    openOnInit: [0],
    duration: 700
  });

  // --- Секция catalog. Вкладки

  bookmark();
  function bookmark() {
    let links = document.querySelectorAll('.ac__link');
    let bookmarks = document.querySelectorAll('.bookmark');

    links.forEach(function (element) {
      element.addEventListener('click', function (e) {
        const way = e.target.getAttribute('href');

        links.forEach(function (btn) {
          btn.classList.remove('ac__link--active');
          btn.setAttribute("aria-expanded", "false");
        });
        e.currentTarget.classList.add('ac__link--active');
        e.currentTarget.setAttribute("aria-expanded", "true");

        bookmarks.forEach(function (el) {
          el.classList.remove('bookmark--active')
        });
        let href = document.querySelector(`${way}`);
        href.classList.add('bookmark--active');

        e.preventDefault();
        if (window.innerWidth < 1024) {
          href.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }

      })
    })
  };

  // --- Третий свайпер в секции events
  swiper3();
  function swiper3() {
    const swiper3 = new Swiper('#swiper-events', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      simulateTouch: true,
      grabCursor: true,
      autoplay: {
        disableOnInteraction: true
      },
       breakpoints: {
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 27
        },
        1440: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  };

  // --- projects tooltip
  tooltip();
  function tooltip() {
    tippy('.projects__tooltip', {
      theme: 'tooltip',
      maxWidth: 264,
    });
  };

  // --- Четвертый свайпер в секции projects
  swiper4();
  function swiper4() {
    const swiper4 = new Swiper('#swiper-partners', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      simulateTouch: true,
      grabCursor: true,
      autoplay: {
        disableOnInteraction: true
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1441: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 0
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
  };

  // --- --- FOOTER --- --- //
  // --- input mask tel
  inputMask();
  function inputMask() {
    const selector = document.querySelector("input[type='tel']");
    const im = new Inputmask("+7(999) 999-99-99");
    im.mask(selector);
  };

  // --- Validate form
  validate();
  function validate() {
    const selector = document.querySelector("input[type='tel']");
    new window.JustValidate('#form', {
      rules: {
        name: {
          required: true,
          minLength: 3,
          maxLength: 30
        },
        tel: {
          required: true,
          function: () => {
            const phone = selector.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          }
        }
      },
      messages: {
        name: {
          required: 'Вы не ввели имя',
          minLength: 'Поле должно содержать более 3 символов',
          maxLength: 'Поле должно содержать не более 30 символов'
        },
        tel: {
          required: 'Вы не ввели телефон',
          function: 'Поле должно содержать 10 символов'
        },
        email: {
          required: 'Вы не ввели e-mail',
          email: 'Введен некорректный e-mail'
        }
      },
      colorWrong: '#D11616',
      submitHandler: function (thisForm, values, ajax) {
        ajax({
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'POST',
          data: values,
          async: true,
          callback: function (response) {
            alert('Response from server: ' + response)
          },
          error: function (response) {
            alert('Response from server: ' + response)
          }
        })
      }
    })
  };

  // --- --- MODAL --- --- //
  // --- gallery modal
  modal();
  function modal() {
    const btn = document.querySelectorAll('#swiper-gallery .swiper-slide');
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
          activeModal.querySelector('.modal__close-btn').focus();
        }, 100)
      })
    })

    exitBtn.forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.body.classList.remove('stop-scroll');
        modal.classList.remove('modal--active');
        notes.forEach((el) => {
          el.classList.remove('modal__item--active');
        })
      })
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        notes.forEach(function (el) {
          el.classList.remove('modal__item--active');
        })
        document.body.classList.remove('stop-scroll');
        modal.classList.remove('modal--active');
      }
    })
  };

  // --- SimpleBar в модальных окнах
  simplebar2();
  function simplebar2() {
    Array.prototype.forEach.call(
      document.querySelectorAll('.note__descr-wrap'),
      el => new SimpleBar(el, {
        autoHide: true,
        ariaLabel: 'Прокручиваемая область',
      })
    )
  };
});
