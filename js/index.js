import { database } from './firebase.config.js';
import { ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// const loadImagesButton = document.getElementById('loadImagesButton');
const imageContainer = document.getElementById('imageContainer');

window.addEventListener('DOMContentLoaded', displayImages);

function displayImages() {
    imageContainer.innerHTML = ''; 

    const imagesRef = dbRef(database, 'indexpostersfolder'); 
    onValue(imagesRef, (snapshot) => {
        imageContainer.innerHTML = ''; 
        
        snapshot.forEach((childSnapshot) => {
            const imageData = childSnapshot.val();
            if (imageData && imageData.url) {
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add('image-wrapper');

                const imgElement = document.createElement('img');
                imgElement.src = imageData.url;
                imgElement.alt = imageData.name || 'Event Image';
                imgElement.style.width = '350px'; 
                imgElement.classList.add('event-image');

                const textElement = document.createElement('p');
                textElement.textContent = imageData.text || '';
                textElement.classList.add('image-description');

                imageWrapper.appendChild(imgElement);
                imageWrapper.appendChild(textElement);

                imageContainer.appendChild(imageWrapper);
            } else {
                console.error('Invalid image data:', imageData);
            }
        });
    }, (error) => {
        console.error('Failed to load images from database:', error);
    });

    // loadImagesButton.style.display = 'none'; // Hide the button after loading images
}