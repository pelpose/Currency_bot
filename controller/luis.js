var builder = require('botbuilder');
var currency = require('../api/currency');
var userDB= require('../controller/userDB');
var qna = require('../api/qna');

exports.startDialog = function (bot) {
    // Luis URL
    var luisApi = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e05a31f2-2201-4527-96af-f9811ab3deeb?subscription-key=b77ec5414a1642738fca9b8b3d23c8b7&verbose=true&timezoneOffset=0&q=');
    
    bot.recognizer(luisApi);

    //QNA Intents,send question to the QNA maker
	bot.dialog('qna', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            builder.Prompts.text(session, "What is your question?");
        },
        function (session, results, next) {
            qna.tossToQna(session, results.response);
        }
    ]).triggerAction({
        matches: 'qna'
    }); 

    //leaving Intents, logout method included.
	bot.dialog('LeavingIntents',
        function (session, args, next) {
            session.dialogData.args = args || {};    
            if (!session.conversationData["username"]) {
                session.send("Your not connected.");
                next();//skip		
            } else {
                session.send("Good Bye!");
                session.conversationData["username"] = null;
                session.conversationData["currency"] = null;
                next();//skip
            }
        }
    ).triggerAction({
        matches: 'LeavingIntents'
    });

    //delete Intents
	bot.dialog('deleteIntents', 
        function (session, args, next) {
            session.dialogData.args = args || {};
            //LogIn if the user is not exist.       
            if (!session.conversationData["username"]) {
                session.send("Your not connected.");
                next();//skip	 		
            } else {
                session.send('Deleting User...');
                //create user if not exist, othwerwise display user name with base currency
                userDB.deleteUser(session, session.conversationData["username"]);
            }
        }		
    ).triggerAction({
        matches: 'deleteIntents'
    });

    //Display my currency
	bot.dialog('displayCurrency', function (session, args) {
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "your not login yet, please type 'hi' or 'login' to Login."); 
        }
        else{
            session.send("your Base Currency is : "+session.conversationData["currency"].toUpperCase());
        }
    }).triggerAction({
        matches: 'displayCurrency'
    });

    //Welcom Intents, login method included.
	bot.dialog('WelcomeIntents', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            //LogIn if the user is not exist.       
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "please tell me your name.");   		
            } else {
                //if user already exist, response simple message.
				session.send("Hello "+session.conversationData["username"]);
                next();//skip
            }
        },
        function (session, results, next) {
                if (results.response) {
                    session.conversationData["username"] = results.response;
                    //create user if not exist, othwerwise display user name with base currency
					userDB.getBaseCurrency(session, session.conversationData["username"]);
                }            
        },
		
    ]).triggerAction({
        matches: 'WelcomeIntents'
    });

    //Welcom Intents, compare currency with base currency.
	bot.dialog('compareCurrency', function (session, args) {
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "your not login yet, please type 'hi' or 'login' to Login."); 
        }
        else{
           // Get Currency from the string
            var currencyValue = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');
            // check the currency is exist or not.
            if (currencyValue) {
                session.send('Caculating Currency...');
                currency.displayCurrency(currencyValue.entity, session.conversationData["currency"], session);

            } else {
                session.send("something is not right, Please try later...");
            }
        }
    }).triggerAction({
        matches: 'compareCurrency'
    });
    
    //ChangeCurrency Intents, able to set new base currency.
    bot.dialog('changeCurrency', function (session, args) {
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "your not login yet, please type 'hi' or 'login' to Login."); 
        }
        else{
           // Get Currency from the string
            var currencyValue = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');
            // check the currency is exist or not.
            if (currencyValue) {
                session.send('Changing Currency...');
                userDB.changeCurrency(session, session.conversationData["username"],currencyValue.entity);
            } else {
                session.send("something is not right, Please try later...");
            }
        }
    }).triggerAction({
        matches: 'changeCurrency' 
    });
}

//Get Base Currency from DB
exports.getCurrency = function getData(session, username, currency){
    session.conversationData["currency"] = currency;
    var result = currency.toUpperCase();
    session.send("Hello %s, your Base Currency is: %s", username, result);
    };