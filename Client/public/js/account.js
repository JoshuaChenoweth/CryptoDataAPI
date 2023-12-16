document.addEventListener('DOMContentLoaded', function () {
 // ensures the document content has loaded before functionality can be enacted
    document.getElementById('accountCreationForm').addEventListener('submit', function (event) {
        event.preventDefault(); 
        // gathers the account creation form by use of its ID
        // Extract form data
        const formData = {
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            DOB: document.getElementById('dob').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };

        // Clear the form
        document.getElementById('accountCreationForm').reset();
    });
});