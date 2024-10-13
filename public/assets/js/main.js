console.log('test this');

// Function to fetch today's Astronomy Picture of the Day (APOD)
async function getPicture() {
    try {
        const url = "https://api.nasa.gov/planetary/apod?api_key=DQCUt9P9wjNpiw2kJ8B2UlpgWohmcO0gmlphl0kO";
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received:', data);

        const imageContainer = document.getElementById('picture-of-the-day');
        
        if (data.url && data.media_type === "image") {
            imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}" style="width:100%;">`;
        } else if (data.media_type === "video") {
            imageContainer.innerHTML = `<iframe width="100%" height="400" src="${data.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else {
            imageContainer.innerHTML = 'No image or video available today.';
        }

        document.getElementById('description').innerText = data.explanation;

    } catch (error) {
        console.warn(`Fetch error: ${error.message}`);
    }
}

// Function to fetch Astronomy Picture of the Day by a user-selected date
async function fetchByDate() {
    const selectedDate = document.getElementById('datePicker').value;

    if (!selectedDate) {
        alert('Please select a date.');
        return;
    }

    const url = `https://api.nasa.gov/planetary/apod?api_key=DQCUt9P9wjNpiw2kJ8B2UlpgWohmcO0gmlphl0kO&date=${selectedDate}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        const imageContainer = document.getElementById('picture-of-the-day');
        
        if (data.media_type === "image") {
            imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}" style="width:100%;">`;
        } else if (data.media_type === "video") {
            imageContainer.innerHTML = `<iframe width="100%" height="400" src="${data.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else {
            imageContainer.innerHTML = 'Im sorry but theres no image or video available for this date.';
        }

        // the description of the image
        document.getElementById('description').innerText = data.explanation;

    } catch (error) { 
        console.warn(`Fetch error: ${error.message}`);
    }
}

getPicture();
