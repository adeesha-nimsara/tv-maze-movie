<?php

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data from the request body
    $jsonData = file_get_contents("php://input");
    // Decode the JSON data
    $movieData = json_decode($jsonData, true);
    // Check if decoding was successful
    if ($movieData !== null) {
        // Define the file path where you want to save the data
        $filePath = 'movies.json';
        // Read existing content of the file
        $existingData = file_get_contents($filePath);
        // Remove the closing bracket if the file is not empty
        if (!empty($existingData)) {
            // Find the position of the last occurrence of ']'
            $lastClosingBracketPosition = strrpos($existingData, ']');
            if ($lastClosingBracketPosition !== false) {
                // Trim the content up to the last closing bracket
                $existingData = substr($existingData, 0, $lastClosingBracketPosition);
            }
        }
        // Open the file for writing (create if it doesn't exist)
        $file = fopen($filePath, 'w'); // 'w' mode truncates the file
        // Check if file opened successfully
        if ($file) {
            // Write the existing data back to the file
            fwrite($file, $existingData);
            // If file is empty, add opening bracket
            if (filesize($filePath) === 0) {
                fwrite($file, '[');
            } else {
                // Append comma if not first object
                fwrite($file, ',');
            }
            // Append the JSON data to the file
            fwrite($file, $jsonData);
            // Append closing bracket to the file
            fwrite($file, ']');
            // Close the file
            fclose($file);
            // Send a success response
            http_response_code(200);
            echo "Movie data saved successfully.";
        } else {
            // Send a server error response
            http_response_code(500);
            echo "Error opening file for writing.";
        }
    } else {
        // Send a bad request response
        http_response_code(400);
        echo "Invalid JSON data.";
    }
} else {
    // Send a method not allowed response
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
