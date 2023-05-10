const cacheName = "the-ring-cache";
const assets = [
  "/",
  "index.html",
  "evil.html",
  "good.html",
  "assets/css/style.css",
  "assets/css/bootstrap.min.css",
  "assets/js/main.js",
  "assets/js/good.js",
  "assets/js/evil.js",
  "assets/js/character-good.js",
  "assets/js/character-evil.js",
  "assets/js/bootstrap.bundle.js",
  "character.html",
  "character-evil.html",
  "assets/js/particles.min.js",
  "assets/js/particula.js",
  "font/RINGM___.TTF",
];
//Se produce el evento de instalación y se dispara por consola si la instalación fue correcta
self.addEventListener("install", (event) => {
  console.log("El Service Worker se instaló correctamente");
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});

self.addEventListener("activate", (event) => {
  console.log("El Service Worker se activó correctamente");
});

//Busca en el caché si alguno de los recursos ya han sido almacenados. Si es así, lo muestra en el navegador. Si no está, se lo pide al servidor y almacenarlo en el caché.

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      if (respuesta) {
        return respuesta;
      }
      let requestToCache = event.request.clone();
      return fetch(requestToCache).then((res) => {
        //Falló la conexión a internet o hubo un error al buscar en el servidor
        if (!res || res.status !== 200) {
          return res;
        }
        //Se encontró lo solicitado.
        let respuestaCache = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(requestToCache, respuestaCache);
        });
        return res;
      });
    })
  );
});
