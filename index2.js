const express = require('express');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const app = express();
const { checkError } = require('./multerLogic')

const port = 3000

process.env.GOOGLE_APPLICATION_CREDENTIALS = './creds.json'

app.use(express.json())

async function quickstart(req, res) {
    try {
        // Creates a client
        const client = new vision.ImageAnnotatorClient();
        const imageDesc = await checkError(req, res)
        console.log(imageDesc)
        // Performs text detection on the local file
        const [result] = await client.textDetection(imageDesc.path);
        const detections = result.textAnnotations;
        const [ text, ...others ] = detections
        let str = text.description.replace(/\s+/g, ' ').trim();
        console.log(`${ str }`);
        res.send(`${ str }`)
    } catch (error) {
        console.log(error)
    }

}

app.get('/detectText', async(req, res) => {
    res.send('welcome to the homepage')
})

app.post('/detectText', quickstart)

//listen on port
app.listen(port, () => {
    console.log(`app is listening on ${port}`)
})