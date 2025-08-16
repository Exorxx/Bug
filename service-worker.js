import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

precacheAndRoute([{"revision":"1e053e67c0b4e88553cf1f0e0d82f69d","url":"bugs/bug1.svg"},{"revision":"95120c828d8681db8fcc0dd3ce8fa292","url":"bugspawner.js"},{"revision":"6c2d4d96ff70f3899dfe05380b80265d","url":"icons/apple-icon-180.png"},{"revision":"87ff34bde8dc6ff5f1d83e11cb4a8b2a","url":"icons/apple-splash-1125-2436.jpg"},{"revision":"5c77f61b15b643c255f75057d6374e2e","url":"icons/apple-splash-1136-640.jpg"},{"revision":"f3449c813aed9e6518905f0dbf47540c","url":"icons/apple-splash-1170-2532.jpg"},{"revision":"fd5b255152a18a4f105fa3b98f1f6dda","url":"icons/apple-splash-1179-2556.jpg"},{"revision":"c0496171ee7f902f7c0517a78c919ac6","url":"icons/apple-splash-1206-2622.jpg"},{"revision":"c2499cbe8c3e82f9eca52426470f041d","url":"icons/apple-splash-1242-2208.jpg"},{"revision":"8526c59bbc342fec0090196d2862adf4","url":"icons/apple-splash-1242-2688.jpg"},{"revision":"6bf486936f714e720922b9714115b342","url":"icons/apple-splash-1284-2778.jpg"},{"revision":"89d0ab8209196f0533bbf3aba45af2bf","url":"icons/apple-splash-1290-2796.jpg"},{"revision":"7808e0f526b9b3bb3c399515d556b533","url":"icons/apple-splash-1320-2868.jpg"},{"revision":"c571c7ab8e8480c6a3148e0786abf48c","url":"icons/apple-splash-1334-750.jpg"},{"revision":"169a0b45b7e132b9231cda83cd7398b7","url":"icons/apple-splash-1488-2266.jpg"},{"revision":"d4868ae529d1971d358a15c23fe91963","url":"icons/apple-splash-1536-2048.jpg"},{"revision":"3a8e9289380036b89ca6a9f1ef6b34fa","url":"icons/apple-splash-1620-2160.jpg"},{"revision":"2d456b2ea52f0b41529cd106f5922dc8","url":"icons/apple-splash-1640-2360.jpg"},{"revision":"de3df4f1435cfe10f172107e1a53f369","url":"icons/apple-splash-1668-2224.jpg"},{"revision":"9f3b8b2627195b988564804111477fb0","url":"icons/apple-splash-1668-2388.jpg"},{"revision":"09382c4042e37e698dc20d751c142728","url":"icons/apple-splash-1792-828.jpg"},{"revision":"2bc40505f141b15f8dabd0342d7b65f3","url":"icons/apple-splash-2048-1536.jpg"},{"revision":"0077f07a9d39aa69cecc3f30b82e6cab","url":"icons/apple-splash-2048-2732.jpg"},{"revision":"1a85387b51ab9a2771af0e7e53854d9c","url":"icons/apple-splash-2160-1620.jpg"},{"revision":"bd27c40008a1508c52101913552a9c2f","url":"icons/apple-splash-2208-1242.jpg"},{"revision":"6272a66289299a9f898b7d325af753a8","url":"icons/apple-splash-2224-1668.jpg"},{"revision":"872ff598ce38092d7374c6d08bcd6e8f","url":"icons/apple-splash-2266-1488.jpg"},{"revision":"80076345a307d04d8ba7934a18273df4","url":"icons/apple-splash-2360-1640.jpg"},{"revision":"66ee3a4a22eb0b2bb82085170d4d0258","url":"icons/apple-splash-2388-1668.jpg"},{"revision":"6f5060ab6f072df77b958945be9ae527","url":"icons/apple-splash-2436-1125.jpg"},{"revision":"36b2b1195d2f35d44a68b814aaf39884","url":"icons/apple-splash-2532-1170.jpg"},{"revision":"f169c090e064b769e796f16268186efd","url":"icons/apple-splash-2556-1179.jpg"},{"revision":"26410fd3403cf5e5b1aacbe5012c29fa","url":"icons/apple-splash-2622-1206.jpg"},{"revision":"056ccc11a07e55da8c233dc9292c370c","url":"icons/apple-splash-2688-1242.jpg"},{"revision":"00a729f42229efaf9f677bd04c3aa321","url":"icons/apple-splash-2732-2048.jpg"},{"revision":"574fa2034706206b2c5239e88f92e41c","url":"icons/apple-splash-2778-1284.jpg"},{"revision":"8277676e2d8297275e0ca0bb5c275385","url":"icons/apple-splash-2796-1290.jpg"},{"revision":"2b1f78b8bb2aeb7d57771e6ccfdd81ad","url":"icons/apple-splash-2868-1320.jpg"},{"revision":"3a293ff7367d8245fac31b06c1ea479d","url":"icons/apple-splash-640-1136.jpg"},{"revision":"8769a835f4eea74c133e19be411c4ae4","url":"icons/apple-splash-750-1334.jpg"},{"revision":"b7a29ae901f47f307e8fafb48630ec30","url":"icons/apple-splash-828-1792.jpg"},{"revision":"3c67e4de7e2e9a93e6c7777694412c5c","url":"icons/manifest-icon-192.maskable.png"},{"revision":"1f2bc773fe385e3b3e27060eb9b4d888","url":"icons/manifest-icon-512.maskable.png"},{"revision":"1b477d78f720744435aa3fcf40899eee","url":"index.html"},{"revision":"3e03f5276e4b3ba0ab31d6d002efae70","url":"install.js"},{"revision":"b12b3c89de7690ddad78edb855108813","url":"logo.png"},{"revision":"6927d57426dd1a3f5623f2c1c33fd5d4","url":"manifest.json"},{"revision":"c04d43395fafd96bbbcd8e095783e762","url":"README.md"},{"revision":"6db60ff0be58e30368672115b3a0cf92","url":"styles.css"},{"revision":"6820a4957e2f5c4fa894962c77f32d12","url":"workbox-config.js"}]);

cleanupOutdatedCaches();

registerRoute(
  ({ request }) =>
    request.destination === "document" ||
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "json",
  new NetworkFirst({
    cacheName: "dynamic-content",
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
      }),
    ],
  })
);

registerRoute(new NavigationRoute(new NetworkFirst({ cacheName: "pages" })));
