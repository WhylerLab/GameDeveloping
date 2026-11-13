// VARIABLES
const locTotalCounter = document.getElementById('loc_total_counter');
const moneyTotalCounter = document.getElementById('money_total_counter');

const locClick = document.getElementById('write_loc_btn');


// SETUP
var locTotalVar = 0;
var moneyTotalVar = 0;
locTotalCounter.textContent = locTotalVar;


// MONEY


// ACTION FUNCTIONS
locClick.addEventListener('click', function() {
    locTotalVar ++;
    locTotalCounter.textContent = locTotalVar;
    moneyTotalVar = moneyTotalVar + 10;
    moneyTotalCounter.textContent=moneyTotalVar;

    if (locTotalVar % 10 === 0) {
        moneyTotalVar + 50;
      }

});