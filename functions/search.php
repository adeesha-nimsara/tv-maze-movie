<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $query = $_POST['query'];
    $url = 'http://api.tvmaze.com/search/shows?q=' . urlencode($query);
    $response = file_get_contents($url);
    echo $response;
}

?>
