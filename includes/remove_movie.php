<?php

function removeFromFavorites($movieId) {
    // Define the file path
    $filePath = 'movies.json';
    
    // Read existing content of the file
    $existingData = file_get_contents($filePath);
    
    // Decode the JSON data
    $movies = json_decode($existingData, true);
    
    // Check if decoding was successful
    if ($movies !== null) {
        // Find the index of the movie with the given ID
        $index = -1;
        foreach ($movies as $key => $movie) {
            if ($movie['id'] == $movieId) {
                $index = $key;
                break;
            }
        }
        
        // If the movie was found, remove it from the array
        if ($index !== -1) {
            unset($movies[$index]);
            
            // If the array is empty, remove the file or write empty JSON array to file
            if (empty($movies)) {
                // Remove the file
                unlink($filePath);
                // Send a success response
                http_response_code(200);
                echo "Movie removed successfully, and the file has been deleted.";
            } else {
                // Encode the updated array back to JSON
                $jsonData = json_encode(array_values($movies));
                // Remove any trailing comma after opening square bracket
                if (substr($jsonData, 0, 2) === '[,') {
                    $jsonData = '[' . substr($jsonData, 2);
                }
                // Write the updated JSON data back to the file
                file_put_contents($filePath, rtrim($jsonData, ", \n")); // Remove trailing comma
                // Send a success response
                http_response_code(200);
                echo "Movie removed successfully.";
            }
            return;
        } else {
            // Send a not found response
            http_response_code(404);
            echo "Movie not found.";
            return;
        }
    } else {
        // Send a bad request response
        http_response_code(400);
        echo "Invalid JSON data.";
        return;
    }
}




// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data from the request body
    $jsonData = file_get_contents("php://input");
    
    // Decode the JSON data
    $requestData = json_decode($jsonData, true);
    
    // Check if decoding was successful and if the required data is present
    if ($requestData !== null && isset($requestData['movieId'])) {
        // Remove the movie from favorites
        removeFromFavorites($requestData['movieId']);
    } else {
        // Send a bad request response
        http_response_code(400);
        echo "Invalid request data.";
    }
} else {
    // Send a method not allowed response
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
