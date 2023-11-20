const axios = require('axios');

const url = "https://api-v2.agenthub.dev/remote_start_pipeline";

const headers = { 
  "Content-Type": "application/json",
  "x-auth-key": "unsioVbanndVmuFPEfk3rME87Jl2"
};

const data = { 
  "user_id": "unsioVbanndVmuFPEfk3rME87Jl2", 
  "saved_item_id": "fyxUwM1pK3NzKDKxNUmR2P",
  "api_key": "32673223559d4ad2a8c22594d6c9e7a2",
  "openai_token": "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"
};

function makeApiCall() {
  axios.post(url, data, { headers: headers })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error making the API call', error);
    });
}