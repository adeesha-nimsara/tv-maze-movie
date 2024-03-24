document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Serialize form data
    var formData = new FormData(this);

    // Send form data to PHP script using AJAX
    fetch(this.getAttribute("action"), {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Handle success (e.g., redirect or show success message)
                alert("Form submitted successfully!");
                // Redirect to another page
                // window.location.href = "success_page.html";
                document.getElementById("contactForm").reset();
            } else {
                // Display errors to the user
                var errorContainer = document.getElementById("errorContainer");
                errorContainer.innerHTML = ""; // Clear previous errors

                data.errors.forEach(function (error) {
                    var errorElement = document.createElement("div");
                    errorElement.textContent = error;
                    errorContainer.appendChild(errorElement);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});