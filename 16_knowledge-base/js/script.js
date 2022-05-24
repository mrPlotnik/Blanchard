// ---------- Кастомизация инпута

const el = document.querySelector('select');
const choises = new Choices(el,{
  searchEnabled: false,
  itemSelectText: ''
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

// ---------- Кастомный скролл

new SimpleBar(document.getElementById('scroll'), {});

// ---------- маскирование номера телефона

var selector = document.querySelector("input[type='tel']");

var im = new Inputmask("+7 (999)-999-99-99");
im.mask(selector);


// ---------- Валидация формы

const validation = new JustValidate('#form');

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле!',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно быть больше 3 символов!',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Имя должно быть короче 30 символов!',
    },    
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле!',
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue();      
        return Number(phone) && phone.length === 10
      },      
      errorMessage: 'Телефон должен быть не меньше 10 символов!',
    },       
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле!',
    },
    {
      rule: 'email',
      errorMessage: 'Неверный email!',
    },
  ]);

// ---------- Тултипы
  
const template = document.getElementById('example');

tippy('#myButton', {
  content: '<span class="tooltip">Глава 2, страница 176 <span>', 
  allowHTML: true, 
}); 