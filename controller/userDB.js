var rest = require('./restclient');
var url = 'http://currencybotjsy.azurewebsites.net/tables/User_Table';

exports.showBaseCurrency = function getBaseCurrency(session, username){
    rest.getBaseCurrency(url, session, username, handleCurrency)
};
exports.checkBaseCurrency = function getBaseCurrency(session, username){
    rest.getBaseCurrency(url, session, username, handleCurrency)
};

function handleCurrency(message, session, username) {
    var userInfo = JSON.parse(message);
    var currency = [];
    for (var index in userInfo) {
        var usernameReceived = userInfo[index].username;
        var userCurrency = userInfo[index].Basecurrency;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
                currency.push(userCurrency);
        }        
    
    }
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your Base Currency is: %s", username, currency);                
    
}



exports.displayFavouriteFood = function getFavouriteFood(session, username){
    rest.getFavouriteFood(url, session, username, handleFavouriteFoodResponse)
};

exports.sendFavouriteFood = function postFavouriteFood(session, username, favouriteFood){
	
    rest.postFavouriteFood(url, username, favouriteFood);
};

exports.deleteFavouriteFood = function deleteFavouriteFood(session,username,favouriteFood){

    rest.getFavouriteFood(url,session, username,function(message,session,username){
     var   allFoods = JSON.parse(message);

        for(var i in allFoods) {

            if (allFoods[i].favouriteFood === favouriteFood && allFoods[i].username === username) {

                console.log(allFoods[i]);

                rest.deleteFavouriteFood(url,session,username,favouriteFood, allFoods[i].id ,handleDeletedFoodResponse)

            }
        }


    });


};

function handleDeletedFoodResponse(body,session,username, favouriteFood) {
	console.log('done');
}
