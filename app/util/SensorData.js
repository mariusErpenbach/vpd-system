export const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-sensor-data'); // Lokale URL
      const data = await response.json();
  
      // Fehlerbehandlung
      if (data.error) {
        console.error('Fehler beim Abrufen der Sensordaten:', data.error);
        return null; // Falls ein Fehler auftritt, gebe null zurück
      }
  
      return data; // Rückgabe der Sensordaten
    } catch (error) {
      console.error('Fehler beim Abrufen der Sensordaten:', error);
      return null; // Bei einem Fehler gebe null zurück
    }
  };
  

  