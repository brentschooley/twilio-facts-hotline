exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();

  twiml.gather({
    input: 'speech',
    timeout: 3,
    hints: 'cat, numbers, chuck norris',
    action: '/fact-command'
  }).say('Welcome to the Twilio Facts hotline. Please say cat for cat facts, number for trivia about numbers, or chuck norris for a random chunk of chuck norris knowledge.');

  callback(null, twiml);
};
