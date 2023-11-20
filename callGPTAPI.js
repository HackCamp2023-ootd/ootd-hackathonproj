// // const { Configuration, OpenAIApi } = require("openai");

// const{OpenAI} = require("openai");

// // const openai = new OpenAI({
// //      apiKey: "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" // This is also the default, can be omitted
// // });

// const openai = new OpenAI({
//     apiKey: "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" // This is also the default, can be omitted
// });


// const fs = require('fs');
// const readline = require('readline');

// let user_promt = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

const getClothesData = () => {
    const fileContent = fs.readFileSync('clothes.json', 'utf8'); 
    return JSON.parse(fileContent);
};

// const runPrompt = async (mood, clothesData) => {
    
//     // const data = getClothesData();   
//     const API_prompt = `
//     I need you to look at my clothes in the following json file 
//     where the JSON format is {
//         "ID": "unique_identifier",
//         "Description": "description of clothe"
//     }: ${JSON.stringify(clothesData)}
//     and make me an outfit consisting of a top and a bottom based on how I'm feeling: ${mood}. 
//     Return response in a parsable JSON format`;
//     try{
//         const response = await openai.completions.create({
//             model: "text-davinci-002",
//             prompt: API_prompt,
//             max_tokens: 150,
//             stop: '\n',
//             temperature: 0.5,
//         });
//         return response.data.choices[0].text;
//     } catch (error) {
//         console.error("Error in OpenAI API call:", error);
//         return null;
//     }
    
// };

// // const parsableJSONresponse = response.data.choices[0].text;
// // const parsedResponse = JSON.parse(parsableJSONresponse);

// // console.log("ID: ", parsedResponse.ID);
// // console.log("Decription: ", parsedResponse.Description);
// const main = async () => {
//     const clothesData = getClothesData();

//     user_promt.question('How are you feeling today? ', async (mood) => {
//         const outfitSuggestion = await runPrompt(mood, clothesData);
//         console.log("Outfit Suggestion:", JSON.parse(outfitSuggestion).Description);

//         user_promt.close();
//     });
// };


// main();
const wardrobe = getClothesData();
const postUrl = "https://api-v2.agenthub.dev/remote_start_pipeline";
const postHeaders = {
  "Content-Type": "application/json",
  "x-auth-key": "KP5m6a1PrXSPRbbKza6BsOWxmCE3"
};

const postData = {
  "user_id": "KP5m6a1PrXSPRbbKza6BsOWxmCE3",
  "saved_item_id": "tJJwN1e4ZecwoSqXL6wAhk",
  "api_key": "e92bd30ac6d4434888cd5c3086d2cd52",
  "pipeline_inputs": [{input_name: 'wardrobe', value: wardrobe}]
};

function appendRunIdToBaseUrl(url) {
    // Parse the URL to get the query parameters
    const parsedUrl = new URL(url);
    const queryParams = new URLSearchParams(parsedUrl.search);

    // Extract the run_id
    const runId = queryParams.get('run_id');

    // Check if run_id is present
    if (!runId) {
        console.error('No run_id found in the URL');
        return null;
    }

    // Construct the new URL
    const baseUrl = 'https://api-v2.agenthub.dev/plrun?run_id=';
    const newUrl = baseUrl + runId;

    return newUrl;
}

function createGetUrl(responseData) {
    console.log(responseData)
    const getUrl = appendRunIdToBaseUrl(responseData); // Adjust according to the actual response structure
    
    if (!getUrl) {
        console.error('No run_id found in the response');
        return null;
    }

    return getUrl;
}

function checkPipelineStatus(getUrl, headers) {
    fetch(getUrl, {
      method: 'GET',
      headers: headers
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.state !== 'DONE') {
            setTimeout(() => checkPipelineStatus(getUrl, headers), 5000);
        }
        else{
            console.log(JSON.parse(data.outputs.response).description);
        }
    })
    .catch(error => console.error('Error:', error));
}

fetch(postUrl, {
  method: 'POST',
  headers: postHeaders,
  body: JSON.stringify(postData)
})
.then(response => response.json())
.then(data => {
    const getUrl = createGetUrl(data);
    if (getUrl) {
        const getHeaders = { 'x-auth-key': 'KP5m6a1PrXSPRbbKza6BsOWxmCE3' }; // Adjust the key as necessary
        checkPipelineStatus(getUrl, getHeaders);
    }
})
.catch(error => console.error('Error:', error));