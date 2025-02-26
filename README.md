# topyraqlab
# topyraq.lab
import { useState } from "react";
npx create-react-app my-smart-garden
cd my-smart-garden
npm install
export default function SmartGardenApp() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});
  const [device, setDevice] = useState(null);
  const [sensorData, setSensorData] = useState(null);

  const handleAddReminder = () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setReminders({ ...reminders, [dateKey]: "Полив растений" });
    }
  };
  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"],
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
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold">Умный сад</h1>
      <button onClick={connectToDevice} className="bg-blue-500 text-white p-2 rounded">
        Подключить устройство
      </button>
      {sensorData !== null && <p>Данные датчика: {sensorData}%</p>}
      <button onClick={handleAddReminder} className="bg-green-500 text-white p-2 rounded">
        Добавить напоминание
      </button>
    </div>
  );
}
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let sensorData = null;

app.post("/update-data", (req, res) => {
  sensorData = req.body.value;
  res.send({ status: "OK" });
});

app.get("/get-data", (req, res) => {
  res.send({ value: sensorData });
});
app.listen(3001, () => console.log("Сервер запущен на порту 3001"));
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}
/my-smart-garden
  ├── src/
  ├── public/
  ├── package.json
  ├── .gitignore
  ├── README.md
