function addToFavorites(movieData) {
    // Convert movie data to JSON format
    const jsonData = JSON.stringify(movieData);

    // Send JSON data to server using fetch
    fetch('./includes/save_movie.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => {
            if (response.ok) {
                console.log('Movie data saved to server.');
            } else {
                console.error('Error saving movie data:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error saving movie data:', error);
        });

    // Perform any other desired action
    console.log('Clicked movie data:', jsonData);
}

// Function to handle removing a movie from favorites
function removeFromFavorites(movieId) {
    // Prepare data to be sent to the server
    const requestData = {
        movieId: movieId
    };

    // Convert data to JSON format
    const jsonData = JSON.stringify(requestData);

    // Send JSON data to server using fetch
    fetch('./includes/remove_movie.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (response.ok) {
            console.log('Movie removed from favorites.');
            setTimeout(displayFavoritesMovies(), 2000);
        } else {
            console.error('Error removing movie from favorites:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error removing movie from favorites:', error);
    });
}

// Function to fetch TV shows data from TVmaze API
function fetchShows() {
    return fetch('https://api.tvmaze.com/shows')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to filter TV shows based on name
function filterShowsByName(shows, searchTerm) {
    return shows.filter(show => {
        // Convert both show name and search term to lowercase for case-insensitive comparison
        const showName = show.name.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return showName.includes(searchTermLower);
    });
}

// Function to render filtered shows
function renderShows(filteredShows) {
    const showList = document.getElementById('show-list');
    // Clear previous results
    showList.innerHTML = '';
    // Render up to 12 filtered shows
    filteredShows.slice(0, 12).forEach(show => { // Slice to get the first 12 items
        // Create list item with HTML markup
        const listItemHTML = `
        <div class="col-12 p-3 shadow-lg movie-item" data-id="${show.id}">
            <div class="row d-flex align-items-center">
                <div class="col-2">
                    <img class="img-fluid" src="${show.image.medium}" alt="${show.name}">
                </div>
                <div class="col-10 text-center">
                    <span class="text-white">${show.name}</span>
                </div>
            </div>
        </div>
        `;
        // Add the HTML markup to the show list
        showList.innerHTML += listItemHTML;
    });

    // Add event listeners to each movie item
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        item.addEventListener('click', function () {
            const movieId = this.getAttribute('data-id');
            const clickedMovie = filteredShows.find(show => show.id == movieId);
            if (clickedMovie) {
                // Save the clicked movie data as JSON
                addToFavorites(clickedMovie);
            }
            document.getElementById('search-input').value = '';
            showList.innerHTML = '';
            setTimeout(displayFavoritesMovies(), 2000);
        });
    });
}

// Function to run on page load
window.addEventListener('load', function () {
    document.getElementById('show-list').innerHTML = '';
    displayFavoritesMovies();
    return; // Exit the function early
});

// Function to fetch and display favorites movies
function displayFavoritesMovies() {
    console.log('Fetching movies...');
    fetch('./includes/movies.json')
        .then(response => response.json())
        .then(data => {
            console.log('Movies fetched successfully:', data);
            // Select the container where movies will be displayed
            const moviesListContainer = document.getElementById('favorite-movies');

            // Clear existing content
            moviesListContainer.innerHTML = '';

            // Loop through each movie in the JSON data
            data.forEach(movie => {
                const truncatedSummary = movie.summary ? movie.summary.substring(0, 100) + '...' : 'No summary available';
                // Create a div element to display each movie
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'p-0');
                // Display movie details
                movieDiv.innerHTML = `
                <div class="card rounded-0 bg-dark m-2 shadow-lg position-relative">
                <img src="${movie.image ? movie.image.medium : ''}" class="card-img-top" alt="${movie.name}">
                <div class="card-body text-white">
                    <h5 class="card-title text-white">${movie.name}</h5>
                    <p class="card-text">${truncatedSummary}</p>
                </div>
                <div class="position-absolute top-0 end-0">
                    <button type="button" class="btn btn-primary btn-add-to-favorites" onclick="removeFromFavorites(${movie.id})">Add to Favorites</button>
                </div>
                <div class="position-absolute top-0 start-0">
                    <button type="button" class="btn btn-danger btn-remove-from-favorites" onclick="">Remove</button>
                </div>
            </div>
                        `;

                // Append movie div to moviesListContainer
                moviesListContainer.appendChild(movieDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

// Event listener for input change
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.trim(); // Trim to remove leading/trailing spaces

    // Check if search term is empty
    if (searchTerm === '') {
        // If the search term is empty, clear the show list
        document.getElementById('show-list').innerHTML = '';
        return; // Exit the function early
    }

    fetchShows()
        .then(data => {
            // Filter shows based on name containing the search term
            const filteredShows = filterShowsByName(data, searchTerm);
            // Render filtered shows
            renderShows(filteredShows);
        });
});


// Initial fetch and render (all shows)
fetchShows()
    .then(data => {
        renderShows(data);
    });
