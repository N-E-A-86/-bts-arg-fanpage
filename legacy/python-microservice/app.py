from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Habilitar CORS para que el frontend pueda acceder

@app.route('/python-api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Python microservice running healthy!"}), 200

@app.route('/python-api/data', methods=['GET'])
def get_data():
    # Simulación de datos que podrían venir de un scraper o un análisis
    data = {
        "latest_members_activity": [
            {"member": "Jungkook", "activity": "Nueva canción '3D'"},
            {"member": "Jimin", "activity": "Participación en OST de K-Drama"},
            {"member": "RM", "activity": "Lanzamiento de álbum 'Right Place, Wrong Person'"}
        ],
        "argentina_fan_events": [
            {"date": "2025-07-20", "event": "Proyección de concierto 'Yet to Come in Cinemas' en Buenos Aires"},
            {"date": "2025-08-15", "event": "BTS Fan Meeting Virtual con subtítulos en español"}
        ]
    }
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True) # Corre en el puerto 5001 para no chocar con Node.js