// VARIABLES AND OBJECTIVES
const locTotalCounter = document.getElementById('loc_total_counter');
const moneyTotalCounter = document.getElementById('money_total_counter');

const scriptFileCounter = document.getElementById('script_file');
const scriptProgressbar = document.querySelector('.progressbar_fill_script');
const appFileCounter = document.getElementById('app_file');
const appProgressbar = document.querySelector('.progressbar_fill_apps');

const locClick = document.getElementById('write_loc_btn');
const locTotalIncome = document.getElementById('loc_income');

const traineeHireBtn = document.getElementById('trainee_btn');
const traineeStockCounter = document.getElementById('trainee_stock_counter');
const traineeIncomeCounter = document.getElementById('trainee_income_counter');


// SETUP
var locTotalVar = 0;
var moneyTotalVar = 0;

var locIncomeVar = 0;

var scriptCounterVar = 0;
var scriptTotalCounter = 0;

var appCounterVar = 0;
var appTotalCounter = 0;

let scriptProgressWidth = 0;
let appProgressWidth = 0;

var traineeCount = 0;
var traineeCost = 225;
var traineeLocPerSecond = 1;
var traineeMoneyPerSecond = 1.5;


// ACTION FUNCTIONS
locClick.addEventListener('click', function() {
    locIncomeVar += 1.50;
    locTotalIncome.textContent = locIncomeVar.toFixed(2) + ' $';

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


// GENERATOR FUNCTIONS
traineeHireBtn.addEventListener('click', function(){
    if (traineeCost <= moneyTotalVar) {
        traineeCount++;
        traineeStockCounter.textContent = traineeCount;

        moneyTotalVar = moneyTotalVar - 225;
        moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';

    }else{
        console.log('Not enough money!');
    }
})

setInterval(function() {

    if (traineeCount >= 1) {
        locTotalVar ++;
        locTotalCounter.textContent = locTotalVar;

        moneyTotalVar += traineeCount * traineeMoneyPerSecond;
        moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';

        console.log(traineeMoneyPerSecond);
        traineeIncomeCounter.textContent = traineeMoneyPerSecond.toFixed(2) + ' $';
    }

}, 1000);