const dateForm = document.getElementById('dateForm');
const today = new Date();

// Input
const dayInput = document.getElementById('dayInput');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('yearInput');

let formInput = {
    day: 0,
    month: 0,
    year: 0
};

// Output
const dayOutput = document.getElementById('outputDays');
const monthOutput = document.getElementById('outputMonths');
const yearOutput = document.getElementById('outputYears');

let formOutput = {
    day: null,
    month: null,
    year: null
};

// Error
const errDay = document.getElementById('errDay');
const errMonth = document.getElementById('errMonth');
const errYear = document.getElementById('errYear');

// Error message
const defaultMsg = "";
const emptyFieldMsg = "This field is required";
const invalidDay = "Must be a valid date"
const invalidDateNum = "Must be a valid day"
const invalidMonthNum = "Must be a valid month"
const invalidYearNum = "Must be a valid year"


const errMsg = (msg1, msg2, msg3) => {
    dateForm.classList.add('error');
    errDay.innerText = msg1;
    errMonth.innerText = msg2;
    errYear.innerText = msg3;
}

// Process
dateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    errMsg(defaultMsg, defaultMsg, defaultMsg);
    dateForm.classList.remove('error');

    // Input
    formInput = {
        day: String(dayInput.value),
        month: String(monthInput.value),
        year: String(yearInput.value)
    }
    event.preventDefault();

    //  Error handling
    if (formInput.day == "" || formInput.month == "" || formInput.year == "") {

        // Empty field
        errMsg(emptyFieldMsg, emptyFieldMsg, emptyFieldMsg);

    } else if ((formInput.day <= 0 || formInput.day > 31) || (formInput.month <= 0 || formInput.month > 12) || (formInput.year <= 0 || formInput.year > today.getFullYear)) {

        // Invalid date number
        errMsg(invalidDateNum, invalidMonthNum, invalidYearNum);

    } else if (formInput.year > today.getFullYear() || (formInput.day > today.getDate() || formInput.month > today.getMonth()) && formInput.year == today.getFullYear()){
        
        // No people from the future
        errMsg(invalidDay, defaultMsg, defaultMsg);
    
    } else if (((formInput.month == 4 || formInput.month == 6 || formInput.month == 9 || formInput.month == 11) && formInput.day > 30)) {

        // Invalid date by month
        errMsg(invalidDay, defaultMsg, defaultMsg);

    } else if (formInput.month == 2 && ((formInput.year % 4 != 0 && formInput.day > 28) || (formInput.year % 4 == 0 && formInput.day > 29))) {

        // February
        errMsg(invalidDay, defaultMsg, defaultMsg);

    } else {

        // Count
        let yearsDiff = parseInt(today.getFullYear() - formInput.year);
        let monthsDiff = parseInt(today.getMonth() - formInput.month);
        let daysDiff = parseInt(today.getDay() - formInput.day);

        if (yearsDiff < 0) {
            console.log("invalid date");
        } else if (monthsDiff < 0 && daysDiff < 0) {
            yearsDiff--;
            monthsDiff += 12;
            daysDiff += 30;
        } else if (monthsDiff >= 0 && daysDiff < 0) {
            daysDiff += 30;
        } else if (monthsDiff < 0 && daysDiff >= 0) {
            monthsDiff += 12;
        }

        formOutput = {
            day: String(daysDiff),
            month: String(monthsDiff),
            year: String(yearsDiff)
        };

        console.log("today", today);
        console.log(formOutput);

        // Output
        if (formOutput.year != "NaN" || formOutput.month != "NaN" || formOutput.day != "NaN") {
            yearOutput.innerText = formOutput.year;
            monthOutput.innerText = formOutput.month;
            dayOutput.innerText = formOutput.day;
        } else {
            yearOutput.innerText = "- -";
            monthOutput.innerText = "- -";
            dayOutput.innerText = "- -";
        }
    }
});
