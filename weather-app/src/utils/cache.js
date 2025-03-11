const cache = {};

function getFromCache(key) {
    return cache[key];
}

function setToCache(key, value) {
    cache[key] = value;
    // Definir expiração (opcional)
    setTimeout(() => delete cache[key], 3600000); // 1 hora
}

module.exports = { getFromCache, setToCache };
