// 🎥 Включение камеры
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    document.getElementById('camera-feed').srcObject = stream;
}).catch(error => {
    alert('Ошибка доступа к камере! Проверьте настройки браузера.');
});

// 📸 Сохранение фото
function captureImage() {
    let video = document.getElementById('camera-feed');
    let canvas = document.getElementById('snapshot');
    let context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    let img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    document.getElementById('photos').appendChild(img);
}

// 💧 Датчик влажности (пример)
function updateMoisture() {
    let level = Math.floor(Math.random() * 100);
    document.getElementById('moisture-level').innerText = `Влажность: ${level}%`;
}
setInterval(updateMoisture, 5000);

// 📅 Календарь
function setReminder() {
    alert('✅ Напоминание о поливе установлено!');
}

// 🌿 Советы по растениям
const tips = ["Поливайте растения утром.", "Не ставьте цветы на сквозняке.", "Раз в месяц меняйте землю."];
function showAdvice() {
    document.getElementById('plant-advice').innerText = tips[Math.floor(Math.random() * tips.length)];
}
setInterval(showAdvice, 10000);

// 🌍 Переключение языка
const translations = {
    "ru": { "camera": "Камера", "sensor": "Датчик влажности", "calendar": "Календарь", "advice": "Советы" },
    "kk": { "camera": "Камера", "sensor": "Ылғалдылық датчигі", "calendar": "Күнтізбе", "advice": "Кеңестер" },
    "en": { "camera": "Camera", "sensor": "Moisture Sensor", "calendar": "Calendar", "advice": "Advice" }
};

function changeLanguage() {
    let lang = document.getElementById('language').value;
    document.getElementById('camera').querySelector('h2').innerText = translations[lang]["camera"];
    document.getElementById('sensor').querySelector('h2').innerText = translations[lang]["sensor"];
    document.getElementById('calendar').querySelector('h2').innerText = translations[lang]["calendar"];
    document.getElementById('advice').querySelector('h2').innerText = translations[lang]["advice"];
}
