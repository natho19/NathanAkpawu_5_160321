// Formatte l'affichage du prix : 3900 => 39.00 
function formatPrice(price) {
    return (price / 100).toFixed(2);
}

// Redirige vers la page 404.html
function redirect404() {
    document.body.innerHTML = '';
    const url404 = window.location.origin + '/frontend/404.html';
    window.location.replace(url404);
}

onLoadCartNumbers();

// Affiche le nombre de produits dans le panier sur toutes les pages
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.getElementById('cart-number').textContent = productNumbers;
    }
}