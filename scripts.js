let cart = [];
let total = 0;

function toggleCart() {
    const cartMenu = document.getElementById('cart-menu');
    if (cartMenu.style.display === 'block') {
        cartMenu.style.display = 'none';
    } else {
        cartMenu.style.display = 'block';
    }
}

function addToCart(name, price) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const cartCount = document.getElementById('cart-count');
    cartItems.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total.toFixed(2);

    // Actualizar el contador del carrito
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = itemCount;
    cartCount.style.display = itemCount > 0 ? 'block' : 'none';

    if (cart.length > 0) {
        document.getElementById('order-form').style.display = 'block';
    } else {
        document.getElementById('order-form').style.display = 'none';
    }
}

function submitOrder() {
    alert('Pedido realizado con éxito!');
    cart = [];
    updateCart();
}
