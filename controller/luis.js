var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e05a31f2-2201-4527-96af-f9811ab3deeb?subscription-key=b77ec5414a1642738fca9b8b3d23c8b7&verbose=true&timezoneOffset=0&q=');
    
    bot.recognizer(recognizer);
	
	bot.dialog('WelcomeIntents', function (session, args) {
            session.send("WelcomeIntent intent found");
    }).triggerAction({
        matches: 'WelcomeIntents'
    });
	
	bot.dialog('CurrencyIntents', function (session, args) {


                session.send('Looking for restaurants which sell %s...', foodEntity.entity);
                restaurant.displayRestaurantCards(foodEntity.entity, "auckland", session);
    }).triggerAction({
        matches: 'WantFood'
    });
}