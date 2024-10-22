import { fetchSensorReadingsFromDB } from "../scripts/fetchSensorData";
import { useEffect, useState } from "react";
export default function  SensorDataGraph () {
    const [graphData, setGraphData] = useState([])
    
    const fetchData = async () => {
        try {
          const data = await fetchShopProducts();
          const productsData = data.map( row=> ({
            id: row.id,
            name: row.name,
            price: row.price,
          }));
          setProducts(productsData);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    
    return (
        <div id="sensorDataGraph">
            <h1>sensor data graph</h1>

        </div>
    )
} 