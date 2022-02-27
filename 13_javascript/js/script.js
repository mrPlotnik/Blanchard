const swiper = new Swiper('.swiper', {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

document.addEventListener('DOMContentLoaded', function() {

  // поиск
  var searchSmall = document.querySelector('.search-small')
  var searchBig = document.querySelector('.header-nav__search')
  var btnClose = document.querySelector('.btn--close')
  var btnSearch = document.querySelector('.btn--search')

  const toggleMenu = function(q) {
    q.classList.toggle('open');
  }

  searchSmall.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu(searchBig);
  })

  btnClose.addEventListener('click', function(e) {
    toggleMenu(searchBig);
  })

  btnSearch.addEventListener('click', function(e) {
    toggleMenu(searchBig);
  })

  // Отслеживаю клик вне контейнера .searchBig
  document.addEventListener('click', function(e) {
    // Определяю место клика
    const target = e.target;
    // Клик был на .searchBig и его вложенные элементы или нет?
    const its_menu = target == searchBig || searchBig.contains(target);
    // .searchBig открыт?
    const menu_is_active = searchBig.classList.contains('open');

    // Если клик был вне .searchBig и .searchBig открыт, то выполняю код
    if (!its_menu && menu_is_active) {
      toggleMenu(searchBig);
    }
  });


})
