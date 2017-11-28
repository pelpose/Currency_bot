var rest = require('../controller/restclient');
var builder = require('botbuilder');
var currencyValue;

//display currncy
exports.displayCurrency = function getCurrency(currency, baseCurrency, session){
    var baseCurrency = baseCurrency.toUpperCase();
    currency =currency.toUpperCase();
    var url = "https://api.fixer.io/latest?base="+baseCurrency+"&symbols="+currency;
    console.log(url);
    rest.getCurrency(url, session,currency, displayCurrency);
}

function displayCurrency(message, currency, session) {
    var currencyData = JSON.parse(message);
    var currenyInfo = currencyData.rates;
    var result = currenyInfo.USD;//get Curreny rate from API
    // check the result is null
    if(!result){
        var result = currenyInfo.AUD;
        if(!result){
            var result = currenyInfo.NZD;
            if(!result){
                var result = currenyInfo.KOR;
                if(!result){
                    var result = currenyInfo.BGN;
                    if(!result){
                        var result = currenyInfo.BRL;
                        if(!result){
                            var result = currenyInfo.CAD;
                            if(!result){
                                var result = currenyInfo.CZK;
                                if(!result){
                                    var result = currenyInfo.IDR;
                                    if(!result){
                                        var result = currenyInfo.NOK;
                                        if(!result){
                                            var result = currenyInfo.PHP;
                                            if(!result){
                                                var result = currenyInfo.RUB;                                               
                                                if(!result){
                                                    var result = currenyInfo.THB;
                                                    if(!result){
                                                        var result = currenyInfo.CAD;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(!result){
        session.send("Sorry, can not find Data, Please check your currency.");                                                        
    }
    else {
        currencyValue = result.toString();
        session.send("Current %s is: %s", currency, currencyValue);
    }
}
