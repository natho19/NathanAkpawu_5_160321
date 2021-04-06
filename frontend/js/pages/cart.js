function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        let productLines = document.getElementById('product-lines');
        Object.values(cartItems).map(item => {
            productLines.innerHTML += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>${item.inCart}</td>
                <td>${formatPrice(item.price)} &euro;</td>
                <td>${formatPrice(item.price * item.inCart)} &euro;</td>
            </tr>
            `
        });
        let cartCost = localStorage.getItem('totalCost');
        let totalCost = document.getElementById('total-cost');
        totalCost.innerHTML += `<th scope="col" id="total-cost">${formatPrice(cartCost)} &euro;</th>`;  
    } else {
        let main = document.getElementById('main');
        main.innerHTML = `
        <section class="bg-light">
            <div class="container">
                <div class="row mb-4">
                    <h1 class="text-center">Aucun produit sélectionné...</h1>
                </div>
                <div class="text-center">
                    <a href="index.html" class="btn btn-purple btn-lg rounded-pill mx-2"><i class="bi bi-plus-circle"></i> Ajouter des produits</a>
                </div>
            </div>
        </section>
        `
    }
}

displayCart();

// Quand on soumet le formulaire
const orderForm = document.getElementById('order-form');
if (orderForm) {
    orderForm.onsubmit = (event) => {
        event.preventDefault();
        sendForm();
    }
}

function sendForm() {
    let contact = {
        firstName: document.getElementById('firstname').value, 
        lastName: document.getElementById('lastname').value, 
        address: document.getElementById('address').value, 
        city: document.getElementById('city').value, 
        email: document.getElementById('email').value
    };

    let products = [];

    if (localStorage.getItem('productsInCart')) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);

        Object.values(cartItems).forEach(product => {
            products.push(product._id);
        });

        let contactItems = JSON.stringify({
            contact, products
        });
        postOrder(contactItems);
    }
}

function postOrder(contactItems) {
    loadConfig().then(data => {
        config = data;
        fetch(config.host + 'api/teddies/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: contactItems
        })
        .then(data => data.json())
        .then(resp => {
            let totalPrice = localStorage.getItem('totalCost');
            localStorage.setItem('contact', JSON.stringify(resp.contact));
            localStorage.setItem('orderId', JSON.stringify(resp.orderId));
            localStorage.setItem('totalPrice', totalPrice);
            localStorage.removeItem('productsInCart');
            localStorage.removeItem('cartNumbers');
            localStorage.removeItem('totalCost');
            window.location.replace('./confirmation.html');
        })
        .catch(function() {
            redirect404();
        });
    });
}