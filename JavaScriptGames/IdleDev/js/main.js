// VARIABLES AND OBJECTIVES
const locTotalCounter = document.getElementById('loc_total_counter');
const moneyTotalCounter = document.getElementById('money_total_counter');

const scriptFileCounter = document.getElementById('script_file');
const scriptProgressbar = document.querySelector('.progressbar_fill_script');
const appFileCounter = document.getElementById('app_file');
const appProgressbar = document.querySelector('.progressbar_fill_apps');

const locClick = document.getElementById('write_loc_btn');


// SETUP
var locTotalVar = 0;
var moneyTotalVar = 0;

var scriptCounterVar = 0;
var scriptTotalCounter = 0;

var appCounterVar = 0;
var appTotalCounter = 0;

let scriptProgressWidth = 0;
let appProgressWidth = 0;


// ACTION FUNCTIONS
locClick.addEventListener('click', function() {
    locTotalVar ++;
    locTotalCounter.textContent = locTotalVar;
    moneyTotalVar = moneyTotalVar + 1.50;


    // SCRIPT COUNT
    scriptCounterVar++;
    scriptProgressWidth += 10;
    scriptProgressbar.style.width = scriptProgressWidth + '%';

    if (scriptCounterVar === 10) {
        moneyTotalVar += 25;

        scriptCounterVar = 0;
        scriptTotalCounter ++;
        scriptProgressWidth = 0;
        
        scriptFileCounter.textContent = scriptTotalCounter;
    }

    // APP COUNT
    appCounterVar++;
    appProgressWidth += 2;
    appProgressbar.style.width = appProgressWidth + '%';

    if (appCounterVar === 50 ) {
        moneyTotalVar += 150;

        appCounterVar = 0;
        appTotalCounter ++;
        appProgressWidth = 0;

        appFileCounter.textContent = appTotalCounter;
    }

    moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';
});