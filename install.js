const installBtn = document.getElementById("installBtn");

installBtn.style.display = "none";

function getBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("edg") || ua.includes("chrome")) return "chromium";
  return "other";
}

const browser = getBrowser();

if (browser !== "chromium") installBtn.style.display = "inline-block";

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
    showInstallInstructions(browser);
  }
});

function showInstallInstructions(browser) {
  const existing = document.getElementById("install-popup");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "install-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "10000";

  const popup = document.createElement("div");
  popup.id = "install-popup";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "#fff";
  popup.style.padding = "20px";
  popup.style.border = "2px solid #000";
  popup.style.zIndex = "10001";
  popup.style.maxWidth = "90%";
  popup.style.boxSizing = "border-box";

  let content = "<h2>Install Instructions</h2>";

  if (browser === "safari") {
    content += `
      <p>To install this app on Safari:</p>
      <ul>
        <li>iPhone/iPad: tap <strong>Share → Add to Home Screen</strong></li>
        <li>Mac: click <strong>File → Add to Dock</strong></li>
      </ul>`;
  } else if (browser === "firefox") {
    content += `
      <p>To install this app on Firefox:</p>
      <ul>
        <li>Android: tap menu (⋮) → <strong>Add to Home screen</strong></li>
      </ul>`;
  } else {
    content += `<p>Your browser may not fully support PWA installation.</p>`;
  }

  content += `<button id="close-install">Close</button>`;
  popup.innerHTML = content;

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  document.getElementById("close-install").addEventListener("click", () => {
    popup.remove();
    overlay.remove();
  });
}
