import { database } from './firebase.config.js';
import { ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const carouselInner = document.querySelector('#carouselExample .carousel-inner');

window.addEventListener('DOMContentLoaded', displayImages);

function displayImages() {
    console.log('DOM fully loaded and parsed. Displaying images...');
    carouselInner.innerHTML = ''; // Clear any existing images in the carousel

    const imagesRef = dbRef(database, 'slidepostersfolder'); 
    onValue(imagesRef, (snapshot) => {
        let isFirstItem = true; // Track the first image to set it as active

        snapshot.forEach((childSnapshot) => {
            const imageData = childSnapshot.val();
            if (imageData && imageData.url) {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                
                if (isFirstItem) {
                    carouselItem.classList.add('active'); // Make the first image active
                    isFirstItem = false;
                }

                // Create the image element
                const imgElement = document.createElement('img');
                imgElement.src = imageData.url;
                imgElement.alt = imageData.name || 'Event Image';
                imgElement.classList.add('d-block', 'w-100'); // Add Bootstrap classes for styling

                // Create the caption div
                const captionDiv = document.createElement('div');
                captionDiv.classList.add('carousel-caption', 'bottom-left');

                // Add the text element
                const textElement = document.createElement('h2');
                textElement.textContent = imageData.text || 'Default Text'; // Fallback text
                textElement.classList.add('image-description');

                // Append the text element to the caption div
                captionDiv.appendChild(textElement);

                // Append the image and caption to the carousel item
                carouselItem.appendChild(imgElement);
                carouselItem.appendChild(captionDiv);

                // Append the carousel item to the carousel inner
                carouselInner.appendChild(carouselItem);
            } else {
                console.error('Invalid image data:', imageData);
            }
        });
    }, (error) => {
        console.error('Failed to load images from database:', error);
    });
}
