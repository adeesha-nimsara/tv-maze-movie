<?php

// Check if id parameter is provided
if(isset($_POST['id'])) {
    $id = $_POST['id'];

    // Read the favorites data from JSON file
    $favoritesFile = 'favorites.json';
    $favoritesData = file_get_contents($favoritesFile);
    $favorites = json_decode($favoritesData, true);

    // Find the index of the movie with the given id
    $indexToRemove = null;
    foreach($favorites as $index => $favorite) {
        if($favorite['id'] == $id) {
            $indexToRemove = $index;
            break;
        }
    }

    // If movie found, remove it from the favorites array
    if($indexToRemove !== null) {
        unset($favorites[$indexToRemove]);

        // Rewrite the updated favorites data to the JSON file
        file_put_contents($favoritesFile, json_encode(array_values($favorites)));

        // Respond with success message
        echo 'success';
    } else {
        // Respond with error message if movie not found
        echo 'Movie not found in favorites';
    }
} else {
    // Respond with error message if id parameter is not provided
    echo 'ID parameter not provided';
}

?>
