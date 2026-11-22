// VARIABLES AND OBJECTIVES
const locTotalCounter = document.getElementById('loc_total_counter');
const moneyTotalCounter = document.getElementById('money_total_counter');

const scriptFileCounter = document.getElementById('script_file');
const scriptProgressbar = document.querySelector('.progressbar_fill_script');
const appFileCounter = document.getElementById('app_file');
const appProgressbar = document.querySelector('.progressbar_fill_apps');

const locClick = document.getElementById('write_loc_btn');
const locTotalIncome = document.getElementById('loc_income');

const generators = [
    { name: 'Trainee', cost: 500,  count: 0, locPerSecond: 1,
      btn: document.getElementById('trainee_btn'),
      stockEl: document.getElementById('trainee_stock_counter'),
      incomeEl: document.getElementById('trainee_income_counter') },
    { name: 'Junior',  cost: 1500,  count: 0, locPerSecond: 1.5,
      btn: document.getElementById('junior_btn'),
      stockEl: document.getElementById('junior_stock_counter'),
      incomeEl: document.getElementById('junior_income_counter') },
    { name: 'Senior',  cost: 4000, count: 0, locPerSecond: 6,
      btn: document.getElementById('senior_btn'),
      stockEl: document.getElementById('senior_stock_counter'),
      incomeEl: document.getElementById('senior_income_counter') }
];


// SETUP
var locTotalVar = 0;
var moneyTotalVar = 0;
var locValue = 1;

var locIncomeVar = 0;

var scriptCounterVar = 0;
var scriptTotalCounter = 0;

var appCounterVar = 0;
var appTotalCounter = 0;

let scriptProgressWidth = 0;
let appProgressWidth = 0;


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
        moneyTotalVar += 15;

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
        moneyTotalVar += 50;

        appCounterVar = 0;
        appTotalCounter ++;
        appProgressWidth = 0;

        appFileCounter.textContent = appTotalCounter;
    }

    moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';
    updateButtonStates();
};


locClick.addEventListener('click', function() {
    writeLoc(true);
});


// OFFICES
const offices = [
    { name: 'Garage', cost: 0, background: '#212e35', max: { Trainee: 5,  Junior: 3,  Senior: 1 } },
    { name: 'Small Office', cost: 5000, background: '#2b3a55', max: { Trainee: 10, Junior: 6,  Senior: 3 } },
    { name: 'Medium Office', cost: 30000, background: '#3a2b4d', max: { Trainee: 20, Junior: 12, Senior: 8 } }
];

var officeLevel = 0;

const officeNameEl = document.getElementById('office_name');
const officeBtn = document.getElementById('office_btn');


// GENERATOR FUNCTIONS
function updateGeneratorDisplay(gen) {
    const max = offices[officeLevel].max[gen.name];
    gen.stockEl.textContent = gen.count + ' / ' + max;
    gen.incomeEl.textContent = (gen.count * gen.locPerSecond * locValue).toFixed(2) + ' $';
}

updateButtonStates();

function buyGenerator(gen) {
    if (gen.count >= offices[officeLevel].max[gen.name]) {
        console.log('Office is full!');
        return;
    }
    if (moneyTotalVar >= gen.cost) {
        gen.count++;
        moneyTotalVar -= gen.cost;
        moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';
        updateGeneratorDisplay(gen);
        updateButtonStates();
    } else {
        console.log('Not enough money!');
    }
}

for (const gen of generators) {
    gen.btn.addEventListener('click', function() {
        buyGenerator(gen);
    });
}

function updateButtonStates() {
    for (const gen of generators) {
        const full = gen.count >= offices[officeLevel].max[gen.name];
        const affordable = moneyTotalVar >= gen.cost && !full;
        gen.btn.style.opacity = affordable ? 1 : 0.25;
        officeBtn.style.opacity = (offices[officeLevel + 1] && moneyTotalVar >= offices[officeLevel + 1].cost) ? 1 : 0.25;
    }
}


// BUY OFFICES
function updateOfficeDisplay() {
    document.body.style.background = offices[officeLevel].background;
    officeNameEl.textContent = offices[officeLevel].name;
    const next = offices[officeLevel + 1];
    if (next) {
        officeBtn.textContent = 'Move to ' + next.name + ' (' + next.cost + ' $)';
    } else {
        officeBtn.textContent = 'Max office';
        officeBtn.disabled = true;
    }
}

officeBtn.addEventListener('click', function() {
    const next = offices[officeLevel + 1];
    if (!next) return;

    if (moneyTotalVar >= next.cost) {
        moneyTotalVar -= next.cost;
        moneyTotalCounter.textContent = moneyTotalVar.toFixed(2) + ' $';
        officeLevel++;

        updateOfficeDisplay();
        for (const gen of generators) {
            updateGeneratorDisplay(gen);
        }
    } else {
        console.log('Not enough money!');
    }
});


// STARTDISPLAY
updateOfficeDisplay();
for (const gen of generators) {
    updateGeneratorDisplay(gen);
}
updateButtonStates();


setInterval(function() {
    let locThisTick = 0;
    for (const gen of generators) {
        locThisTick += gen.count * gen.locPerSecond;
    }
    for (let i = 0; i < locThisTick; i++) {
        writeLoc();
    }
}, 1000);