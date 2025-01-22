// Чтение значения из хранилища
let arrFromStorage = localStorage.getItem('todoList');
let arrParsed = [];

try {
  arrParsed = arrFromStorage ? JSON.parse(arrFromStorage) : [];
} catch (error) {
  console.error('Ошибка парсинга значения из localStorage');
  arrParsed = [];
}

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


  let monthIndexToNameMap = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }
  let nameMonth2 = monthIndexToNameMap[month];


  // Формируем строку в формате dd name month и возвращаем её
  return `${day} ${nameMonth2}`;
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

// let arr = [{
//   title:'Создать Git',
//   id:1,
//   completed: false
// },
// {
//   title:'Создать LocalStorage',
//   id:2,
//   completed: false
// },
// {
//   title:'Большие отступы убрать',
//   id:3,
//   completed: false
// },
// {
//   title:'Условие на "готово" и зачеркивание',
//   id:4,
//   completed: false
// },
// {
//   title:'Позаниматься JavaScript',
//   id:5,
//   completed: false
// }
// ]

function renderList (arrParsed) {
  const ulTex = document.querySelector("#tex");
  ulTex.innerHTML = '';
  arrParsed.forEach((item) => {
    ulTex.insertAdjacentHTML(
      "beforeend",
      `
        <li>
          <label onclick="completed(event, ${item.id})">
            <input type="checkbox" ${item.completed ? 'checked' : ''} />
            <span>${item.title}</span>
          </label>
          <button onclick="onDelete(event, ${item.id})">X</button>
        </li>
      `
    );
  });
}

// -----------------------

// Слушатели событий

// 1. Слушатель в виде атрибута на html элементе
// <button onclick="onDelete(event)">X</button>

// event - объект события
// event.target - целевой элемент на котором произошло событие
// event.preventDefault() - отменяет стандартное браузерное поведение для какого-то события

// html
{/* <a href="www.yandex.ru" onclick="handleClick(event)"></a> */}

// js
// function handleClick(event) {
//   event.preventDefault();
// }

// 2. Слушатель события с помощью функции addEventListener

// html
{/* <input id="input" type="text" /> */}

// js
// const input = document.querySelector('#input');
// input.addEventListener('keydown', function (event) {
//   console.log(this.value); // this.value === input.value (значение, введенное в input)

//   if (event.key === 'Enter') {
//     console.log('Была нажата клавиша Enter!')
//   }
// });


// -----------------------

renderList(arrParsed);

function completed(event, id) {
  console.log(event);

  let index = arrParsed.findIndex(item => item.id === id);
  arrParsed[index].completed = !arrParsed[index].completed;
  localStorage.setItem('todoList', JSON.stringify(arrParsed));// Запись значения
}



/**
  Функция для обработки события удаления элемента списка.
  param {Event} event - Событие, которое произошло при клике на кнопку "X".
 */
function onDelete(event, id) {
  arrParsed = arrParsed.filter(item => item.id !== id);
    localStorage.setItem('todoList', JSON.stringify(arrParsed));// Запись значения
    renderList(arrParsed);
}

//trim() - убирает пробелы с краев.
// Функция добавляет новую задачу в список
function addNewTask() {
  const input = document.getElementById("newTaskInput");
  const taskTitle = input.value.trim();
  const nextId = arrParsed.length ? arrParsed[arrParsed.length - 1].id + 1 : 1;
  if (taskTitle) {
    const newItem = {
      title: taskTitle,
      id: nextId,
      completed: false
    };

    arrParsed.push(newItem); // Добавляем новую задачу в массив
    localStorage.setItem('todoList', JSON.stringify(arrParsed));// Запись значения
    renderList(arrParsed); // Отображаем новую задачу в списке
    input.value = ''; // Очищаем поле ввода
  }
}

// 1. Добавить слушатель события на нажатие кнопки на клавиатуре
// 2. Определить, что была нажата именно клавиша Enter
// 3. Если нажали именно Enter, то вызываем addNewTask
function addNewEnterTask(event) {
  console.log(event);
  if (event.key === 'Enter') {
    addNewTask();
  }
}

checkbox.onchange = function () {
  task.completed = this.checked;
  localStorage.setItem('todoList', JSON.stringify(arrParsed));// Запись значения
};

// // Получаем все элементы списка
// const texD = document.querySelectorAll("label");
// // Добавляем обработчики событий ко всем элементам списка
// texD.forEach((item) => {
//   item.addEventListener("click", () => {
//     const input = item.firstElementChild;
//     const span = item.lastElementChild;

//     // Если текст уже зачеркнут, убираем зачеркивание
//     if (input.checked) {
//       span.style.textDecoration = "line-through";
//     } else {
//       // Иначе добавляем зачеркивание
//       span.style.textDecoration = "none";
//     }
//   });
// });


