const tg = window.Telegram.WebApp;
tg.expand();

let userData = {};
let idCounter = 1;

function generateUniqueId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const prefix = chars[Math.floor(Math.random() * chars.length)];
  const num = idCounter++;
  return `${prefix}${num}`;
}

document.getElementById('register-btn').addEventListener('click', () => {
  const phone = document.getElementById('phone').value;
  const name = document.getElementById('name').value;

  if (!phone || !name) return alert("Iltimos, barcha maydonlarni to‘ldiring.");

  userData = {
    phone,
    name,
    locations: {}
  };

  document.getElementById('register-screen').style.display = 'none';
  document.getElementById('main-screen').style.display = 'block';
});

function saveLocation(type) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const id = generateUniqueId();
      userData.locations[type] = {
        id,
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      alert(`${type} joylashuvi saqlandi. ID: ${id}`);
    });
  } else {
    alert("Joylashuvni aniqlab bo‘lmadi.");
  }
}

document.getElementById('add-current').addEventListener('click', () => saveLocation('current'));
document.getElementById('add-home').addEventListener('click', () => saveLocation('home'));
document.getElementById('add-work').addEventListener('click', () => saveLocation('work'));

document.getElementById('search-btn').addEventListener('click', () => {
  const searchId = document.getElementById('search-id').value.trim().toUpperCase();

  for (let key in userData.locations) {
    if (userData.locations[key].id === searchId) {
      const loc = userData.locations[key];
      const mapUrl = `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;
      window.open(mapUrl, '_blank');
      return;
    }
  }

  alert("Bunday ID topilmadi.");
});
