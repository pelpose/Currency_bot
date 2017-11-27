var builder = require('botbuilder');
var currency = require('../api/currency');
var userDB= require('../controller/userDB');
// Some sections have been omitted

exports.startDialog = function (bot) {
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e05a31f2-2201-4527-96af-f9811ab3deeb?subscription-key=b77ec5414a1642738fca9b8b3d23c8b7&verbose=true&timezoneOffset=0&q=');
    
    bot.recognizer(recognizer);
	
	bot.dialog('WelcomeIntents', [
        function (session, args, next) {
            if (!language(session)) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "please tell me your name.");   		
            } else {
				session.send("Hello "+session.conversationData["username"]);
                next(); // Skip if we already have this info.
            }
        }},
        function (session, results, next) {
            if (!language(session)) {
                if (results.response) {
                    session.conversationData["username"] = results.response;
					userDB.showBaseCurrency(session, session.conversationData["username"]);
                }
                
            }
        },
		
    ]).triggerAction({
        matches: 'WelcomeIntents'
    });
	bot.dialog('compareCurrency', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results,next) {
            
            //Add this code in otherwise your username will not work.
            if (results.response) {
                session.conversationData["username"] = results.response;
            }
    
            session.send("You want to delete one of your favourite foods.");
    
            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'food');
    
            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Deleting \'%s\'...', foodEntity.entity);
                food.deleteFavouriteFood(session,session.conversationData['username'],foodEntity.entity); //<--- CALLL WE WANT
            } else {
                session.send("No food identified! Please try again");
            }
        
    
    }]).triggerAction({
        matches: 'compareCurrency'
    });
    /*
	bot.dialog('compareCurrency', function (session, args) {
        if (!language(session)) {

           // Pulls out the food entity from the session if it exists
            var currencyValue = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');

            // Checks if the for entity was found
            if (currencyValue) {
                session.send('testing in %s...', currencyValue.entity);
                currency.displayCurrencyCards(session);

            } else {
                session.send("fuck my life");
                console.log( currencyValue.entity);
            }
		}
    }).triggerAction({
        matches: 'compareCurrency'
    });*/
		
	bot.dialog('qna', function (session, args) {
        if (!language(session)) {
            session.send("qna intent found");
		}
    }).triggerAction({
        matches: 'qna'
    });
	
	function language(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("ㄱㄱ")) {
		session.send("ㄱㄱ");

        return true;
    }
    else {
        return false;
    }
}


}
