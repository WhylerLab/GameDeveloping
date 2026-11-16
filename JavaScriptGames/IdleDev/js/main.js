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

const juniorHireBtn = document.getElementById('junior_btn');
const juniorStockCounter = document.getElementById('junior_stock_counter');
const juniorIncomeCounter = document.getElementById('junior_income_counter');


// SETUP
var locTotalVar = 0;
var moneyTotalVar = 0;
var locValue = 1.50;

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

var juniorCount = 0;
var juniorCost = 500;
var juniorLocPerSecond = 2;
var juniorMoneyPerSecond = 2;


// ACTION FUNCTIONS
function writeLoc(fromClick) {
    if (fromClick) {
        locIncomeVar += locValue;
        locTotalIncome.textContent = locIncomeVar.toFixed(2) + ' $';
    }

    locTotalVar ++;
    locTotalCounter.textContent = locTotalVar;
    moneyTotalVar = moneyTotalVar + locValue;


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
};


locClick.addEventListener('click', function() {
    writeLoc(true);
});


// GENERATOR FUNCTIONS
traineeHireBtn.addEventListener('click', function() {
    if (moneyTotalVar >= traineeCost) {
        traineeCount++;
        traineeStockCounter.textContent = traineeCount;

        moneyTotalVar -= traineeCost;
        moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';

        traineeIncomeCounter.textContent = (traineeCount * traineeLocPerSecond * locValue).toFixed(2) + ' $';
    } else {
        console.log('Not enough money!');
    }
});


juniorHireBtn.addEventListener('click', function() {
    if (moneyTotalVar >= juniorCost) {
        juniorCount++;
        juniorStockCounter.textContent = juniorCount;

        moneyTotalVar -= juniorCost;
        moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';

        juniorIncomeCounter.textContent = (juniorCount * juniorLocPerSecond * locValue).toFixed(2) + ' $';
    } else {
        console.log('Not enough money!');
    }
});


setInterval(function() {
    for (let i = 0; i < traineeCount * traineeLocPerSecond; i++) {
        writeLoc();
    }
    for (let i = 0; i < juniorCount * juniorLocPerSecond; i++) {
        writeLoc();
    }
}, 1000);