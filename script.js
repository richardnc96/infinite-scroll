const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//we use let because the value of photosArray is going to change every time we make a request
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = '2BwL2NqhkNdZnGoJNSo3ySluTYc1h_XlmaRP_oCMVp4'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }
  

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function for Set Attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links & Photos, Add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each objects in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash - blank a element
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer element
        // foreach photo hanya generate <a> dan <img> di dalamnya, kemudian mereka dimasukkan ke dalam div imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos fro Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad){
            updateAPIURLWithNewCount(30);
        }
    } catch (error){
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        initialLoad = false;
    }
});

//On Load;
getPhotos();