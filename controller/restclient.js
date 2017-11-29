var request = require('request');


exports.getCurrency = function getData(url, session, currency, baseCurrency, callback){

    request.get(url, function processGetRequest(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, currency, baseCurrency, session);
        }
    });
};

exports.tossUserInfo = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};

exports.changeUserInfo = function getData(url, session, username, newcurrency, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username, newcurrency);
        }
    });
};

//add new User in DB
exports.postUser = function getData(url, newUser, currency){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "username" : newUser,
            "Basecurrency" : currency
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};

exports.deleteUser = function deleteData(url,session, username, id){
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
        }else {
            console.log(url);
        }
    })

};

exports.sendQuestion = function getData(url, session, qna, callback){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': 'd7fd3cc7e62f42d1b1eb4598f5d1570a',
            'Content-Type':'application/json'
        },
        json: {
            "question" : qna
        }
      };
  
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body, session, qna);
        }
        else{
            console.log(error);
        }
      });
  };