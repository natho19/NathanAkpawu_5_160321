// Configuration
// host provisoire : https://ab-p5-api.herokuapp.com/
async function loadConfig() {
    let result = await fetch("config.json");
    return result.json();
}