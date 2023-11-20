// Get references to the file input and the image element
const fileInput = document.getElementById('fileInput');
const uploadedImage = document.getElementById('uploadedImage');
const itemCategorySelect = document.getElementById('itemCategory'); // Access the dropdown

let tags = [];
let tagString = "";
let link = "";
let selectedItemCategory = "";
let imageJSONobj = {};
let commaSeparatedStringArray = [];


// Helper Function to Call Google Vision API
function analyzeImageWithGoogleVision(imageData) {
    const apiKey = 'AIzaSyCxpTRpoep0JDpdck5CScU38H7H9XF7Qd8';
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestBody = {
        requests: [
            {
                image: {
                    content: imageData.split(',')[1] // Assuming imageData is a base64 string with a header
                },
                features: [
                    { type: 'LABEL_DETECTION', maxResults: 10 }
                ],
            },
        ],
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => {
            // console.log('Google Vision API Response:', data);
            // Process the response data as needed
            let labels = data.responses[0].labelAnnotations;
            let tagsArray = labels.map(label => label.description);
            tags = tagsArray.join(" ");

            // console.log("Tags: " + tags);

        })
        .catch(error => {
            console.error('Error calling Google Vision API:', error);
        });



}

function uploadToS3() {
    // Replace with your AWS configuration
    AWS.config.update({
        accessKeyId: 'AKIASJDXDX2NSGH2VKB7',
        secretAccessKey: 'cxwtKJyfK+rfBJkYTAXb7KN9WqjSPCJxtinhI7c/',
        region: 'us-east-1'
    });


    const fileS3 = fileInput.files[0];

    if (!fileS3) {
        alert('Please select a file to upload.');
        return;
    }

    const s3 = new AWS.S3();
    const bucketName = 'smart-closet-ootd-hackcamp';
    const key = `uploads/${Date.now()}_${fileS3.name}`;

    s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: fileS3,
        ACL: 'public-read' // Make the uploaded file public
    }, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
            alert('Error uploading file. Please try again later.');
        } else {
            // console.log('File uploaded to S3 successfully:', data);
            // alert('File uploaded successfully! You can access it at: ' + data.Location);
            tagString = data.Location + "," + itemCategorySelect.value + "," + tags; // This adds the link to the string
            // console.log("Here is the tag string : " + tagString);
            insertIntoDynamoDB(tagString);
        }
    });

}

function insertIntoDynamoDB(tagParam) {

    AWS.config.update({
        accessKeyId: 'AKIASJDXDX2NSGH2VKB7',
        secretAccessKey: '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',
        region: 'us-east-1'
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    // Splitting the tagParam string by commas
    const tagValues = tagParam.split(',');
    if (tagValues.length < 2) {
        console.error("Invalid tagParam format. Expected at least two values separated by a comma.");
        return;
    }

    // Constructing the item object for DynamoDB
    const item = {
        link: tagValues[0].trim(), // First value as 'link'
        type: tagValues[1].trim(), // Second value as 'type'
        attributes: tagValues.slice(2).map(value => value.trim()).join(',') // Third value as 'attributes' as a comma-separated string
    };
    console.log("Item: " + item.link + " " + item.type + " " + item.attributes);

    var params = {
        TableName: "smart_closet_ootd",
        Item: item
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

    console.log(getItemsFromDynamoDB());

};

async function getItemsFromDynamoDB() {

    AWS.config.update({
        accessKeyId: 'AKIASJDXDX2NSGH2VKB7',
        secretAccessKey: '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',
        region: 'us-east-1'
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    try {
        const params = {
            TableName: 'smart_closet_ootd'
        };

        const result = await docClient.scan(params).promise();

        if (result.Items && result.Items.length > 0) {
            const itemsArray = result.Items.map(item => {
                return `${item.link}, ${item.type}, ${item.attributes}`;
            });

            const commaSeparatedString = itemsArray.join('\n');
            return itemsArray;

        } else {
            console.log('No items found in DynamoDB.');
        }
    } catch (error) {
        console.error('Error retrieving items from DynamoDB:', error);
        throw error;
    }
}


// Function to process the image
function processImage(file) {
    // Convert file to Base64 for the APIs
    const reader = new FileReader();
    reader.onload = function (event) {
        const imageData = event.target.result;

        // Call the helper functions
        analyzeImageWithGoogleVision(imageData);
        uploadToS3(imageData);

        // Update UI
        uploadedImage.src = imageData; // Display the uploaded image
    };
    reader.readAsDataURL(file);
}

// Event listener for file input
fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        processImage(selectedFile);
    }
});

fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    const selectedItemCategory = itemCategorySelect.value; // Get the selected category

    if (selectedFile) {
        // Process the selected file

        // You can use the selectedItemCategory value here to include it in the metadata upload
        itemCategory = selectedItemCategory;
        console.log('Selected Category:', selectedItemCategory);


        // For example, if you're using a function to upload metadata:
        // uploadMetadata(selectedFile, selectedItemCategory);
    }
});
