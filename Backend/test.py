import requests

url = "https://api-v2.agenthub.dev/remote_start_pipeline"

headers = { 
  "Content-Type": "application/json",
  "x-auth-key": "unsioVbanndVmuFPEfk3rME87Jl2"
}

data = { 
  "user_id": "unsioVbanndVmuFPEfk3rME87Jl2", 
  "saved_item_id": "fyxUwM1pK3NzKDKxNUmR2P",
  "api_key": "32673223559d4ad2a8c22594d6c9e7a2",
  "openai_token": "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"
}

response = requests.post(url, headers=headers, json=data)