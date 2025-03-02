//Рендер таблицы
function renderTableHeader() {
    const tableHeader = document.querySelector("thead > tr");
    tableHeader.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
          // Получаем день месяца (число), преобразуем его в строку и добавляем ведущий ноль, если число меньше 10
        let day = String(date.getDate()).padStart(2, '0');
        // Получаем месяц (начиная с нуля, поэтому прибавляем 1), преобразуем его в строку и добавляем ведущий ноль, если число меньше 10
        let month = String(date.getMonth() + 1).padStart(2, '0');
        tableHeader.insertAdjacentHTML(
            "afterbegin",
            `
                <th>
                    ${day}.${month}
                </th>
            `
        )
    };

    tableHeader.insertAdjacentHTML(
        "afterbegin",
        `<th></th>`
    )
};

renderTableHeader();

function renderTableBody() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = '';

    arrParsed.forEach(item => {
        tableBody.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${item.title}</td>
                <td>${isCompleted(item.datesCompleted, 6)}</td>
                <td>${isCompleted(item.datesCompleted, 5)}</td>
                <td>${isCompleted(item.datesCompleted, 4)}</td>
                <td>${isCompleted(item.datesCompleted, 3)}</td>
                <td>${isCompleted(item.datesCompleted, 2)}</td>
                <td>${isCompleted(item.datesCompleted, 1)}</td>
                <td>${isCompleted(item.datesCompleted, 0)}</td>
            </tr>`
        )
    })
};

renderTableBody();


function renderCurrentStrike() {
    let countCurrentDate = 0;

    for (let i = 0; i < 180; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i); // установка даты (сегодняшняя минус i)
        const searchDate = date.toISOString().slice(0, 10); // получили '2025-02-12'
        const condition = arrParsed.every((item) => {
            return item.datesCompleted.includes(searchDate);
        })

        if (condition) {
            countCurrentDate += 1;
        } else {
            break;
        }
    };

    const currentStrike = document.querySelector(".current-strike");
    currentStrike.textContent = `${countCurrentDate} - текущий страйк`;
}

renderCurrentStrike();

function renderRecordStrike() {
    let countCurrentDate = 0;
    let plusOne = 0
    for (let i = 0; i < 180; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i); // установка даты (сегодняшняя минус i)
        const searchDate = date.toISOString().slice(0, 10); // получили '2025-02-12'
        const condition = arrParsed.every((item) => {
            return item.datesCompleted.includes(searchDate);
        })

        if (condition) {
            plusOne += 1;
        } else {
            if (plusOne > countCurrentDate) {
                countCurrentDate = plusOne
            }
            plusOne = 0;
        }
    };

    const recordStrike = document.querySelector(".record-strike");
    recordStrike.textContent = `${countCurrentDate} - рекордный страйк`;
};

renderRecordStrike();


function countStatistics(item) {
    let countCurrentDate = 0;
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i); // установка даты (сегодняшняя минус i)
        const searchDate = date.toISOString().slice(0, 10); // получили '2025-02-12'
        if (item.datesCompleted.includes(searchDate)) {
            countCurrentDate += 1
        }
    }
    return countCurrentDate
};

function renderWeekStatistics() {
    const statistics = document.querySelector(".week-statistics"); //считывает элементы
    arrParsed.forEach(item => {
        const count = countStatistics(item);
        statistics.insertAdjacentHTML(
            "beforeend",
            `<div>
                <div>${Math.round(count/7*100)}%</div>
                <div>${item.title}</div>
                <div>${count} из 7 дней</div>
            </div>`
        )
    })

};

renderWeekStatistics();



/**
 * @param datesArray - ['2025-02-12', '2025-02-01']
 * @param offset - 0
 * @returns V / X
 */
function isCompleted(datesArray, offset) {
    const date = new Date();
    date.setDate(date.getDate() - offset); // установка даты (сегодняшняя минус offset)
    const searchDate = date.toISOString().slice(0, 10); // получили '2025-02-12'

    return datesArray.includes(searchDate) ? '✅' : '❌';
}





//вынести определение даты в отдельную функцию и объеденить 2 функции в одну (страйки)
//применить стили