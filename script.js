// Place this inside your script.js
document.addEventListener('DOMContentLoaded', function () {
    fetchNotionData();
});

function fetchNotionData() {
    const databaseId = '879cf0ac37674bc4b8d5bb89e8351e57';
    const token = 'secret_tNxaawH0hO435QVbTXI40MlTKMayC3JLwSUQkKYqrD8'; 
    const notionVersion = '2022-06-28';

    fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': notionVersion,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Here you will process and display the data
    })
    .catch(error => console.error('Error:', error));
}

let contentArray = []; // This will store the fetched Notion content

function fetchNotionData() {
    // Your existing fetch code
    .then(data => {
        contentArray = data.results; // Assuming data.results contains the content, adapt as needed
        console.log(contentArray); // Just for testing
    })
    .catch(error => console.error('Error:', error));
}

function getRandomContent() {
    if(contentArray.length === 0) {
        console.log('No content available');
        return;
    }
    const randomIndex = Math.floor(Math.random() * contentArray.length);
    return contentArray[randomIndex];
}

function displayRandomContent() {
    const randomContent = getRandomContent();
    if(!randomContent) {
        console.log('No content to display');
        return;
    }
    // Assuming each content item has a 'title' field, update as necessary
    document.getElementById('random-content-display').innerText = randomContent.properties.title.title[0].plain_text;
}

function displayAllContent() {
    const contentContainer = document.getElementById('content-list');
    contentContainer.innerHTML = ''; // Clear existing content

    contentArray.forEach(item => {
        // Create a new element for each item and append it to the container
        // For demonstration, assuming each item has 'title' and 'content' properties
        const element = document.createElement('div');
        element.className = 'content-item';
        element.innerHTML = `<h3>${item.properties.title.title[0].plain_text}</h3><p>${item.content}</p>`;
        contentContainer.appendChild(element);
    });
}

function applyCategoryFilter() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredContent = contentArray.filter(item => {
        return item.category === selectedCategory || selectedCategory === '';
    });
    displayFilteredContent(filteredContent);
}

function displayFilteredContent(filteredContent) {
    const contentContainer = document.getElementById('content-list');
    contentContainer.innerHTML = ''; // Clear existing content

    filteredContent.forEach(item => {
        // Similar to displayAllContent but using the filtered content array
        const element = document.createElement('div');
        element.className = 'content-item';
        element.innerHTML = `<h3>${item.properties.title.title[0].plain_text}</h3><p>${item.content}</p>`;
        contentContainer.appendChild(element);
    });
}