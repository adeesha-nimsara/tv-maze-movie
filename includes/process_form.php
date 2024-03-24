<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate inputs
    $errors = array();

    // Validate first name
    $first_name = trim($_POST["first_name"]);
    if (empty($first_name)) {
        $errors[] = "First name is required";
    }

    // Validate last name
    $last_name = trim($_POST["last_name"]);
    if (empty($last_name)) {
        $errors[] = "Last name is required";
    }

    // Validate email
    $email = trim($_POST["email"]);
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }

    // Check if agreement is checked
    if (!isset($_POST["agree"])) {
        $errors[] = "You must agree to the terms and conditions";
    }

    // If there are no errors, save data as JSON
    if (empty($errors)) {
        $data = array(
            "first_name" => $first_name,
            "last_name" => $last_name,
            "email" => $email,
            "telephone" => isset($_POST["telephone"]) ? $_POST["telephone"] : "",
            "message" => isset($_POST["message"]) ? $_POST["message"] : ""
        );

        // Save data as JSON
        $filename = "form_data_" . time() . ".json";
        file_put_contents($filename, json_encode($data));

        echo json_encode(array("success" => true));
    } else {
        // Return errors
        echo json_encode(array("success" => false, "errors" => $errors));
    }
} else {
    // Return error if not a POST request
    echo json_encode(array("success" => false, "errors" => array("Invalid request")));
}
?>
