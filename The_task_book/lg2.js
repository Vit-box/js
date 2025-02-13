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