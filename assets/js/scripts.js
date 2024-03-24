function searchMovies() {
    console.log('click')
    var searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm !== '') {
        $.ajax({
            url: './functions/search.php',
            type: 'POST',
            data: { query: searchTerm },
            success: function (response) {
                displaySearchResults(JSON.parse(response));
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }
}

function displaySearchResults(results) {
    var searchResultsDiv = document.getElementById('show-list');
    searchResultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(function (result) {
            var input = document.getElementById('searchInput');
            var addDiv = document.createElement('div');
            addDiv.classList.add('col-12', 'p-3', 'shadow-lg', 'movie-item', 'cursor-pointer', 'scale-down');
            addDiv.addEventListener('click', function () {
                addToFavorites(result.show.id, result.show.name, result.show.image.medium, result.show.summary);
                getJsonData();
                searchResultsDiv.innerHTML = '';
                input.value = '';
            });

            // Create a div element with class "row", "d-flex", and "align-items-center"
            var rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'd-flex', 'align-items-center');
            addDiv.appendChild(rowDiv);

            // Create a div element with class "col-2"
            var colDiv1 = document.createElement('div');
            colDiv1.classList.add('col-2');

            // Create an image element
            var img = document.createElement('img');
            img.classList.add('img-fluid');
            img.src = result.show.image.medium; // Assuming result is in scope
            img.alt = result.show.name; // Assuming result is in scope

            // Append the image to the first column div
            colDiv1.appendChild(img);

            // Create a div element with class "col-10" and "text-center"
            var colDiv2 = document.createElement('div');
            colDiv2.classList.add('col-10', 'text-center');

            // Create a span element with class "text-white" and set its text content to the show name
            var span = document.createElement('span');
            span.classList.add('text-white');
            span.textContent = result.show.name; // Assuming result is in scope

            // Append the span to the second column div
            colDiv2.appendChild(span);

            // Append both column divs to the row div
            rowDiv.appendChild(colDiv1);
            rowDiv.appendChild(colDiv2);

            searchResultsDiv.append(addDiv)
            // Get the added movie item
        });
    } else {
        searchResultsDiv.textContent = 'No results found.';
    }
}

function addToFavorites(id, name, url, summary) {
    $.ajax({
        url: './functions/favorites.php',
        type: 'POST',
        data: { id: id, name: name, url: url, summary: summary },
        success: function (response) {
            if (response === 'success') {
                console.log('add to favorite')
                displayFavorite(name, url, summary);
                setTimeout(getJsonData(), 3000);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function displayFavorite(name, url, summary) {
    
}

function getJsonData() {
    setTimeout(function () {
        $.ajax({
            url: './functions/favorites.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Process fetched data
                displayData(data);
            },
            error: function (err) {
                console.error('Error fetching data:', err);
            }
        });
    }, 1000);

    function displayData(data) {
        // Assuming data is an array of objects
        const moviesListContainer = document.getElementById('favorite-movies');
        moviesListContainer.innerHTML = '';
        var container = $('#data-container');
        container.empty(); // Clear previous content
        console.log(data)
        // Iterate through the data and create HTML elements
        data.forEach(function (item) {
            const truncatedSummary = item.summary ? item.summary.substring(0, 100) + '...' : 'No summary available';
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'p-0');
            movieDiv.innerHTML = `
                <div class="card rounded-0 bg-dark m-2 shadow-lg position-relative" data-id="${item.id}">
                <img src="${item.url}" class="card-img-top" alt="${item.name}">
                <div class="card-body text-white">
                    <h5 class="card-title text-white" id="movie-name">${item.name}</h5>
                    <p class="card-text">${truncatedSummary}</p>
                </div>
                <div class="position-absolute top-0 end-0 p-2 ">
                    <button type="button" class="btn btn-remove-favorite cursor-pointer scale-down p-2 pt-1 bg-dark" onclick=""> <img width="20px" height="20px" src="./assets/images/close.svg"></button>
                </div>
            </div>
                        `;

            // var card = $('<div class="card mb-3"></div>');
            // var cardBody = $('<div class="card-body"></div>');
            // var title = $('<h5 class="card-title">' + item.title + '</h5>');
            // var description = $('<p class="card-text">' + item.description + '</p>');

            // cardBody.append(title, description);
            // card.append(cardBody);
            // container.append(card);
            moviesListContainer.appendChild(movieDiv);
        });
    }
}

// Event listener for input change
document.getElementById('searchInput').addEventListener('input', function () {
    if (this.value.trim() !== '') {
        searchMovies();
    } else {
        var searchResultsDiv = document.getElementById('show-list');
        searchResultsDiv.innerHTML = '';
    }
});

window.onload = getJsonData();


function removeFromFavorites(id) {
    $.ajax({
        url: './functions/removeFavorites.php',
        type: 'POST',
        data: { id: id },
        success: function (response) {
            if (response === 'success') {
                console.log('Removed from favorites: ' + id);
                getJsonData(); // Refresh the favorites list after removal
            } else {
                console.error('Failed to remove from favorites: ' + id);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error removing from favorites:', error);
        }
    });
}

$(document).on('click', '.btn-remove-favorite', function () {
    var movieId = $(this).closest('.card').data('id');
    removeFromFavorites(movieId);
});