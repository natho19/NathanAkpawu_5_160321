loadConfig().then(data => {
    config = data;
    const productId = getProductId();
    fetch(config.host + 'api/teddies/' + productId)
    .then(data => data.json())
    .then(jsonProduct => {
        let product = new Product(jsonProduct);
        displaySingleProduct(product);
        getColors(product);
    })
    .catch(function() {
        redirect404();
    });
});

function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}

function displaySingleProduct(product) {
    document.querySelector('.single-product').innerHTML = `
    <div class="col-lg-6 col-xs-12">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
    </div>
    <div class="col-lg-6 col-xs-12">
        <h1 class="single-title">${product.name}</h1>
        <h2 class="single-price">Prix : <strong>${product.formatPrice()} &euro;</strong></h2>
        <p class="single-description">${product.description}</p>
        <select class="single-colors form-select">
            <option selected>Choisir la couleur</option>
        </select>
        <div class="buttons">
            <a href="cart.html" id="add-cart" class="btn btn-purple btn-lg rounded-pill"><i class="bi bi-plus-circle"></i> Ajouter au panier</a>
            <a href="index.html" class="btn btn-purple btn-lg rounded-pill"><i class="bi bi-eye"></i> Autres produits</a>
        </div>
    </div>`

    // Au clic du bouton ajouter au panier, exécuter la fonction cartNumbers()
    document.getElementById('add-cart').onclick = (event) => {
        event.preventDefault();
        cartNumbers(product);
    }
}

function getColors(product) {
    let colors = product.colors;
    if (colors.length > 0) {
        for (const [i, color] of colors.entries()) {
            document.querySelector('.single-colors').innerHTML += `
            <option value="${i + 1}">${color}</option>`
        }
    }
}

// Permet d'ajouter le nombre de produits sélectionnés au panier
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('cart-number').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.getElementById('cart-number').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let itemInCart = localStorage.getItem('itemInCart');
    itemInCart = parseInt(itemInCart);

    if (cartItems !== null) {
        if (itemInCart) {
            localStorage.setItem('itemInCart', itemInCart + 1)
        } else {
            localStorage.setItem('itemInCart', 1)
        }
    }

    localStorage.setItem('itemInCart', 1);
    localStorage.setItem('productsInCart', JSON.stringify(product));
}