it('should register a service worker and cache file on install', function() {
  // 1: Register service worker.
  // 2: Wait for service worker to install.
  // 3: Check cache was performed correctly.

  return navigator.serviceWorker.register('../service-worker.js')
  .then((reg) => {
    return window.__waitForSWState(reg, 'installed');
  });
});
