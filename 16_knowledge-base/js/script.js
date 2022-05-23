// ---------- Кастомизация инпута

const el = document.querySelector('select');
const choises = new Choices(el,{
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
 
});

// ---------- Yandex-карты

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.     
        center: [48.872185, 2.354224],
        // Уровень масштабирования. От 0 (весь мир) до 19.
        zoom: 15
    });
   
    var myPlacemark = new ymaps.Placemark([48.872185, 2.354224], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/map-point.svg',
      iconImageSize: [28, 40]
    });  

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myPlacemark);
}
