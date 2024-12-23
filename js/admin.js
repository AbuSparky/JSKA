import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";
import {
  getDatabase,
  ref as dbRef,
  set,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { firebaseConfig } from "./firebase.config.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

const uploadButton = document.getElementById("uploadButton");
const achievementUploadButton = document.getElementById(
  "achievementUploadButton"
);
const memberUploadbutton = document.getElementById("memberUploadButton");
const blackbeltUploadbutton = document.getElementById("blackbeltUploadButton");


const fileInput = document.getElementById("imageInput");
const textInput = document.getElementById("textInput");
const eventsImageContainer = document.getElementById("eventsImageContainer");
const achievementsImageContainer = document.getElementById(
  "achievementsImageContainer"
);
const membersImageContainer = document.getElementById(
  "membersImageContainer"
);
const blackbeltsImageContainer = document.getElementById(
  "blackbeltsImageContainer"
);

// Generic Upload Image Function
function uploadImage(folderName, container) {
  const file = fileInput.files[0];
  const imageText = textInput.value.trim();

  if (!file) {
    alert("Please select an image to upload");
    return;
  }

  const storageRef = ref(storage, `${folderName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percentage =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${percentage}% done`);
    },
    (error) => console.error("Upload failed:", error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const imageUrlRef = push(dbRef(database, folderName));
        set(imageUrlRef, {
          name: file.name,
          url: downloadURL,
          text: imageText,
          key: imageUrlRef.key,
        });

        alert("Image uploaded successfully!");
        displayImages(folderName, container);
      });
    }
  );
}

// Display Images and Add Delete Button
function displayImages(folderName, container) {
  container.innerHTML = "";

  const imagesRef = dbRef(database, folderName);
  onValue(imagesRef, (snapshot) => {
    container.innerHTML = ""; // Clear container before displaying images
    snapshot.forEach((childSnapshot) => {
      const imageData = childSnapshot.val();
      const imageWrapper = document.createElement("div");
      imageWrapper.style.display = "inline-block";
      imageWrapper.style.position = "relative";
      imageWrapper.style.margin = "10px";

      const imgElement = document.createElement("img");
      imgElement.src = imageData.url;
      imgElement.alt = imageData.name;
      imgElement.style.width = "200px";
      imgElement.style.display = "block";

      const textElement = document.createElement("p");
      textElement.textContent = imageData.text || "No description provided";
      textElement.style.textAlign = "center";
      textElement.style.fontWeight = "bold";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.position = "absolute";
      deleteButton.style.top = "10px";
      deleteButton.style.right = "10px";
      deleteButton.style.backgroundColor = "red";
      deleteButton.style.color = "white";
      deleteButton.style.border = "none";
      deleteButton.style.padding = "5px 10px";
      deleteButton.style.cursor = "pointer";

      deleteButton.addEventListener("click", () =>
        deleteImage(folderName, imageData, container)
      );

      imageWrapper.appendChild(imgElement);
      imageWrapper.appendChild(textElement);
      imageWrapper.appendChild(deleteButton);
      container.appendChild(imageWrapper);
    });
  });
}

// Delete Image Function
function deleteImage(folderName, imageData, container) {
  const storageRef = ref(storage, `${folderName}/${imageData.name}`);
  deleteObject(storageRef)
    .then(() => {
      console.log("Image deleted from storage");
      const imageRef = dbRef(database, `${folderName}/${imageData.key}`);
      remove(imageRef)
        .then(() => {
          console.log("Image deleted from database");
          displayImages(folderName, container);
        })
        .catch((error) =>
          console.error("Failed to delete image from database:", error)
        );
    })
    .catch((error) =>
      console.error("Failed to delete image from storage:", error)
    );
}

// Event Listeners
uploadButton.addEventListener("click", () =>
  uploadImage("eventsfolder", eventsImageContainer)
);
achievementUploadButton.addEventListener("click", () =>
  uploadImage("achievementfolder", achievementsImageContainer)
);
memberUploadbutton.addEventListener("click",()=>{
  uploadImage("membersfolder",membersImageContainer)
})
blackbeltUploadbutton.addEventListener("click",()=>{
  uploadImage("blackbeltsfolder",blackbeltsImageContainer)
})

// Call displayImages on page load
displayImages("eventsfolder", eventsImageContainer);
displayImages("achievementfolder", achievementsImageContainer);
displayImages("membersfolder", membersImageContainer);
displayImages("blackbeltsfolder", blackbeltsImageContainer);
