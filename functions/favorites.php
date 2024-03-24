<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $url = $_POST['url'];
    $summary = $_POST['summary'];
    
    // Logic to save favorite movie (e.g., save to JSON file)
    $favorite = array('id' => $id, 'name' => $name, 'url' => $url, 'summary' => $summary);
    $favorites = json_decode(file_get_contents('favorites.json'), true);
    $favorites[] = $favorite;
    file_put_contents('favorites.json', json_encode($favorites));

    echo 'success';
}

?>
