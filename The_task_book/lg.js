// Функция форматирует текущую дату в формате ГГГГ-ММ-ДД
function formatDate() {
  // Создаем объект даты, который содержит текущие дату и время
  let date = new Date();
  // Получаем день месяца (число), преобразуем его в строку и добавляем ведущий ноль, если число меньше 10
  let day = String(date.getDate()).padStart(2, '0');
  // Получаем месяц (начиная с нуля, поэтому прибавляем 1), преобразуем его в строку и добавляем ведущий ноль, если число меньше 10
  let month = String(date.getMonth() + 1).padStart(2, '0');
  function nameMonth() {
    if (month === '01') {
      return 'January'
    }
    else if (month === '02') {
      return 'February'
    }
    else if (month === '03') {
      return 'March'
    }
    else if (month === '04') {
      return 'April'
    }
    else if (month === '05') {
      return 'May'
    }
    else if (month === '06') {
      return 'June'
    }
    else if (month === '07') {
      return 'July'
    }
    else if (month === '08') {
      return 'August'
    }
    else if (month === '09') {
      return 'September'
    }
    else if (month === '10') {
      return 'October'
    }
    else if (month === '11') {
      return 'November'
    }
    else {
      return 'December'
    }
  }
  let nameMonth1 = nameMonth()
  // Формируем строку в формате dd name month и возвращаем её
  return `${day} ${nameMonth1}`;
}

let dateField = document.getElementById("dateField");
dateField.textContent += " " + formatDate();  // Добавляем дату к существующему тексту


/*
// Функция форматирует текущую дату в формате ДД Месяц
function formatDate() {
  const options = { day: 'numeric', month: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date());
}
// Выводим дату после текста "Plan for"
const dateField = document.getElementById("dateField");
dateField.textContent += " " + formatDate();  // Добавляем дату к существующему тексту
*/

let arr = [{
  title:'Создать Git',
  id:1,
  completed: false
},
{
  title:'Создать LocalStorage',
  id:2,
  completed: false
},
{
  title:'Большие отступы убрать',
  id:3,
  completed: false
},
{
  title:'Условие на "готово" и зачеркивание',
  id:4,
  completed: false
},
{
  title:'Позаниматься JavaScript',
  id:5,
  completed: false
}
]

function renderList (arr) {
  const ulTex = document.querySelector("#tex");
  ulTex.innerHTML = '';
  arr.forEach((item) => {
    ulTex.insertAdjacentHTML(
      "beforeend",
      `
        <li>
          <label>
            <input type="checkbox" />
            <span>${item.title}</span>
          </label>
          <button onclick="onDelete(event, ${item.id})">X</button>
        </li>
      `
    );
  });
}

renderList(arr);

/**
  Функция для обработки события удаления элемента списка.
  param {Event} event - Событие, которое произошло при клике на кнопку "X".
 */
function onDelete(event, id) {
  // Находим ближайший родительский элемент <li> относительно кнопки, которую нажали
  // const itemToRemove = event.target.closest('li');
  // Проверяем, существует ли такой элемент
  // if (itemToRemove) {
    // Удаляем элемент из DOM
    // itemToRemove.remove();
    // Извлекаем ID удаленного элемента из атрибута data-id
    // const idToRemove = parseInt(itemToRemove.dataset.id);
    // Фильтруем массив arr, оставляя все элементы, кроме того, чей id совпадает с idToRemove
    arr = arr.filter(item => item.id !== id);
    renderList(arr);
  // }
}
//trim() - убирает пробелы с краев.
// Функция добавляет новую задачу в список
function addNewTask() {
  const input = document.getElementById("newTaskInput");
  const taskTitle = input.value.trim();
  const nextId = arr[arr.length -1].id +1;
  if (taskTitle) {
    const newItem = {
      title: taskTitle,
      id: nextId,
      completed: false
    };

    arr.push(newItem); // Добавляем новую задачу в массив
    renderList(arr); // Отображаем новую задачу в списке
    input.value = ''; // Очищаем поле ввода
  }
}