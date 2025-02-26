function SmartGardenApp() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});
  const [device, setDevice] = useState(null);
  const [sensorData, setSensorData] = useState(null);

  // Добавление напоминания
  const handleAddReminder = () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setReminders({ ...reminders, [dateKey]: "Полив растений 💧" });
    }
  };

  // Подключение Bluetooth устройства
  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"], // Сервис для получения данных
      });

      setDevice(device);
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("battery_service");
      const characteristic = await service.getCharacteristic("battery_level");

      characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = event.target.value.getUint8(0);
        setSensorData(value);
      });
    } catch (error) {
      console.error("Ошибка подключения:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "20px" }}>
      <h1>🌱 Умный сад</h1>
      <button onClick={connectToDevice} style={buttonStyle}>
        🔗 Подключить устройство
      </button>
      {sensorData !== null && (
        <p>📊 Данные датчика: <strong>{sensorData}%</strong></p>
      )}
      <div>
        <h3>Добавить напоминание:</h3>
        <input
          type="date"
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
        <button onClick={handleAddReminder} style={buttonStyle}>
          ➕ Добавить
        </button>
      </div>
      <div>
        <h3>📅 Напоминания:</h3>
        <ul>
          {Object.keys(reminders).map((date) => (
            <li key={date}>{date}: {reminders[date]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
};

export default SmartGardenApp;
import React from "react";
import ReactDOM from "react-dom";
import SmartGardenApp from "./App";

ReactDOM.render(
  <React.StrictMode>
    <SmartGardenApp />
  </React.StrictMode>,
  document.getElementById("root")
);
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Умный сад</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
