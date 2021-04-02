function formatPrice(price) {
    return (price / 100).toFixed(2);
}

function redirect404() {
    document.body.innerHTML = '';
    const url404 = window.location.origin + '/frontend/404.html';
    window.location.replace(url404);
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.getElementById('cart-number').textContent = productNumbers;
    }
}

onLoadCartNumbers();