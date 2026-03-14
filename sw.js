const CACHE = 'raduga-v4';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_ALARM') {
    const { targetTime, repeatMin } = e.data;
    cancelAllAlarms();
    scheduleAlarm(targetTime, repeatMin, 0);
  }
  if (e.data && e.data.type === 'CANCEL_ALARM') {
    cancelAllAlarms();
  }
});

let alarmTimers = [];

function cancelAllAlarms() {
  alarmTimers.forEach(t => clearTimeout(t));
  alarmTimers = [];
}

function scheduleAlarm(baseTime, repeatMin, index) {
  const now = Date.now();
  const fireAt = index === 0 ? baseTime : baseTime + index * repeatMin * 60000;
  const delay = Math.max(0, fireAt - now);

  const t = setTimeout(() => {
    fireNotification(index);
    self.clients.matchAll().then(clients => {
      clients.forEach(c => c.postMessage({ type: 'ALARM_FIRED', index }));
    });
    if (repeatMin > 0 && index < 3) {
      scheduleAlarm(baseTime, repeatMin, index + 1);
    }
  }, delay);

  alarmTimers.push(t);
}

function fireNotification(index) {
  const title = index === 0 ? '🌙 Sveglia Raduga' : '🌙 Raduga — ripetizione ' + index;
  const body = index === 0
    ? 'Rimani immobile. Non aprire gli occhi. Entra nella Fase.'
    : 'Ripetizione ' + index + '/3 — rimani immobile, torna nel sogno.';

  return self.registration.showNotification(title, {
    body: body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [400, 150, 400, 150, 600],
    tag: 'raduga-alarm-' + index,
    requireInteraction: true,
    silent: false,
    renotify: true
  });
}

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      for (const client of clients) {
        if (client.url.includes('raduga-alarm') && 'focus' in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow('./');
    })
  );
});
