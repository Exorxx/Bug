const installBtn = document.getElementById("installBtn");
const instructions = document.getElementById("installInstructions");

instructions.style.display = "none";

function getBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("edg") || ua.includes("chrome")) return "chromium";
  return "other";
}

const browser = getBrowser();

if (browser !== "chromium") {
  installBtn.style.display = "inline-block";
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  if (browser !== "chromium") return;
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-block";
});

installBtn.addEventListener("click", async () => {
  if (browser === "chromium" && deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User choice: ${outcome}`);
    deferredPrompt = null;
    installBtn.style.display = "none";
  } else {
    instructions.style.display = "block";
    if (browser === "safari") {
      instructions.innerHTML = `
        <p>To install this app on Safari:</p>
        <ul>
          <li>iPhone/iPad: tap <strong>Share → Add to Home Screen</strong></li>
          <li>Mac: click <strong>File → Add to Dock</strong></li>
        </ul>`;
    } else if (browser === "firefox") {
      instructions.innerHTML = `
        <p>To install this app on Firefox:</p>
        <ul>
          <li>Desktop: browser menu → <strong>Install</strong></li>
          <li>Android: tap menu (⋮) → <strong>Add to Home screen</strong></li>
        </ul>`;
    } else {
      instructions.innerHTML = `<p>Your browser may not fully support PWA installation.</p>`;
    }
  }
});
