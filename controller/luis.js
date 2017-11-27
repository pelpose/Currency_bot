var builder = require('botbuilder');
var currency = require('../api/currency');
// Some sections have been omitted

exports.startDialog = function (bot) {
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e05a31f2-2201-4527-96af-f9811ab3deeb?subscription-key=b77ec5414a1642738fca9b8b3d23c8b7&verbose=true&timezoneOffset=0&q=');
    
    bot.recognizer(recognizer);
	
	bot.dialog('WelcomeIntents', function (session, args) {
		if (!language(session)) {
            session.send("WelcomeIntent intent found");
		}
    }).triggerAction({
        matches: 'WelcomeIntents'
    });
	
	bot.dialog('Currency', function (session, args) {
        if (!language(session)) {
           // Pulls out the food entity from the session if it exists
            var currencyValue = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency1');

            // Checks if the for entity was found
            if (currencyValue) {
                session.send('testing in %s...', currencyValue.entity);
                currency.displayCurrencyCards(session);

            } else {
                session.send("fuck my life");
            }
		}
    }).triggerAction({
        matches: 'Currency'
    });
		
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
