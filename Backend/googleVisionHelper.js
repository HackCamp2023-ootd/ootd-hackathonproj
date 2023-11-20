const fetch = require('node-fetch');

async function analyzeImageWithGoogleVision(imageData) {
    const apiKey = process.env.GOOGLE_VISION_API_KEY; // Ensure the API key is correctly set in your environment variables
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    imageData = "(data from artworks-000552132495-300ta7-t500x500.jpg)";

    const requestBody = {
        requests: [
            {
                features: [
                    { type: 'LANDMARK_DETECTION', maxResults: 50 },
                    { type: 'FACE_DETECTION', maxResults: 50 },
                    { type: 'LABEL_DETECTION', maxResults: 50 },
                    { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 50, model: 'builtin/latest' },
                    { type: 'SAFE_SEARCH_DETECTION', maxResults: 50 },
                    { type: 'IMAGE_PROPERTIES', maxResults: 50 },
                    { type: 'CROP_HINTS', maxResults: 50 }
                ],
                image: { content: imageData }, // imageData should be a base64-encoded string without headers
                imageContext: {
                    cropHintsParams: { aspectRatios: [0.8, 1, 1.2] }
                }
            }
        ]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Google Vision API request failed with status ${response.status}`);
        }

        const result = await response.json();
        return result.responses[0].labelAnnotations[0].description;
    } catch (error) {
        console.error(`Error during Google Vision Analysis: ${error.message}`);
        throw error;
    }
}

module.exports = analyzeImageWithGoogleVision;
