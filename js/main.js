// Make sure sw are supported
if ('serviceWorker' in navigator) {
  console.log('ServiceWorker: Supported');
  window.addEventListener('load', () => {
    navigator
      .serviceWorker
      .register('./sw-cached-site.js')
      .then((reg) => {
        console.log('ServiceWorker: Registered')
      })
      .catch((error) => console.log(`ServiceWorker: Error: ${error}`))
  })
}