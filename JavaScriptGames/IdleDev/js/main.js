// VARIABLES
const locTotalCounter = document.getElementById('loc_total_counter');
const moneyTotalCounter = document.getElementById('money_total_counter');

const locClick = document.getElementById('write_loc_btn');


// SETUP
var locTotalVar = 0;
locTotalCounter.textContent = locTotalVar;


// ACTION FUNCTIONS
locClick.addEventListener('click', function() {
    locTotalVar += 1;
    locTotalCounter.textContent = locTotalVar;
});