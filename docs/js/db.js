(() => {
  const DB_NAME = 'weather-pwa-db';
  const STORE = 'cities';

  function openDB() {
    return new Promise((res, rej) => {
      const rq = indexedDB.open(DB_NAME, 1);
      rq.onupgradeneeded = () => {
        rq.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
      };
      rq.onsuccess = () => res(rq.result);
      rq.onerror = () => rej(rq.error);
    });
  }

  window.saveCity = async name => {
    const db = await openDB();
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).add({ name, time: Date.now() });
    return tx.complete;
  };

  window.getCities = async () => {
    const db = await openDB();
    const tx = db.transaction(STORE, 'readonly');
    return tx.objectStore(STORE).getAll();
  };
})();
