#!/usr/bin/env python3
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import RPi.GPIO as GPIO
import time
import threading
import adafruit_dht
import board
from datetime import datetime
import cv2

app = Flask(__name__)
CORS(app)

# GPIO setup für das Relais
RELAY_PIN = 27
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT)

# Setup für den DHT22 Sensor
dht_device = adafruit_dht.DHT22(board.D4)

# Initiale Werte
fan_status = False
humidity_threshold = 60  # Anfangs-Schwellenwert für Luftfeuchtigkeit
min_runtime = 300  # Mindestlaufzeit für Ventilator in Sekunden (5 Minuten)
last_on_time = 0  # Zeitpunkt, zu dem der Ventilator zuletzt eingeschaltet wurde
current_humidity = 50  # Initialer Feuchtigkeitswert für die Logik

# Funktionen zum Ein- und Ausschalten des Relais
def relais_on():
    global fan_status, last_on_time
    GPIO.output(RELAY_PIN, GPIO.HIGH)
    fan_status = True
    last_on_time = time.time()
    return "Relais eingeschaltet"

def relais_off():
    global fan_status
    GPIO.output(RELAY_PIN, GPIO.LOW)
    fan_status = False
    return "Relais ausgeschaltet"

# Funktion zur Abfrage der Sensorwerte
def fetch_sensor_data():
    global current_humidity
    try:
        temperature_c = dht_device.temperature
        current_humidity = dht_device.humidity
        timestamp = datetime.now().isoformat()

        return {
            "temperature": temperature_c,
            "humidity": current_humidity,
            "timestamp": timestamp
        }
    except RuntimeError as err:
        return {"error": str(err)}

# Hintergrund-Thread zur Überwachung der Luftfeuchtigkeit und Steuerung des Relais
def monitor_humidity():
    global fan_status, last_on_time, current_humidity
    while True:
        # Aktuelle Sensorwerte abrufen
        sensor_data = fetch_sensor_data()
        if "error" not in sensor_data:
            current_humidity = sensor_data["humidity"]

            # Logik zur Relaissteuerung basierend auf Luftfeuchtigkeit
            if current_humidity > humidity_threshold and not fan_status:
                relais_on()
            elif fan_status and time.time() - last_on_time >= min_runtime:
                if current_humidity <= humidity_threshold:
                    relais_off()

        time.sleep(10)  # Überprüfung alle 10 Sekunden

# API-Route zum Abrufen des Sensorstatus
@app.route('/get-sensor-data', methods=['GET'])
def get_sensor_data():
    sensor_data = fetch_sensor_data()
    if "error" in sensor_data:
        return jsonify(sensor_data), 500
    else:
        return jsonify(sensor_data), 200

# API-Route zum Abfragen des aktuellen Relaisstatus
@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        "fan_status": "on" if fan_status else "off",
        "current_humidity": current_humidity
    })

# API-Route zum Setzen des Schwellenwerts für die Luftfeuchtigkeit
@app.route('/set_humidity_threshold', methods=['POST'])
def set_humidity_threshold():
    global humidity_threshold
    data = request.get_json()
    if 'threshold' in data:
        humidity_threshold = data['threshold']
        return jsonify({"message": "Humidity threshold updated", "new_threshold": humidity_threshold}), 200
    else:
        return jsonify({"error": "Threshold value required"}), 400

# Falls der Server heruntergefahren wird
@app.route('/shutdown')
def shutdown():
    GPIO.cleanup()
    return "Server und GPIO-Pins wurden zurückgesetzt"

# API-Route für den MJPEG Stream
@app.route('/video_feed')
def video_feed():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Funktion, die den MJPEG-Stream generiert
def generate_video():
    cap = cv2.VideoCapture(0)  # Verwende /dev/video0 für die Logitech Webcam
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # JPEG-Frame kodieren
        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue

        # Frame als JPEG streamen
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

# Starte den Hintergrund-Thread zur Luftfeuchtigkeitsüberwachung
if __name__ == "__main__":
    monitoring_thread = threading.Thread(target=monitor_humidity)
    monitoring_thread.daemon = True
    monitoring_thread.start()
    app.run(host="0.0.0.0", port=5001)
