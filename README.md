<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мониторинг растений</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f4f4f4; font-family: Arial, sans-serif; }
        .navbar { background: #2c6e49; }
        .navbar-brand, .nav-link { color: white !important; }
        .section { padding: 50px 20px; text-align: center; }
        video { width: 100%; max-width: 400px; border-radius: 10px; }
        .calendar-table { width: 80%; margin: auto; background: white; border-collapse: collapse; }
        th, td { border: 1px solid black; padding: 10px; text-align: center; }
        .sensor-box { background: white; padding: 20px; margin-top: 20px; border-radius: 10px; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#">Plant Monitor</a>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="#camera">Камера</a></li>
                <li class="nav-item"><a class="nav-link" href="#sensor">Датчик</a></li>
                <li class="nav-item"><a class="nav-link" href="#analysis">Анализ</a></li>
                <li class="nav-item"><a class="nav-link" href="#calendar">Календарь</a></li>
            </ul>
        </div>
    </nav>

    <section id="camera" class="section">
        <h2>Камера</h2>
        <video id="camera-feed" autoplay></video>
        <button class="btn btn-success mt-3" onclick="captureImage()">Сделать фото</button>
        <canvas id="snapshot" style="display:none;"></canvas>
    </section>

    <section id="sensor" class="section">
        <h2>Данные с датчика</h2>
        <button class="btn btn-primary" onclick="connectToDevice()">🔗 Подключить датчик</button>
        <div class="sensor-box">
            <p><strong>📊 Влажность почвы:</strong> <span id="sensor-data">Нет данных</span>%</p>
        </div>
    </section>

    <section id="analysis" class="section">
        <h2>Рекомендации</h2>
        <p id="advice">Здесь появятся советы...</p>
    </section>

    <section id="calendar" class="section">
        <h2>Календарь полива</h2>
        <button class="btn btn-primary mb-3" onclick="addWateringRecord()">Добавить запись</button>
        <table class="calendar-table">
            <tr>
                <th>Дата</th>
                <th>Время</th>
            </tr>
            <tbody id="calendar-body"></tbody>
        </table>
    </section>

    <script>
        // Камера
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            document.getElementById('camera-feed').srcObject = stream;
        }).catch(error => {
            alert('Ошибка доступа к камере! Проверьте настройки браузера.');
        });

        function captureImage() {
            let video = document.getElementById('camera-feed');
            let canvas = document.getElementById('snapshot');
            let context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            alert("Фото сделано!");
        }

        // Bluetooth подключение
        async function connectToDevice() {
            try {
                const device = await navigator.bluetooth.requestDevice({
                    acceptAllDevices: true,
                    optionalServices: ["battery_service"]
                });

                const server = await device.gatt.connect();
                const service = await server.getPrimaryService("battery_service");
                const characteristic = await service.getCharacteristic("battery_level");

                characteristic.startNotifications();
                characteristic.addEventListener("characteristicvaluechanged", (event) => {
                    const value = event.target.value.getUint8(0);
                    document.getElementById("sensor-data").innerText = value;
                });

                alert("✅ Датчик подключен!");
            } catch (error) {
                alert("❌ Ошибка подключения: " + error);
            }
        }

        // Добавление записи в календарь
        function addWateringRecord() {
            let table = document.getElementById("calendar-body");
            let row = table.insertRow();
            let dateCell = row.insertCell(0);
            let timeCell = row.insertCell(1);
            let now = new Date();
            dateCell.innerText = now.toLocaleDateString();
            timeCell.innerText = now.toLocaleTimeString();
        }
    </script>
</body>
</html>
body { 
    background-color: #f4f4f4; 
    font-family: Arial, sans-serif; 
    margin: 0; 
    padding: 0; 
}

.navbar { 
    background: #2c6e49; 
    padding: 15px;
}

.navbar-brand, .nav-link { 
    color: white !important; 
    font-weight: bold;
}

.section { 
    padding: 50px 20px; 
    text-align: center; 
}

video { 
    width: 100%; 
    max-width: 400px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.calendar-table { 
    width: 80%; 
    margin: auto; 
    background: white; 
    border-collapse: collapse; 
}

th, td { 
    border: 1px solid black; 
    padding: 10px; 
    text-align: center; 
}

.sensor-box { 
    background: white; 
    padding: 20px; 
    margin-top: 20px; 
    border-radius: 10px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
