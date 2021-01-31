async function analyzeSentimentOfText(text) {
    const language = require('@google-cloud/language');
  
    const client = new language.LanguageServiceClient();
  
    const text = 'Journal entry';
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    const [result] = await client.analyzeSentiment({document});
  
    const sentiment = result.documentSentiment;
    console.log('Document sentiment:');
    console.log(`  Score: ${sentiment.score}`);
    console.log(`  Magnitude: ${sentiment.magnitude}`);
  
    const sentences = result.sentences;
    sentences.forEach(sentence => {
      console.log(`Sentence: ${sentence.text.content}`);
      console.log(`  Score: ${sentence.sentiment.score}`);
      console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
    });
  
    // [END language_sentiment_text]
  }