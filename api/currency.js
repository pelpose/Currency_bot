var rest = require('../controller/restclient');
var builder = require('botbuilder');

//display currncy
exports.displayCurrency = function getCurrency(currency, baseCurrency, session){
    var baseCurrency = baseCurrency.toUpperCase();
    currency =currency.toUpperCase();
    var url = "https://api.fixer.io/latest?base="+baseCurrency+"&symbols="+currency;
    rest.getCurrency(url, session,currency, baseCurrency,displayCurrency);
}

function displayCurrency(message, currency,baseCurrency, session) {
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
    //if the currency is wrong or not in the list
    if(!result){
        session.send("Sorry, can not find Data, Please check your currency.");                                                        
    }
    else {
        var currenyItems =[];
        var currenyItem = {};
        var currencyValue = result.toString();
        currenyItem.title = currency.toUpperCase();
        currenyItem.value = currencyValue;
        currenyItems.push(currenyItem);
        //display card into chat
        session.send(new builder.Message(session).addAttachment({
            contentType: "application/vnd.microsoft.card.adaptive",
            content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "0.5",
                "body": [
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": baseCurrency.toUpperCase(),
                                "size": "large"
                            },
                            {
                                "type": "TextBlock",
                                "text": "Today's Currency rate is :",
                                "size": "small"
                            }
                        ]
                    },
                    {
                        "type": "Container",
                        "spacing": "none",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "FactSet",
                                                "facts": currenyItems
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }));
    }
}