// Подключение камеры
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => document.getElementById('camera-feed').srcObject = stream)
    .catch(error => alert('Ошибка доступа к камере!'));

// Снимок с камеры
function captureImage() {
    let video = document.getElementById('camera-feed');
    let canvas = document.getElementById('snapshot');
    let context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    alert("Фото сделано!");
}

// Датчик влажности (имитация получения данных)
function updateSensor() {
    let value = Math.floor(Math.random() * 100);
    document.getElementById("sensor-data").innerText = "Влажность почвы: " + value + "%";
}
setInterval(updateSensor, 3000);

// Календарь с напоминанием
function setReminder() {
    alert("Напоминание о поливе установлено!");
}

// Советы по уходу
function getAdvice() {
    let plant = document.getElementById("plant-select").value;
    let adviceText = document.getElementById("advice-text");
    
    let advice = {
        "rose": "Розы любят солнечный свет и регулярный полив.",
        "cactus": "Кактусы не нуждаются в частом поливе, поливайте раз в 2 недели.",
        "orchid": "Орхидеи требуют высокой влажности и рассеянного света."
    };

    adviceText.innerText = advice[plant] || "Выберите растение.";
}

// Переключение языков
function changeLanguage() {
    let lang = document.getElementById("language").value;
    let translations = {
        "ru": { "camera": "Камера", "sensor": "Датчик", "calendar": "Календарь полива", "advice": "Советы" },
        "kk": { "camera": "Камера", "sensor": "Датчик", "calendar": "Суару күнтізбесі", "advice": "Кеңестер" },
        "en": { "camera": "Camera", "sensor": "Sensor", "calendar": "Watering Calendar", "advice": "Tips" }
    };
    
    document.getElementById("nav-camera").innerText = translations[lang].camera;
    document.getElementById("nav-sensor").innerText = translations[lang].sensor;
    document.getElementById("nav-calendar").innerText = translations[lang].calendar;
    document.getElementById("nav-advice").innerText = translations[lang].advice;
}
