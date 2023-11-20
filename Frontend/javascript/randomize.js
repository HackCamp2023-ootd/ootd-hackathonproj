document.addEventListener('DOMContentLoaded', () => {
    const randomizeButton1 = document.getElementById('randomizeButton1');
    randomizeButton1.addEventListener('click', () => randomizeGarment('Layer'));

    const randomizeAllButton = document.getElementById('randomizeAllButton');

    randomizeAllButton.addEventListener('click', () => {
        randomizeGarment('Layer');
        randomizeGarment('Top');
        randomizeGarment('Bottom');
    });

    const randomizeButton2 = document.getElementById('randomizeButton2');
    randomizeButton2.addEventListener('click', () => randomizeGarment('Top'));

    const randomizeButton3 = document.getElementById('randomizeButton3');
    randomizeButton3.addEventListener('click', () => randomizeGarment('Bottom'));
});

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
        console.log('Result from DynamoDB:', result);

        if (result.Items && result.Items.length > 0) {
            // const itemsArray = result.Items.map(item => {
            //     return `${item.link}, ${item.type}, ${item.attributes}`;
            // });

            // const commaSeparatedString = itemsArray.join('\n');
        
            return result;

        } else {
            console.log('No items found in DynamoDB.');
        }
    } catch (error) {
        console.error('Error retrieving items from DynamoDB:', error);
        throw error;
    }
}


// Pick a Random Garment with a specific type of 'Layer'
async function randomizeGarment(typeParam) {
    try {
        const itemsResult = await getItemsFromDynamoDB();
        if (itemsResult && itemsResult.Items) {
            const layerItems = itemsResult.Items.filter(item => item.type === typeParam);
            if (layerItems.length > 0) {
                const randomIndex = Math.floor(Math.random() * layerItems.length);
                const randomLayerItem = layerItems[randomIndex];
                // Return the link of the random Layer Item
                console.log('Random Layer Item:', randomLayerItem.link);
                if (typeParam === 'Layer') {
                    displayGarmentImage1(randomLayerItem.link);
                } else if (typeParam === 'Top'){
                    displayGarmentImage2(randomLayerItem.link);
                } else if (typeParam === 'Bottom'){
                    displayGarmentImage3(randomLayerItem.link);
                }
            } else {
                console.log('No ' +  typeParam + " " + 'items found.');
                return null; // or appropriate default value
            }
        } else {
            console.log('No items found in result.');
            return null; // or appropriate default value
        }
    } catch (error) {
        console.error('Error in randomizeGarment1:', error);
        return null; // or appropriate error indication
    }
}


function displayGarmentImage1(imageUrl) {
    const garmentImage1 = document.getElementById('garmentImage1');
    garmentImage1.src = imageUrl;
    garmentImage1.style.display = 'block'; // Show the image
}



function displayGarmentImage2(imageUrl) {
    const garmentImage2 = document.getElementById('garmentImage2');
    garmentImage2.src = imageUrl;
    garmentImage2.style.display = 'block'; // Show the image
}


function displayGarmentImage3(imageUrl) {
    const garmentImage3 = document.getElementById('garmentImage3');
    garmentImage3.src = imageUrl;
    garmentImage3.style.display = 'block'; // Show the image
}