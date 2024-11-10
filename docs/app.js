const submitPasswordButton = document.getElementById('submitPassword');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error');
const passwordPrompt = document.getElementById('passwordPrompt');
const serverControl = document.getElementById('serverControl');
const toggleServerBtn = document.getElementById('toggleServerBtn');
const serverStatus = document.getElementById('serverStatus');

// API endpoint for authentication and server control
const API_BASE_URL = 'https://your-api-gateway-url';

// Function to check the password
async function checkPassword(password) {
    try {
        const response = await fetch(`${API_BASE_URL}/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during authentication', error);
        return false;
    }
}

// Function to toggle the server status
async function toggleServer() {
    try {
        const response = await fetch(`${API_BASE_URL}/toggle-server`, { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            serverStatus.textContent = data.isServerOn ? 'Server is on' : 'Server is off';
        } else {
            console.error('Failed to toggle server');
        }
    } catch (error) {
        console.error('Error during server toggle', error);
    }
}

// Handle password submission
submitPasswordButton.addEventListener('click', async () => {
    const password = passwordInput.value.trim();
    if (password) {
        const isAuthenticated = await checkPassword(password);
        if (isAuthenticated) {
            passwordPrompt.classList.add('hidden');
            serverControl.classList.remove('hidden');
        } else {
            errorMessage.style.display = 'block';
        }
    }
});

// Handle server toggle button click
toggleServerBtn.addEventListener('click', () => {
    toggleServer();
});

