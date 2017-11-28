var rest = require('./restclient');
var luis = require('./luis');
var url = 'http://currencybotjsy.azurewebsites.net/tables/User_Table';


exports.getBaseCurrency = function tossUserInfo(session, username){
    rest.tossUserInfo(url, session, username, getBaseCurrency)
};

exports.changeCurrency = function changeUserInfo(session, username, newcurrency){
    rest.changeUserInfo(url, session, username, newcurrency, changeCurrency)
};

exports.deleteUser = function tossUserInfo(session, username){
    rest.tossUserInfo(url, session, username, deleteUser)
};

function getBaseCurrency(message, session, username) {
    var userInfo = JSON.parse(message);
    var newCurrency;
    var newUser;
    for (var index in userInfo) {
        var usernameReceived = userInfo[index].username;
        var userCurrency = userInfo[index].Basecurrency;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            newCurrency = userCurrency;
            newUser = usernameReceived;
        }        
    
    }
    //create new user if this user is not exist in DB
    if(newCurrency == null || newUser == null) {
        newCurrency ="NZD";//defualt value.
        newUser = username.toLowerCase();
        rest.postUser(url, newUser, newCurrency);
    }
    //send fianl data to luis to display.
    luis.getCurrency(session, newUser, newCurrency);   
    
}

function changeCurrency(message, session, username, newcurrency) {
    var userInfo = JSON.parse(message);
    for (var index in userInfo) {
        var usernameReceived = userInfo[index].username;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) { 
            //delete current user and create newuser with newCurrency
           rest.deleteUser(url,session,username, userInfo[index].id); 
           rest.postUser(url, username, newcurrency);         
        }        
    
    }
    //send fianl data to luis to display.
    luis.getCurrency(session, username, newcurrency);   
    
}

function deleteUser(message, session, username) {
    var userInfo = JSON.parse(message);
    for (var index in userInfo) {
        var usernameReceived = userInfo[index].username;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) { 
            //delete current user and create newuser with newCurrency
            rest.deleteUser(url,session,username, userInfo[index].id);          
        }        
    
    }
    //send fianl data to luis to display.
    session.send("Your information has been deleted, Thank you for using us, "+username);  
    
}
