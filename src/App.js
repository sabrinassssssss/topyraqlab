import React, { useState } from "react";
import "./App.css"; // Подключаем стили

function SmartGardenApp() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [reminders, setReminders] = useState({});
    const [sensorData, setSensorData] = useState(null);

    // Функция добавления напоминания
    const handleAddReminder = () => {
        if (selectedDate) {
            const dateKey = selectedDate.toISOString().split("T")[0];
            setReminders({ ...reminders, [dateKey]: "Полив растений" });
        }
    };

    // Подключение к Bluetooth-датчику
    const connectToDevice = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ["battery_service"],
            });
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService("battery_service");
            const characteristic = await service.getCharacteristic("battery_level");
            
            // Подписка на изменения
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
        <div className="container">
            <h1>TopyraqLab – Умный сад</h1>
            
            {/* Кнопка подключения к датчику */}
            <button onClick={connectToDevice} className="btn btn-success">
                Подключить устройство
            </button>

            {/* Отображение данных датчика */}
            {sensorData !== null && <p>Данные датчика: {sensorData}%</p>}

            {/* Календарь и напоминания */}
            <div>
                <input type="date" onChange={(e) => setSelectedDate(new Date(e.target.value))} />
                <button onClick={handleAddReminder} className="btn btn-primary">
                    Добавить напоминание
                </button>
            </div>
        </div>
    );
}

export default SmartGardenApp;
