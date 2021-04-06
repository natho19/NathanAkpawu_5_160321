function confirmationOrder() {
    const orderId = JSON.parse(localStorage.getItem('orderId'));
    const contact = JSON.parse(localStorage.getItem('contact'));
    const totalPrice = parseInt(localStorage.getItem('totalPrice'));

    let orderAbstract = document.getElementById('order-abstract');
    orderAbstract.innerHTML = `
    <h2>Félicitations <strong>${contact.firstName} ${contact.lastName}</strong> !!! Votre commande a été bien prise en compte</h2>
    <h3>Prix total de la commande : <strong>${formatPrice(totalPrice)} &euro;</strong></h3>
    <h3>Identifiant de la commande : <strong>${orderId}</strong></h3>
    <a href="index.html" class="btn btn-purple rounded-pill mt-3"><i class="bi bi-arrow-left"></i> Retourner sur la page d'accueil</a>
    `;

    localStorage.removeItem('orderId');
    localStorage.removeItem('contact');
    localStorage.removeItem('totalPrice');
}

confirmationOrder();