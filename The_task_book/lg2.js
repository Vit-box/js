//Рендер таблицы

function renderList () {
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
}



renderList ()