var rest = require('../controller/restclient');
var builder = require('botbuilder');

//display currncy
exports.displayCurrencyCards = function getCurrency(session){
    var url = "https://api.fixer.io/latest?base=NZD&symbols=USD";

    rest.getCurrency(url, session,displayCurrencyCards);
}

function displayCurrencyCards(message, session) {
	var currencyData = JSON.parse(message);
	
	var currenyInfo = currencyData.rates;
	var test = currenyInfo.USD.toString();
	var currenyItems =[];
        var currenyItem = {};
        currenyItem.title = "USD";
        currenyItem.value = test;
        currenyItems.push(currenyItem);
		//Displays nutrition adaptive cards in chat box 
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
                            "text": "NZD",
                            "size": "large"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Currency Information"
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
		
		
	/*
	//Displays nutrition adaptive cards in chat box 
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
                            "text": "NZD",
                            "size": "large"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Currency Information"
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
    }));*/
}
