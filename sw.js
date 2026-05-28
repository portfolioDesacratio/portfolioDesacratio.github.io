// Desacratio Portfolio — сервис-воркер заглушка
// Мгновенно активируемся и не показываем никаких диалогов.
const CACHE = 'desacratio-portfolio-final';
self.addEventListener('install', () => {
    self.skipWaiting();
});
self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
        await self.clients.claim();
    })());
});
self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).catch(() => new Response('', {status: 408})));
});
