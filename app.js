'use strict';

let timeSlots = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','Daily Location Totals'];

function randomInRange(min, max) {
    let range = max - min;

    // return an integer between min and max
    return Math.floor(Math.random() * (range + 1)) + min;
}

function CookieStand(id, location, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerSale, cookieSales = []) {
    this.id = id;
    this.location = location;
    this.minCustomersPerHour = minCustomersPerHour;
    this.maxCustomersPerHour = maxCustomersPerHour;
    this.avgCookiesPerSale = avgCookiesPerSale;
    this.cookieSales = cookieSales;
    this.storeTotal = 0;
};

let seattleLocation = new CookieStand('seattle', 'Seattle', 23, 65, 6.3);
let tokyoLocation = new CookieStand('tokyo', 'Tokyo', 3, 24, 1.2);
let dubaiLocation = new CookieStand('dubai', 'Dubai', 11, 38, 3.7);
let parisLocation = new CookieStand('paris', 'Paris', 20, 38, 2.3);
let limaLocation = new CookieStand('lima', 'Lima', 2, 16, 4.6);
let allStands = [seattleLocation, tokyoLocation, dubaiLocation, parisLocation, limaLocation];

// generateCustomersPerHour
CookieStand.prototype.generateCustomersPerHour = function() {
    let customersPerHour = randomInRange(this.minCustomersPerHour, this.maxCustomersPerHour);
    // console.log(Math.ceil(customersPerHour));
    return customersPerHour;
}
for (let i = 0; i < allStands.length; i++) {
    allStands[i].generateCustomersPerHour();
};

// calcCookiesEachHour
CookieStand.prototype.calcCookiesEachHour = function() {
    let customersPerHour = this.generateCustomersPerHour();
    let cookiesEachHour = customersPerHour * this.avgCookiesPerSale;
    // console.log(Math.ceil(cookiesEachHour));
    return Math.ceil(cookiesEachHour);
};

// simulateCookieSales
CookieStand.prototype.simulateCookieSales = function() {
for (let i = 0; i < timeSlots.length -1; i++) {
    let certainCookie = this.calcCookiesEachHour();
    this.cookieSales.push(certainCookie);
    this.storeTotal+= certainCookie;
}
this.cookieSales.push(this.storeTotal);
};
// render
CookieStand.prototype.render = function() {
    const salesRow = document.createElement('tr');
    const tableElem = document.getElementById('table');
    tableElem.appendChild(salesRow);
    const tableCell = document.createElement('td');
    salesRow.appendChild(tableCell);
    tableCell.textContent = this.location;
    for (let i = 0; i < this.cookieSales.length; i++) {
        const cookiesElem = document.createElement('td');
        cookiesElem.textContent = this.cookieSales[i];
        salesRow.appendChild(cookiesElem);
    }
};

function renderHeaderRow() {
    const tableElem = document.getElementById('table');
    const rowOne = document.createElement('tr');
    tableElem.appendChild(rowOne);
    const emptyTh = document.createElement('th');
    rowOne.appendChild(emptyTh);
    for (let i = 0; i < timeSlots.length; i++) {
        const timeHeaderElem = document.createElement('th');
        timeHeaderElem.textContent = timeSlots[i];
        rowOne.appendChild(timeHeaderElem);
        timeHeaderElem.setAttribute('scope', 'col');
    }
};

function renderFooterRow () {
    const tableElem = document.getElementById('table');
    const tableFootElem = document.createElement('tr');
    tableElem.appendChild(tableFootElem);

    const totalCookiesElem = document.createElement('th');
    totalCookiesElem.setAttribute('scope', 'row');
    totalCookiesElem.textContent = 'Totals';
    tableFootElem.append(totalCookiesElem);

for (let i = 0; i < timeSlots.length; i++) {
    let cookieTotalHour = 0;
    for (let j = 0; j < allStands.length; j++) {
    cookieTotalHour += allStands[j].cookieSales[i]
    }
    const cookieTd = document.createElement('td');
    cookieTd.textContent = cookieTotalHour;
    tableFootElem.appendChild(cookieTd);
} 
}
renderHeaderRow();

// Done with all total
for (let i = 0; i < allStands.length; i++) {
    allStands[i].calcCookiesEachHour();
    allStands[i].simulateCookieSales();
    allStands[i].render();
};
renderFooterRow();
