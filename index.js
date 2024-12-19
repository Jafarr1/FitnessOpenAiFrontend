document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitBtn').addEventListener('click', function(event) {
        event.preventDefault();

        // Get the user's input
        var userInput = document.getElementById('question').value.trim();

        // Clear the input box
        document.getElementById('question').value = '';

        // Send the input as a POST request to the backend
        fetch(`https://fitnessaibackend-h6dwepg7guefdqa2.northeurope-01.azurewebsites.net/fitness/advice`, {  // Ensure the URL is correct
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: userInput }) // Send the input as a JSON body
        })
            .then(response => response.json())
            .then(data => {
                // Display the response from the backend
                if (data && data.answer) {
                    document.getElementById('response').innerHTML = data.answer;
                } else {
                    document.getElementById('response').innerText = 'An error occurred while fetching the response.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('response').innerText = 'An error occurred while fetching the response.';
            });
    });

    // Start button to toggle the visibility of the question form
    document.getElementById('startButton').addEventListener('click', function() {
        var form = document.getElementById('questionForm');

        // Toggle visibility of the form
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'block'; // Show the form

            // Scroll to the new position to make the form visible
            var scrollPosition = form.offsetTop + 100; // Additional 100 pixels down
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });

            document.getElementById('question').focus();
        } else {
            form.style.display = 'none'; // Hide the form
        }
    });
});
