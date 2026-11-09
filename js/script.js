const apiKey = "3RdYdw8wP5seQxxLUljiHSIgZTbgQUiC";

// Grab the elements we need from the page
const gifContainer = document.querySelector("#gif-container");
const searchInput = document.querySelector("#search-input");
const fetchButton = document.querySelector("button"); // change to your button's id if it has one, e.g. "#fetch-gif-btn"
 
// Send the request to Giphy and return an array of image URLs
async function getGifs(searchTerm) {
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`;
 
  const response = await fetch(endpoint);
  const data = await response.json();
 
  const images = [];
  for (let i = 0; i < data.data.length; i++) {
    images.push(data.data[i].images.original.url);
  }
 
  console.log(images); // preview the URLs in the browser console
  return images;
}
 
// When the button is clicked, fetch GIFs and show them on the page
fetchButton.addEventListener("click", async function () {
  const searchTerm = searchInput.value.trim() || "funny cats"; // default if the box is empty
 
  gifContainer.innerHTML = ""; // clear old results
 
  try {
    const images = await getGifs(searchTerm);
 
    if (images.length === 0) {
      gifContainer.innerHTML = `<p>No GIFs found for "${searchTerm}". Try something else!</p>`;
      return;
    }
 
    for (let i = 0; i < images.length; i++) {
      gifContainer.innerHTML += `<img src="${images[i]}" class="col-3 mb-3" alt="${searchTerm} GIF">`;
    }
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    gifContainer.innerHTML = `<p>Something went wrong. Check your API key and try again.</p>`;
  }
});