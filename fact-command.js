exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();

  const command = event.SpeechResult.toLowerCase();

  switch(command) {
    case 'cat':
      twiml.say('Fetching your cat fact.');
      twiml.redirect('/cat-facts');
      break;
    case 'number':
      twiml.say('Fetching your number fact.');
      twiml.redirect('/number-facts');
      break;
    case 'chuck norris':
      twiml.say('Fetching your chuck norris fact.');
      twiml.redirect('/chuck-facts');
      break;
    default:
      twiml.say(`Sorry but I do not recognize ${command} as a valid command. Try again.`);
      twiml.redirect('/facts');
      break;
  }

  callback(null, twiml);
};
