exports.handler = function(context, event, callback) {
  const got = require('got');
  const twiml = new Twilio.twiml.VoiceResponse();

  if(event.SpeechResult == 'menu') {
    twiml.redirect('/facts');
    callback(null, twiml);
    return;
  }

  got('https://catfact.ninja/fact').then(response => {
    const catFact = JSON.parse(response.body);
    twiml.gather({
      input: 'speech',
      hints: 'menu',
      timeout: 3
    }).say(`Here's your cat fact: ${catFact.fact} ... Say more cat facts for more cat facts or menu for main menu.`);
    callback(null, twiml);
  }).catch(err => {
    twiml.say('There was an error fetching your fact. Going back to main menu.');
    twiml.redirect('/facts');
    callback(null, twiml);
  });
};
