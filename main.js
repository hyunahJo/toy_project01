"use strict";
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const currentYearMonth = document.querySelector(
    ".calendar__current-year-month"
);
const calendar = document.querySelector("#calendar");

let today = new Date();

let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;

prev.addEventListener("click", () => {
    prevMonth();
});

next.addEventListener("click", () => {
    nextMonth();
});

// 달력 표기
function buildCalendar() {
    let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let day = firstDate.getDay();
    let week = Math.ceil(lastDate.getDate() / 7) + 1;
    let todayYearMonth = `${currentYear}년 ${currentMonth}월`;
    let leftDays = 7;
    let setDays = 1;
    for (let i = 1; i < week; i++) {
        let row = calendar.insertRow();
        while (day != 0) {
            row.insertCell().innerHTML = "";
            day -= 1;
            leftDays -= 1;
        }
        while (leftDays != 0) {
            if (setDays > lastDate.getDate()) {
                row.insertCell().innerHTML = "";
                leftDays -= 1;
            } else {
                row.insertCell().innerHTML = setDays;
                setDays += 1;
                leftDays -= 1;
            }
        }
        leftDays = 7;
    }
    setDays -= 1;
    if (setDays != lastDate.getDate()) {
        let row = calendar.insertRow();
        while (setDays != lastDate.getDate()) {
            setDays++;
            leftDays--;
            row.insertCell().innerHTML = setDays;
        }

        while (leftDays != 0) {
            row.insertCell().innerHTML = "";
            leftDays--;
        }
    }
    currentYearMonth.innerHTML = todayYearMonth;
}

buildCalendar();

// 미사용 tablerow 삭제
function deleteCalendar() {
    while (calendar.rows.length > 2) {
        calendar.deleteRow(2);
    }
}

// 전달로 이동
function prevMonth() {
    currentMonth = currentMonth - 1;
    if (currentMonth == 0) {
        currentMonth = 12;
        currentYear -= 1;
    }
    deleteCalendar();
    today = new Date(currentYear, currentMonth - 1);
    buildCalendar();
}

// 다음달로 이동
function nextMonth() {
    currentMonth += 1;
    if (currentMonth == 13) {
        currentMonth = 1;
        currentYear = currentYear + 1;
    }
    deleteCalendar();
    today = new Date(currentYear, currentMonth - 1);
    buildCalendar();
}

// right section
const input = document.querySelector(".add__input");
const addBtn = document.querySelector(".add__button");
const addItem = document.querySelector(".add__item");
const todo = document.querySelectorAll(".todo");

function onAdd() {
    const text = input.value;
    if (text === "") {
        input.focus();
        return;
    }
    const item = createItem(text);
    addItem.appendChild(item);
    item.scrollIntoView({ block: "center" });
    input.value = "";
    input.focus();
}

let id = 0;
function createItem(text) {
    const itemList = document.createElement("div");
    itemList.setAttribute("class", "add__item-list");
    itemList.setAttribute("data-id", id);
    itemList.innerHTML = `<span class="todo">${text}</span><span><i class="fas fa-trash-alt" data-id=${id}></i>
    </span>`;
    id++;
    itemList.addEventListener("click", checkList);
    return itemList;
}

addBtn.addEventListener("click", () => {
    onAdd();
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        onAdd();
    }
});

addItem.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    if (id) {
        const toBedelete = document.querySelector(
            `.add__item-list[data-id="${id}"]`
        );
        toBedelete.remove();
    }
});

function checkList(e) {
    e.currentTarget.classList.add("checked");
}

// 목표 달성률
const rateValue = document.querySelector(".rate-value");
const percent = document.querySelector(".percent");
