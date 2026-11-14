// VARIABLES
const locTotalCounter = document.getElementById('loc_total_counter');
const moneyTotalCounter = document.getElementById('money_total_counter');

const scriptFileCounter = document.getElementById('script_file');
const appFileCounter = document.getElementById('app_file');

const locClick = document.getElementById('write_loc_btn');


// SETUP
var locTotalVar = 0;
var moneyTotalVar = 0;

var scriptCounterVar = 0;
var scriptTotalCounter = 0;

var appCounterVar = 0;
var appTotalCounter = 0;


// ACTION FUNCTIONS
locClick.addEventListener('click', function() {
    locTotalVar ++;
    locTotalCounter.textContent = locTotalVar;
    moneyTotalVar = moneyTotalVar + 1.50;


    // SCRIPT COUNT
    scriptCounterVar++;

    if (scriptCounterVar === 10) {
        moneyTotalVar += 25;
        scriptCounterVar = 0;
        scriptTotalCounter ++;
        scriptFileCounter.textContent = scriptTotalCounter;
    }

    // APP COUNT
    appCounterVar++;

    if (appCounterVar === 50 ) {
        moneyTotalVar += 150;
        appCounterVar = 0;
        appTotalCounter ++;
        appFileCounter.textContent = appTotalCounter;
    }

    moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';
});