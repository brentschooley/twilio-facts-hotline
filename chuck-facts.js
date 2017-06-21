exports.handler = function(context, event, callback) {
  const got = require('got');
  const twiml = new Twilio.twiml.VoiceResponse();

  if(event.SpeechResult == 'menu') {
    twiml.redirect('/facts');
    callback(null, twiml);
    return;
  }

  got('http://api.icndb.com/jokes/random').then(response => {
        const chuckFact = JSON.parse(response.body);
        console.log(chuckFact);
        twiml.gather({
          input: 'speech',
          hints: 'chuck norris, more chuck facts, more chuck norris facts',
          timeout: 3
        }).say(`Here's your Chuck Norris fact: ${chuckFact.value.joke} ... Say chuck norris for more chunks of Chuck Norris knowledge or menu for main menu.`)
        callback(null, twiml);
      }).catch(err => {
        twiml.say('There was an error fetching your fact. Going back to main menu.');
    twiml.redirect('/facts');
        callback(null, twiml);
      });
};
