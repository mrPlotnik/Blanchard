const swiper = new Swiper('.swiper', {
  // loop: true,
  effect: "fade",
  allowTouchMove: false,
  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
  },
  // pagination: false,
});

document.addEventListener('DOMContentLoaded', function() {

  // Поиск
  function search() {
    const searchSmall = document.querySelector('.search-small');
    const searchBig = document.querySelector('.header-nav__search');
    const btnClose = document.querySelector('.btn--close');
    const btnSearch = document.querySelector('.btn--search');

    const toggleSearch = function(q) {
      q.classList.toggle('open');
    }

    searchSmall.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSearch(searchBig);
    })

    btnClose.addEventListener('click', function(e) {
      toggleSearch(searchBig);
    })

    btnSearch.addEventListener('click', function(e) {
      toggleSearch(searchBig);
    })

    // Отслеживаю клик вне контейнера .searchBig
    document.addEventListener('click', function(e) {
      // Определяю место клика
      const target = e.target;
      // Клик был на .searchBig и его вложенные элементы или нет?
      const itsSearch = target == searchBig || searchBig.contains(target);
      // .searchBig открыт?
      const searchIsActive = searchBig.classList.contains('open');

      // Если клик был вне .searchBig и .searchBig открыт, то выполняю код
      if (!itsSearch && searchIsActive) {
        toggleSearch(searchBig);
      }
    });
  }

  // Бургер
  function burger() {
    const burger = document.querySelector('.site-header__burger-link');
    const menuMobile = document.querySelector('.menu-mobile');
    const closeMenu = document.querySelector('.close');

    const toggleMenu = function(q) {
      q.classList.toggle('open');
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

  // Табы секции .work
  function tab() {

    const tabsNavBtn = document.querySelectorAll('.tab-nav__btn');
    const tabsContent = document.querySelectorAll('.tab-content');

    tabsNavBtn.forEach(function(el) {

      el.addEventListener('click', function(e) {

        const path = e.currentTarget.dataset.path;

        tabsContent.forEach(function(el) {
          el.classList.remove('tab-content-active');
        })

        document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');

      })

    })

  }

  search();
  burger();
  tab();

  $("#accordion").accordion({
    // header: ".section-faq__item",
    icons: false,
    heightStyle: "content",
    collapsible: true
  });

})

