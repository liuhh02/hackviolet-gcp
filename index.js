const vision = require('@google-cloud/vision');
const credentials = require('./auth/creds.json');
const fs = require('fs');

const client = new vision.ImageAnnotatorClient({
    credentials
});

const fileName = './journal.jpg';

// Read a local image as a text document
async function quickstart() {
    try {
        const [result] = await client.documentTextDetection(fileName);
        const fullTextAnnotation = result.fullTextAnnotation;
        console.log(`Full text: ${fullTextAnnotation.text}`);
    } catch (error) {
        console.log(error)
    }
    
}

/* async function quickstart() {
    try {
        // Performs text detection on the local file
        const [result] = await client.textDetection(fileName);
        const detections = result.textAnnotations;
        const [ text, ...others ] = detections
        console.log(`Text: ${ text.description }`);
    } catch (error) {
        console.log(error)
    }

} */

quickstart();
