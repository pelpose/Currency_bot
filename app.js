var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/luis');

// Setup for Restify Server
var resServer = restify.createServer();
resServer.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', resServer.name, resServer.url);
});

// Create chat connector 
var connector = new builder.ChatConnector({
    appId: "8c63987e-5bbb-4597-b05c-5d7b1b7b5411",
    appPassword: "zzviaZPNF15084;+guPWR{("
});

// Listen messages from the user 
resServer.post('/api/messages', connector.listen());

// Sending response to the user
var bot = new builder.UniversalBot(connector, function (session) {

    session.send('Sorry, I dont understand \'%s\', Please type \'help\' or \'Qna\' for a help.', session.message.text);
}); 	
// This line will call the function in your LuisDialog.js file
luis.startDialog(bot);


