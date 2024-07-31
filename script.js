let isAuthenticatedOwner = false;
let menuItems = [];

document.addEventListener('DOMContentLoaded', () => {
    // Initial menu items for demonstration
    menuItems = [
        { id: 1, name: 'Dish 1', price: 100, image: '', available: true },
        { id: 2, name: 'Dish 2', price: 120, image: '', available: true },
        { id: 3, name: 'Dish 3', price: 150, image: '', available: true }
    ];

    showHomeView();
});

function toggleOwnerPassword() {
    const ownerPassword = document.getElementById('owner-password');
    ownerPassword.style.display = ownerPassword.style.display === 'none' || ownerPassword.style.display === '' ? 'block' : 'none';
}

function validatePassword() {
    const passwordInput = document.getElementById('password-input').value;
    if (passwordInput === '2025') {
        isAuthenticatedOwner = true;
        document.getElementById('owner-password').style.display = 'none';
        showOwnerView();
    } else {
        alert('Incorrect password. Please try again.');
        document.getElementById('password-input').value = '';
    }
}

function showHomeView() {
    isAuthenticatedOwner = false;
    document.getElementById('owner-view').style.display = 'none';
    document.getElementById('owner-password').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    displayMenu();
}

function showOwnerView() {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('owner-view').style.display = 'block';
    displayOwnerMenu();
}

function displayMenu() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Nu. ${item.price}</p>
            <p>${item.available ? 'Available' : 'Not Available'}</p>
        `;
        menuContainer.appendChild(menuItem);
    });
}

function displayOwnerMenu() {
    const ownerMenuContainer = document.getElementById('owner-menu-items');
    ownerMenuContainer.innerHTML = '';

    menuItems.forEach(item => {
        const ownerMenuItem = document.createElement('div');
        ownerMenuItem.className = 'owner-menu-item';
        ownerMenuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Nu. ${item.price}</p>
            <button onclick="toggleAvailability(${item.id})">${item.available ? 'Not Available' : 'Available'}</button>
            <button onclick="deleteMenuItem(${item.id})">Delete</button>
        `;
        ownerMenuContainer.appendChild(ownerMenuItem);
    });
}

function addMenuItem() {
    const foodName = document.getElementById('food-name').value;
    const foodPrice = document.getElementById('food-price').value;
    const foodImage = document.getElementById('food-image').files[0];

    if (foodName && foodPrice && foodImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newItem = {
                id: menuItems.length + 1,
                name: foodName,
                price: parseFloat(foodPrice),
                image: e.target.result,
                available: true
            };
            menuItems.push(newItem);
            displayOwnerMenu();
            displayMenu(); // Update home view as well
        };
        reader.readAsDataURL(foodImage);
    } else {
        alert('Please fill in all fields.');
    }
}

function deleteMenuItem(id) {
    menuItems = menuItems.filter(item => item.id !== id);
    displayOwnerMenu();
    displayMenu(); // Update home view as well
}

function toggleAvailability(id) {
    const menuItem = menuItems.find(item => item.id === id);
    menuItem.available = !menuItem.available;
    displayMenu();
    displayOwnerMenu();
}
