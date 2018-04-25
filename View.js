/* jshint -W097 */
"use strict";
/*
* Code for University of Strathclyde Mobile App Development.
* Developed by Filip Lejhanec 2017.
*
* Code confidential to developer and course examiners.
*
* Description of this file
*/
function View() {
    var sideBar = document.getElementById("sideBar");
    var menu = document.getElementById("menu");
    var homeCurrency = document.getElementById("homeCurrency");
    var visitingCurrency = document.getElementById("visitingCurrency");
    var currencyList = document.getElementById("currencyList");
    var currencies = document.getElementsByClassName("currency");
    var numPad = document.getElementById("numPad");
    var output = document.getElementById("output");
    var outputValue = document.getElementById("outputValue");
    var outputSymbol = document.getElementById("outputSymbol");
    var secondaryOutput = document.getElementById("secondaryOutput");
    var secondaryOutputValue = document.getElementById("secondaryOutputValue");
    var secondaryOutputSymbol = document.getElementById("secondaryOutputSymbol");
    var numbers = document.getElementsByClassName("number");
    var clear = document.getElementById("clear");
    var convert = document.getElementById("convert");
    var zeroBank = document.getElementById("zeroBank");
    var twoBank = document.getElementById("twoBank");
    var fourBank = document.getElementById("fourBank");
    var sixBank = document.getElementById("sixBank");
    var currencySymbols = {
        "AUD": "&#36",
        "BGN": "&#1083&#1074",
        "BRL": "&#82&#36",
        "CAD": "&#36",
        "CNY": "&#165",
        "HRK": "&#107&#110",
        "CZK": "&#75&#269",
        "DKK": "&#107&#114",
        "HKD": "&#36",
        "HUF": "&#70&#116",
        "ISK": "&#107&#114",
        "INR": "&#82&#112",
        "ILS": "&#8362",
        "JPY": "&#165",
        "KRW": "&#8361",
        "MYR": "&#82&#77",
        "MXN": "&#36",
        "NZD": "&#36",
        "NOK": "&#107&#114",
        "PHP": "&#8369",
        "PLN": "&#122&#322",
        "RON": "&#108&#101&#105",
        "RUB": "&#8381",
        "SGD": "&#36",
        "ZAR": "&#82",
        "SEK": "&#107&#114",
        "CHF": "&#67&#72&#70",
        "THB": "&#3647",
        "TRY": "&#36",
        "GBP": "&#163",
        "USD": "&#36",
        "EUR": "&#8364"
    };

    function addDigitCallback (callback) {
        for (var i = 0; i < numbers.length; i++) {
            numbers[i].onclick = function (event) {
                var digit = parseFloat(event.target.innerHTML);
                callback(digit);
            };
        }
    }

    function addClearCallback (callback) {
        clear.onclick = callback;
    }

    function addConvertCallback (callback) {
        convert.onclick = callback;
    }

    function addBankRateCallback (callback) {
        zeroBank.onclick = function(){callback(0.00);};
        twoBank.onclick = function(){callback(0.02);};
        fourBank.onclick = function(){callback(0.04);};
        sixBank.onclick = function(){callback(0.06);};
    }

    function addHomeCurrencyCallback (callback) {
        homeCurrency.onclick = callback;
    }

    function addVisitingCurrencyCallback (callback) {
        visitingCurrency.onclick = callback;
    }

    function displayValue(value) {
        secondaryOutput.style.opacity = 0;
        outputValue.innerHTML = roundForDisplay(value);
        outputSymbol.innerHTML = currencySymbols[homeCurrency.innerHTML];
    }

    function displayConversionValues(value, secondaryValue) {
        secondaryOutput.style.opacity = 1;
        outputValue.innerHTML = roundForDisplay(value);
        outputSymbol.innerHTML = currencySymbols[visitingCurrency.innerHTML];
        secondaryOutputValue.innerHTML = roundForDisplay(secondaryValue);
        secondaryOutputSymbol.innerHTML = currencySymbols[homeCurrency.innerHTML];
    }

    function roundForDisplay(value) {
        if (value >= 100) {
            return value.toFixed(0);
        } else if (value >= 10) {
            return value.toFixed(1);
        } else {
            return value.toFixed(2);
        }
    }

    function getCurrencyFromUser (callback) {
        for (var i = 0; i < currencies.length; i++) {
            currencies[i].onclick = function (event) {
                var currency = event.target.innerHTML;
                callback(currency);
                hideCurrencyList();
            };
        }
        showCurrencyList();
    }

    function showCurrencyList () {
        sideBar.style.right = "-70vw";
    }

    function hideCurrencyList () {
        sideBar.style.right = "0vw";
    }

    function setHomeCurrency (currency) {
        homeCurrency.innerHTML = currency;
        if (secondaryOutput.style.opacity === "1") {
            secondaryOutputSymbol.innerHTML = currencySymbols[currency];
        } else {
            outputSymbol.innerHTML = currencySymbols[currency];
        }
    }

    function setVisitingCurrency (currency) {
        visitingCurrency.innerHTML = currency;
        if (secondaryOutput.style.opacity === "1") {
            outputSymbol.innerHTML = currencySymbols[currency];
        }
    }

    function setBankRate (rate) {
        unsetBankRate();
        switch (rate) {
            case 0.00:
                zeroBank.classList.add("selected");
                break;
            case 0.02:
                twoBank.classList.add("selected");
                break;
            case 0.04:
                fourBank.classList.add("selected");
                break;
            case 0.06:
                sixBank.classList.add("selected");
                break;
            default:
                zeroBank.classList.add("selected");
        }
    }

    function unsetBankRate () {
        zeroBank.classList.remove("selected");
        twoBank.classList.remove("selected");
        fourBank.classList.remove("selected");
        sixBank.classList.remove("selected");
    }

    return {
        addDigitCallback: addDigitCallback,
        addClearCallback: addClearCallback,
        addConvertCallback: addConvertCallback,
        addBankRateCallback: addBankRateCallback,
        addHomeCurrencyCallback: addHomeCurrencyCallback,
        addVisitingCurrencyCallback: addVisitingCurrencyCallback,
        displayValue: displayValue,
        displayConversionValues: displayConversionValues,
        getCurrencyFromUser: getCurrencyFromUser,
        setVisitingCurrency: setVisitingCurrency,
        setHomeCurrency: setHomeCurrency,
        setBankRate: setBankRate
    };
}
