window.addEventListener("DOMContentLoaded", function () {
  if ("serviceWorker" in navigator) {
    this.navigator.serviceWorker
      .register("sw.js")
      .then((res) => console.log("El Service Worker se registró correctamente"))
      .catch((err) => console.log("El Service Worker no se pudo registrar "));
  }

  // Comprobar si la app ya ha sido instalada y ocultar el botón en consecuencia
  let isAppInstalled = localStorage.getItem("isAppInstalled") === "true";
  let btnInstall = document.querySelector(".btnInstall");
  if (isAppInstalled && btnInstall) {
    btnInstall.style.display = "none";
  }

  //Evento de instalación mediante un botón
  let eventInstall;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventInstall = e;
    ShowInstallButton();
  });

  let ShowInstallButton = () => {
    let btnInstall = document.querySelector(".btnInstall");
    if (btnInstall != undefined) {
      btnInstall.style.display = "inline-block";
      btnInstall.addEventListener("click", InstallApp);
    }
  };

  let InstallApp = () => {
    if (eventInstall) {
      eventInstall.prompt();
      eventInstall.userChoice.then((res) => {
        if (res.outcome == "accepted") {
          console.log("El usuario acepto instalar la app");
          localStorage.setItem("isAppInstalled", "true"); // Guardar que la app ha sido instalada
          let btnInstall = document.querySelector(".btnInstall");
          if (btnInstall) {
            btnInstall.style.display = "none";
          }
        } else {
          console.log("El usuario no acepto instalar la app");
        }
      });
    }
  };
});
