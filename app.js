'use strict';

let timeSlots = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm',];

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
}

// simCookieSales
CookieStand.prototype.simulateCookieSales = function() {
for (let i = 0; i < timeSlots.length; i++) {
    let certainCookie = this.calcCookiesEachHour();
    this.cookieSales.push(certainCookie);
    this.storeTotal+= certainCookie;
}
this.cookieSales.push(this.storeTotal);

}

CookieStand.prototype.render = function() {
    let ulElem = document.getElementById(this.id);
    for (let i = 0; i < timeSlots.length; i++) {
        let liElem = document.createElement('li');
        liElem.textContent = timeSlots[i] + ' : ' + this.cookieSales[i] + ' cookies';
        ulElem.appendChild(liElem);
    }
    let liElem = document.createElement('li');
    liElem.textContent = 'Total' + ' : ' + this.storeTotal + ' cookies';
    ulElem.appendChild(liElem);
    console.log(Math.ceil(this.avgCookiesPerSale));
}
for (let i = 0; i < allStands.length; i++) {
    allStands[i].calcCookiesEachHour();
    allStands[i].simulateCookieSales();
    allStands[i].render();
}

let tableElem = document.getElementById('table');
const row1 = document.createElement('th')

for (let i = 0; i < timeSlots.length; i++) {
    tableElem.appendChild(row1);
    const timeElem = document.createElement('th');
    timeElem.textContent = timeSlots[i];
    row1.appendChild(timeElem);
}


// let tableElem = document.getElementById('table');

// const row1 = document.createElement('tr');
// const row2 = document.createElement('tr');

// tableElem.appendChild(row1);
// tableElem.appendChild(row2);

// const sixElem = document.createElement('th');
// row1.appendChild(sixElem);
// sixElem.textContent = '6:00am';

// const sixDataElem = document.createElement('td');
// row2.appendChild(sixDataElem);
// sixDataElem.textContent = 'Cookie sales';
