// ========== AUTH FUNCTIONS ==========
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    document.querySelector(`.auth-tab:nth-child(${tab === 'login' ? 1 : 2})`).classList.add('active');
    document.getElementById(`${tab}-form`).classList.add('active');
}

function login(email, password) {
    console.log('Login attempt:', email);
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        saveToLocalStorage();
        updateAuthUI();
        
        console.log('Login successful! User:', user);
        console.log('Is admin?', user.isAdmin);
        
        showNotification('Login successful!', 'success');
        showPage('home');
        return true;
    } else {
        showNotification('Invalid email or password', 'error');
        return false;
    }
}

function signup(userData) {
    if (users.find(u => u.email === userData.email)) {
        showNotification('User with this email already exists', 'error');
        return false;
    }

    const newUser = {
        id: users.length + 1,
        ...userData,
        joined: new Date().toISOString().split('T')[0],
        isAdmin: false,
        addresses: []
    };

    users.push(newUser);
    currentUser = newUser;
    saveToLocalStorage();
    updateAuthUI();
    showNotification('Account created successfully!', 'success');
    showPage('home');
    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('current-user');
    updateAuthUI();
    showNotification('Logged out successfully', 'success');
    showPage('home');
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const userAvatar = document.getElementById('user-avatar');
    const adminLink = document.querySelector('a[href="#admin"]');

    console.log('updateAuthUI called. Current user:', currentUser);
    
    if (isLoggedIn()) {
        authButtons.classList.add('hidden');
        userMenu.classList.remove('hidden');
        if (userAvatar) {
            userAvatar.textContent = currentUser.firstName.charAt(0).toUpperCase();
        }
        
        // Show/hide admin link based on admin status
        if (adminLink) {
            if (isAdmin()) {
                adminLink.style.display = 'flex';
            } else {
                adminLink.style.display = 'none';
            }
        }
    } else {
        authButtons.classList.remove('hidden');
        userMenu.classList.add('hidden');
        
        // Hide admin link when logged out
        if (adminLink) {
            adminLink.style.display = 'none';
        }
    }
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            login(email, password);
        });
    }

    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('signup-firstname').value;
            const lastName = document.getElementById('signup-lastname').value;
            const email = document.getElementById('signup-email').value;
            const phone = document.getElementById('signup-phone').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            const userData = {
                firstName,
                lastName,
                email,
                phone,
                password
            };
            
            signup(userData);
        });
    }
});

// Make functions globally available
window.switchAuthTab = switchAuthTab;
window.login = login;
window.signup = signup;
window.logout = logout;
window.updateAuthUI = updateAuthUI;