from flask import Flask, request, jsonify
from flask_cors import CORS
import RPi.GPIO as GPIO

app = Flask(__name__)
CORS(app)  # Aktiviere CORS f  r die gesamte App

# GPIO setup
RELAY_PIN = 27  # Der GPIO-Pin, an dem dein Relais angeschlossen ist
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT)

# Initiale Werte
fan_status = False  # Der aktuelle Status des Ventilators
humidity_threshold = 60  # Anfangsschwellenwert f  r Luftfeuchtigkeit

# Funktionen zum Ein- und Ausschalten des Relais
def relais_on():
    global fan_status
    GPIO.output(RELAY_PIN, GPIO.HIGH)
    fan_status = True
    return "Relais eingeschaltet"

def relais_off():
    global fan_status
    GPIO.output(RELAY_PIN, GPIO.LOW)
    fan_status = False
    return "Relais ausgeschaltet"

# API-Route zum Einschalten des Relais
@app.route('/on')
def turn_on():
    return relais_on()

# API-Route zum Ausschalten des Relais
@app.route('/off')
def turn_off():
    return relais_off()

# API-Route zum Abfragen des aktuellen Relaisstatus
@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        "fan_status": "on" if fan_status else "off"
    })

# API-Route zum Setzen des Schwellenwerts f  r die Luftfeuchtigkeit
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
    return "Server und GPIO-Pins wurden zur  ckgesetzt"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)


