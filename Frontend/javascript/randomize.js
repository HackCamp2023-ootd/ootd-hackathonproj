document.addEventListener('DOMContentLoaded', () => {
    const randomizeButton1 = document.getElementById('randomizeButton1');
    randomizeButton1.addEventListener('click', () => randomizeGarment1());

    const randomizeButton2 = document.getElementById('randomizeButton2');
    randomizeButton2.addEventListener('click', () => randomizeGarment2());

    const randomizeButton3 = document.getElementById('randomizeButton3');
    randomizeButton3.addEventListener('click', () => randomizeGarment3());
});

const garments = [{link:"link1", cat:"layer", desc:"desc1"}, {link:"link2", cat:"top", desc:"desc3"}, {link:"link3", cat:"layer", desc:"desc2"}, {link: "link4", cat: "bottom", desc:"desc5"}];
const garments2 = [];

function randomizeGarment1() {
    console.log("rand1");
    // fetch('http://localhost:3001/api/garments') // Replace with your actual API endpoint
    //     .then(response => response.json())
    //     .then(garments => {
            const layers = garments.filter(garment => garment.cat === 'layer'); // Assuming 'type' is the attribute
            // layers.sort((a, b) => a.sortAttribute - b.sortAttribute); // Replace 'sortAttribute' with the actual field

            if (layers.length > 0) {
                const randomIndex = Math.floor(Math.random() * layers.length);
                displayGarmentImage1(layers[randomIndex].imageUrl); // Assuming 'imageUrl' is the field for the image URL
            }
    //     })
    //     .catch(error => console.error('Error fetching garments:', error));
    
}

function displayGarmentImage1(imageUrl) {
    imageUrl = 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png';
    const garmentImage1 = document.getElementById('garmentImage1');
    garmentImage1.src = imageUrl;
    garmentImage1.style.display = 'block'; // Show the image
}

function randomizeGarment2() {
    console.log("rand2");
    // fetch('http://localhost:3001/api/garments') // Replace with your actual API endpoint
    //     .then(response => response.json())
    //     .then(garments => {
            const tops = garments.filter(garment => garment.cat === 'top'); // Assuming 'type' is the attribute
            // layers.sort((a, b) => a.sortAttribute - b.sortAttribute); // Replace 'sortAttribute' with the actual field

            if (tops.length > 0) {
                const randomIndex = Math.floor(Math.random() * tops.length);
                displayGarmentImage2(tops[randomIndex].imageUrl); // Assuming 'imageUrl' is the field for the image URL
            }
    //     })
    //     .catch(error => console.error('Error fetching garments:', error));
    
}

function displayGarmentImage2() {
    imageUrl = 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png';
    const garmentImage2 = document.getElementById('garmentImage2');
    garmentImage2.src = imageUrl;
    garmentImage2.style.display = 'block'; // Show the image
}

function randomizeGarment3() {
    console.log("rand3");
    // fetch('http://localhost:3001/api/garments') // Replace with your actual API endpoint
    //     .then(response => response.json())
    //     .then(garments => {
            const bottoms = garments.filter(garment => garment.cat === 'bottom'); // Assuming 'type' is the attribute
            // layers.sort((a, b) => a.sortAttribute - b.sortAttribute); // Replace 'sortAttribute' with the actual field

            if (bottoms.length > 0) {
                const randomIndex = Math.floor(Math.random() * bottoms.length);
                displayGarmentImage3(bottoms[randomIndex].imageUrl); // Assuming 'imageUrl' is the field for the image URL
            }
    //     })
    //     .catch(error => console.error('Error fetching garments:', error));
    
}

function displayGarmentImage3(imageUrl) {
    imageUrl = 'https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png';
    const garmentImage3 = document.getElementById('garmentImage3');
    garmentImage3.src = imageUrl;
    garmentImage3.style.display = 'block'; // Show the image
}