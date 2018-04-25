/* jshint -W097 */
"use strict";
/*
* Code for University of Strathclyde Mobile App Development.
* Developed by Filip Lejhanec 2017.
*
* Code confidential to developer and course examiners.
*
* Description of file
*/

function Controller(model, view) {

    var showConversion = false;

    function render() {
        if (showConversion) {
            view.displayConversionValues(model.convert(), model.getValue());
        } else {
            view.displayValue(model.getValue());
        }
        view.setVisitingCurrency(model.getVisitingCurrency());
        view.setHomeCurrency(model.getHomeCurrency());
        view.setBankRate(model.getBankRate());
    }

    function newDigit (value) {
        showConversion = false;
        model.newDigit(value);
    }

    function convert () {
        showConversion = true;
        render();
    }

    function clear () {
        showConversion = false;
        model.clear();
    }

    function changeHomeCurrency() {
        view.getCurrencyFromUser(setHomeCurrency);
    }

    function setHomeCurrency(currencyCode) {
        model.setHomeCurrency(currencyCode);
    }

    function changeVisitingCurrency() {
        view.getCurrencyFromUser(setVisitingCurrency);
    }

    function setVisitingCurrency(currencyCode) {
        model.setVisitingCurrency(currencyCode);
    }

    function setBankRate (rate) {
        model.setBankRate(rate);
    }

    this.update = function () {
        render();
    };

    model.addObserver(this);
    view.addDigitCallback(newDigit);
    view.addClearCallback(clear);
    view.addConvertCallback(convert);
    view.addBankRateCallback(setBankRate);
    view.addHomeCurrencyCallback(changeHomeCurrency);
    view.addVisitingCurrencyCallback(changeVisitingCurrency);
    view.setHomeCurrency(model.getHomeCurrency());
    view.setVisitingCurrency(model.getVisitingCurrency());
    view.setBankRate(model.getBankRate());

}
