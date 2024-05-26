let openShopping = document.querySelector('#shoppingCartIcon');
let closeShopping = document.querySelector('.closeShopping');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let cart = [];

document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let itemName = btn.getAttribute('data-name');
        let itemPrice = parseFloat(btn.getAttribute('data-price'));
        let itemImage = btn.getAttribute('data-image');
        addItemToCart(itemName, itemPrice, itemImage);
    });
});

function addItemToCart(name, price, image) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    listCart.innerHTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;

        let li = document.createElement('li');
        li.classList.add('cart-item');

        let itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.classList.add('cart-item-image');

        let itemDetails = document.createElement('div');
        itemDetails.classList.add('cart-item-details');
        itemDetails.innerHTML = `${item.name} - RM${item.price.toFixed(2)} x ${item.quantity}`;

        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('cart-item-remove');
        removeButton.addEventListener('click', () => {
            removeItemFromCart(item.name);
        });

        li.appendChild(itemImage);
        li.appendChild(itemDetails);
        li.appendChild(removeButton);
        listCart.appendChild(li);
    });

    total.innerHTML = `Total: RM${totalPrice.toFixed(2)}`;
    quantity.innerHTML = totalQuantity;
}

function removeItemFromCart(name) {
    let itemIndex = cart.findIndex(i => i.name === name);
    if (itemIndex > -1) {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}
