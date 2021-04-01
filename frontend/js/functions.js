function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}

function redirect404() {
    document.body.innerHTML = '';
    const url404 = window.location.origin + '/frontend/404.html';
    window.location.replace(url404);
}