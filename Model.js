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
function Model() {

    var observers = [];

    var value = 0.0;

    // Currency rates are with regards to Euro
    var homeCurrency = "GBP";
    var visitingCurrency = "EUR";
    var bankFee = 0.0;

    var currencyRates = {
        "EUR": 1.0,
        "USD": 1.0,
        "JPY": 1.0,
        "BGN": 1.0,
        "CZK": 1.0,
        "DKK": 1.0,
        "GBP": 1.0,
        "HUF": 1.0,
        "PLN": 1.0,
        "RON": 1.0,
        "SEK": 1.0,
        "CHF": 1.0,
        "ISK": 1.0,
        "NOK": 1.0,
        "HRK": 1.0,
        "RUB": 1.0,
        "TRY": 1.0,
        "AUD": 1.0,
        "BRL": 1.0,
        "CAD": 1.0,
        "CNY": 1.0,
        "HKD": 1.0,
        "IDR": 1.0,
        "ILS": 1.0,
        "INR": 1.0,
        "KRW": 1.0,
        "MXN": 1.0,
        "MYR": 1.0,
        "NZD": 1.0,
        "PHP": 1.0,
        "SGD": 1.0,
        "THB": 1.0,
        "ZAR": 1.0
    };

    function setBankRate (fee) {
        bankFee = fee;
        updateLocalStorage();
        notify();
    }

    function getBankRate () {
        return bankFee;
    }

    function setVisitingCurrency (currencyCode) {
        if (currencyCode !== homeCurrency && currencyCode !== visitingCurrency) {
            visitingCurrency = currencyCode;
            updateLocalStorage();
            notify();
        }
    }

    function getVisitingCurrency () {
        return visitingCurrency;
    }

    function setHomeCurrency (currencyCode) {
        if (currencyCode !== homeCurrency && currencyCode !== visitingCurrency) {
            homeCurrency = currencyCode;
            updateLocalStorage();
            notify();
        }
    }

    function getHomeCurrency (currency) {
        return homeCurrency;
    }

    function newDigit (digit) {
        if (value < 1000) {
            value = Math.floor(value);
            value = (value * 10) + digit;
            notify();
        }
    }

    function clear () {
        value = 0;
        notify();
    }

    function getValue () {
        return value;
    }

    function convert () {
        var homeRate = currencyRates[homeCurrency];
        var visitingRate = currencyRates[visitingCurrency];
        var converted = value / homeRate * visitingRate * (1 - bankFee);
        return converted;
    }

    function addObserver(observer) {
        observers.push(observer);
    }

    function removeObserver(observer) {
        var index = observers.indexOf(observer);
        observers.splice(index, 1);
    }

    function notify() {
        observers.forEach(function(observer) {
            observer.update();
        });
    }

    function loadLocalStorage () {
        if (typeof(Storage) !== "undefined") {
            var localHomeCurrency = localStorage.getItem("homeCurrency");
            if (localHomeCurrency !== null) {
                homeCurrency = localHomeCurrency;
            }
            var localVisitingCurrency = localStorage.getItem("visitingCurrency");
            if (localVisitingCurrency !== null) {
                visitingCurrency = localVisitingCurrency;
            }
            var localBankFee = localStorage.getItem("bankFee");
            if (localBankFee !== null) {
                bankFee = parseFloat(localBankFee);
            }
            var localCurrencyRates = localStorage.getItem("currencyRates");
            if (localCurrencyRates !== null) {
                currencyRates = JSON.parse(localCurrencyRates);
            }
        }
    }

    function updateLocalStorage () {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("homeCurrency", homeCurrency);
            localStorage.setItem("visitingCurrency", visitingCurrency);
            localStorage.setItem("bankFee", bankFee);
            localStorage.setItem("currencyRates", JSON.stringify(currencyRates));
        }
    }

    function updateExchangeRates () {
        var request = new XMLHttpRequest();
        request.open("GET", "https://devweb2017.cis.strath.ac.uk/~aes02112/ecbxml.php", true);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200)
            {
                var exchangeRates = request.responseXML;
                var cubes = exchangeRates.getElementsByTagName("Cube");
                for (var i = 0; i < cubes.length; i++) {
                    var currency = cubes[i].getAttribute("currency");
                    if (currency !== null) {
                        currencyRates[currency] = cubes[i].getAttribute("rate");
                    }
                }
                updateLocalStorage();
                notify();
            }
        };
        request.send(null);
    }

    loadLocalStorage();
    updateExchangeRates();
    window.setInterval(updateExchangeRates, 10000);

    return {
        addObserver: addObserver,
        removeObserver: removeObserver,
        setBankRate: setBankRate,
        getBankRate: getBankRate,
        setVisitingCurrency: setVisitingCurrency,
        getVisitingCurrency: getVisitingCurrency,
        setHomeCurrency: setHomeCurrency,
        getHomeCurrency: getHomeCurrency,
        newDigit: newDigit,
        getValue: getValue,
        clear: clear,
        convert: convert,
    };
}
