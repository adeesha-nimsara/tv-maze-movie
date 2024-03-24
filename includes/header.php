<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple PHP Website</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <link rel="stylesheet" href=".\assets\css\style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <header class="sticky-top">
        <div class="container-fluid bg-dark">
            <div class="container">
                <div class="row d-flex justify-content-between align-items-center text-nowrap">
                    <div class="col-auto py-3">
                        <img src=".\assets\images\logo.png">
                    </div>
                    <div class="col text-end d-none d-lg-block">
                        <a href="#"
                            class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">HOME</a>
                        <a href="#" class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">OUR
                            SCREENS</a>
                        <a href="#"
                            class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">SCHEDULE</a>
                        <a href="#" class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">MOVIE
                            LIBRARY</a>
                    </div>
                    <div class="col-auto d-flex justify-content-end">
                        <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"><svg width="38" height="24" viewBox="0 0 38 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 11.9999H36.2857" stroke="white" stroke-width="2.28571"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2 1.71423H36.2857" stroke="white" stroke-width="2.28571"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2 22.2858H36.2857" stroke="white" stroke-width="2.28571"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <a href="#" class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">HOME</a><br>
                <a href="#" class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">OUR
                    SCREENS</a><br>
                <a href="#" class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">SCHEDULE</a><br>
                <a href="#" class="text-white link-offset-2 link-underline link-underline-opacity-0 px-2">MOVIE
                    LIBRARY</a><br>
            </div>
        </div>
    </header>