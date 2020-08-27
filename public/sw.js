importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.precaching.precacheAndRoute([{"revision":"55750538187979b3c7d3543048262e47","url":"build/bundle.css"},{"revision":"0937071f005e0f0f7516e780fdc21f6b","url":"global.css"},{"revision":"aa496299fee7a5d779f08fd5ac737991","url":"assets/android-icon-192x192-manifest-17427.png"},{"revision":"9ea0eea814a3560804046cc19e00977b","url":"assets/apple-icon-114x114-manifest-17427.png"},{"revision":"9ac164a09fdcaa219ac83c7ccd170b6a","url":"assets/apple-icon-120x120-manifest-17427.png"},{"revision":"2548a9477919c6d285fd12bb0592e18b","url":"assets/apple-icon-144x144-manifest-17427.png"},{"revision":"a897ae98298451e5dba9ea8a66a0d101","url":"assets/apple-icon-152x152-manifest-17427.png"},{"revision":"4323a1875c4603f96a438cb1215834b2","url":"assets/apple-icon-180x180-manifest-17427.png"},{"revision":"c6656c4a86c3f9b5688289f33d18a423","url":"assets/apple-icon-57x57-manifest-17427.png"},{"revision":"ada8f2951c92132d835628dbe245dc26","url":"assets/apple-icon-60x60-manifest-17427.png"},{"revision":"c92de926471d3a79b3a7064a1b7a4f13","url":"assets/apple-icon-72x72-manifest-17427.png"},{"revision":"a6a6927140d4b9fe33b65bb8f6778fbc","url":"assets/apple-icon-76x76-manifest-17427.png"},{"revision":"50ad616237464dacb9e82c41cb7a1417","url":"assets/favicon-16x16-manifest-17427.png"},{"revision":"e57ee4b74d046081b95be48348ad1234","url":"assets/favicon-32x32-manifest-17427.png"},{"revision":"c62a34d4ed7ca727ce2cb4715981b08c","url":"assets/favicon-96x96-manifest-17427.png"},{"revision":"c64beab291de80970aa4887a5a1c9135","url":"favicon.png"},{"revision":"33c393407701d7e4095b8729b639eaba","url":"assets/start.svg"},{"revision":"6fab7a26be5d3f037580f563fd25ac01","url":"assets/stop.svg"},{"revision":"5fb3141a3f74c293310a492a2a6ca3e8","url":"assets/favicon.ico"},{"revision":"4e3c0599977ff7c4168cd6fbdd13b4ff","url":"index.html"},{"revision":"adc5099826450c11d59edc0cc1f8e4f9","url":"build/bundle.js"},{"revision":"3e342d91b689a0dcf43d374bbe7a299b","url":"manifest.json"},{"revision":"b76b0645d3ba50d44def821b619ab0b6","url":"assets/rest_sound.mp3"},{"revision":"74390049fdc135e7f4de6586ac3faffc","url":"assets/silence.mp3"},{"revision":"1f2cb5df1df936533fa5edcb29c36229","url":"assets/work_sound.mp3"},{"revision":"163c4dfdd9bf6d7fb8a99d1f925a18ec","url":"build/0936fcc19767773b.mp3"},{"revision":"5fbec54a72132b30816b7083cf97ea64","url":"build/12396a361b706391.mp3"},{"revision":"1f2cb5df1df936533fa5edcb29c36229","url":"build/1e30154e2d390d37.mp3"},{"revision":"1148f8fe4a813c31acf7aadbfabc5d4e","url":"build/7a06d4e84eec6b2f.mp3"},{"revision":"d4c2089b6ba4e7819901b34709f4f259","url":"build/a9c6cf859ca46097.mp3"},{"revision":"14f822c7f902bb3cc01cca645e70841f","url":"build/f711fc71b9dacc2a.mp3"}]);

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}