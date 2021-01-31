// SoX must be installed and be available in $PATH

function main(
    encoding = 'LINEAR16',
    sampleRateHertz = 16000,
    languageCode = 'en-US'
  ) {
    // [START micStreamRecognize]
    const recorder = require('node-record-lpcm16');
  
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
  
    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
    };
  
    const request = {
      config,
      interimResults: false,
    };
  
    // Creates a client
    const client = new speech.SpeechClient();
  
    // Create a recognize stream
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', data =>
        process.stdout.write(
          data.results[0] && data.results[0].alternatives[0]
            ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
            : '\n\nReached transcription time limit, press Ctrl+C\n'
        )
      );
  
    // Start recording and send the microphone input to the Speech API
    recorder
      .record({
        sampleRateHertz: sampleRateHertz,
        threshold: 0,
        recordProgram: 'rec', 
        silence: '5.0', //seconds of silence before ending
      })
      .stream()
      .on('error', console.error)
      .pipe(recognizeStream);
  
    console.log('Listening, press Ctrl+C to stop.');
    // [END micStreamRecognize]
  }
  
  process.on('unhandledRejection', err => {
    console.error(err.message);
    process.exitCode = 1;
  });
  
  main(...process.argv.slice(2));