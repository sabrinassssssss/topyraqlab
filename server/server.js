const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let sensorData = null;

// Получение данных от датчика
app.post("/update-data", (req, res) => {
    sensorData = req.body.value;
    res.send({ status: "OK" });
});

// Отправка данных на фронтенд
app.get("/get-data", (req, res) => {
    res.send({ value: sensorData });
});

// Запуск сервера
app.listen(3001, () => console.log("Сервер запущен на порту 3001"));
