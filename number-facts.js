exports.handler = function(context, event, callback) {
  const got = require('got');
  const twiml = new Twilio.twiml.VoiceResponse();

  if(event.SpeechResult == 'menu') {
    twiml.redirect('/facts');
    callback(null, twiml);
    return;
  }

  got('http://numbersapi.com/random/trivia').then(response => {
        const numberFact = response.body;
        twiml.gather({
          input: 'speech',
          hints: 'number, numbers, more number facts, more numbers facts',
          timeout: 3
        }).say(`Here's your number fact: ${numberFact} ... Say more number facts for more number trivia or menu for main menu.`)
        callback(null, twiml);
      }).catch(err => {
        twiml.say('There was an error fetching your fact. Going back to main menu.');
    	twiml.redirect('/facts');
        callback(null, twiml);
      });
};
