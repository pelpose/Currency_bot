var rest = require('../controller/restclient');
var url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/782553fc-bf6a-452a-9f84-849d5d63e7a6/generateAnswer';

exports.tossToQna = function sendQuestion(session, question){
    rest.sendQuestion(url, session, question, tossToQna)
};

function tossToQna(body, session, question) {
    session.send(body.answers[0].answer);
};