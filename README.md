# OOTD
## Your personal stylist, one tap away.

### Inspiration
OOTD is a smart closet that allows you to create a daily outfit based on your pre-existing closet. A user simply uploads pictures of all their clothing items and Google Vision AI looks at the image and tags it accordingly. Next, we randomly select a layer, top and bottom based on your existing closet.

### What it does
We created an application that lets user upload their specific clothing and get unique outfit ideas. If users are stuck, they can get a fresh outfit ideas based on our generative AI functionality that searches the web for the latest fashion trends and generates a fresh outfit idea.

### How we built it
We started by building a basic app that allows the user to upload pictures. We then added our backend and made calls to APIs such as Google Vision to scan the image and DynamoDB to store the files. After that, we used AgentHub to create a pipeline to generate outfit inspiration using DALLE.

### Challenges we ran into
Connecting the front and backend was a challenge, as well as correctly making API calls, as we were all somewhat unexperienced with APIs.

### Accomplishments that we're proud of
We are very proud that we were able to connect everything and have all the APIs work together. We are also proud we were able to get AgentHUB working since it was really fun to use.

### What we learned
We all learned a lot about API usage, AgentHUB, storing in databases, and even just basic web design. All of our team members did a lot of learning in the last 12 hours and it was really fun to get everything working.

### What's next for OOTD
Our next step would be to change the randomizer to use AI to pick a good looking outfit instead of it being random, or being able to look at the weather out and base an outfit on that.
