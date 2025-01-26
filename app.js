// This function simulates a login operation
async function loginUser(username, password) {
    try {
        // Fetch all users from the JSON server
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Unable to fetch users');
        }

        const users = await response.json(); // Get all users from the server

        // Find user with matching credentials
        const user = users.find(u => u.username === username && u.password === password);

        // If no user found, show error
        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Successfully logged in, display user details
        displayUserDetails(user);
    } catch (error) {
        console.error(error); // Handle login or fetch errors
        alert('Login failed: ' + error.message); // Show error message
    }
}

// This function displays the user details on the page
function displayUserDetails(user) {
    const userDetailsSection = document.getElementById('userDetails');
    userDetailsSection.innerHTML = `
        <h3>Welcome, ${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Username: ${user.username}</p>
    `;
    userDetailsSection.style.display = 'block'; // Show user details
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get username and password from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Call the login function
    loginUser(username, password);
});
