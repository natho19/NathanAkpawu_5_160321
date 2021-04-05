window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    alert('test');
});