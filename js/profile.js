// ========== PROFILE FUNCTIONS ==========
function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.toggle('active');
}

function loadProfileInfo() {
    if (!currentUser) return;
    
    const profileAvatar = document.getElementById('profile-avatar');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileFullname = document.getElementById('profile-fullname');
    const profileDisplayEmail = document.getElementById('profile-display-email');
    const profilePhone = document.getElementById('profile-phone');
    const profileJoined = document.getElementById('profile-joined');
    
    if (profileAvatar) profileAvatar.textContent = currentUser.firstName.charAt(0).toUpperCase();
    if (profileName) profileName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (profileFullname) profileFullname.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    if (profileDisplayEmail) profileDisplayEmail.textContent = currentUser.email;
    if (profilePhone) profilePhone.textContent = currentUser.phone || 'Not set';
    if (profileJoined) {
        const joinedDate = new Date(currentUser.joined);
        profileJoined.textContent = joinedDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    }
    
    loadAddresses();
}

function toggleProfileEdit() {
    const editForm = document.getElementById('edit-personal-form');
    editForm.classList.toggle('hidden');
    
    // Populate form with current data
    if (!editForm.classList.contains('hidden')) {
        document.getElementById('edit-firstname').value = currentUser.firstName;
        document.getElementById('edit-lastname').value = currentUser.lastName;
        document.getElementById('edit-email').value = currentUser.email;
        document.getElementById('edit-phone').value = currentUser.phone || '';
    }
}

function savePersonalInfo() {
    const firstName = document.getElementById('edit-firstname').value;
    const lastName = document.getElementById('edit-lastname').value;
    const email = document.getElementById('edit-email').value;
    const phone = document.getElementById('edit-phone').value;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], firstName, lastName, email, phone };
        currentUser = users[userIndex];
        saveToLocalStorage();
        
        // Update displayed info
        loadProfileInfo();
        showNotification('Profile updated successfully!', 'success');
        toggleProfileEdit();
    }
}

function loadAddresses() {
    const addressList = document.getElementById('address-list');
    if (!addressList || !currentUser) return;
    
    if (currentUser.addresses.length === 0) {
        addressList.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 20px;">
                <i class="fas fa-map-marker-alt" style="font-size: 2rem; color: var(--gray);"></i>
                <p>No addresses saved yet</p>
            </div>
        `;
        return;
    }
    
    addressList.innerHTML = currentUser.addresses.map(address => `
        <div class="info-item">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <label>${address.label} ${address.isDefault ? '<span style="color: var(--accent); font-size: 0.8rem;">(Default)</span>' : ''}</label>
                    <p>${address.street}<br>${address.city}, ${address.state} ${address.zip}<br>${address.phone}</p>
                </div>
                <div>
                    <button class="btn btn-outline" style="padding: 5px 10px; font-size: 0.8rem;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline" style="padding: 5px 10px; font-size: 0.8rem; color: var(--danger);">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Close user menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu')) {
            const dropdown = document.getElementById('user-dropdown');
            if (dropdown) dropdown.classList.remove('active');
        }
    });
});