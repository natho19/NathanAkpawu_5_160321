loadConfig().then(data => {
    config = data;
    const productId = getProductId();
    fetch(config.host + 'api/teddies/' + productId)
    .then(data => data.json())
    .then(jsonProduct => {
        let product = new Product(jsonProduct);
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
                <a href="cart.html" class="btn btn-purple btn-lg rounded-pill"><i class="bi bi-plus-circle"></i> Ajouter au panier</a>
                <a href="index.html" class="btn btn-purple btn-lg rounded-pill"><i class="bi bi-eye"></i> Autres produits</a>
            </div>
        </div>`
        product.getColors();
    })
    .catch(error => {
        redirect404();
    });
});
