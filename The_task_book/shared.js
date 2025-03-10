// Чтение значения из хранилища
let arrFromStorage = localStorage.getItem('todoList');
let arrParsed = [];

try {
  arrParsed = arrFromStorage ? JSON.parse(arrFromStorage) : [];
  arrParsed.forEach((item) => {
    if (!item.datesCompleted) {
      item.datesCompleted = [];
    }
    if ('completed' in item) {
      delete item.completed
    }
  })
} catch (error) {
  console.error('Ошибка парсинга значения из localStorage');
  arrParsed = [];
};

// ISO - YYYY-MM-DDTHH:mm:ss.sssZ
const today = new Date().toISOString().slice(0, 10);