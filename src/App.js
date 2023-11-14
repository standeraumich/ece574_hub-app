import { useEffect, useState } from 'react';
import Axios from 'axios'


export default function App() {

  const [sensorData, setSensorData] = useState({ sensors: [], DataisLoaded: false })

  async function updateSensorLatest() {
    await Axios.get(`http://${process.env.REACT_APP_API_HOST}:3001/sensors/latest`)
      .then((res) => {
        setSensorData({
          sensors: res.data,
          DataisLoaded: true
        })
      });
  }

  function renderSensors() {
    const { DataisLoaded, sensors } = sensorData;
    if (!DataisLoaded) {
      return <div>Loading...</div>
    }
    else {
      return sensors.map((val, key) => {
        return <div key={key}>{val.sensor} | {val.data}</div>
      });
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSensorData({
        sensors: sensorData.sensors,
        DataisLoaded: false
      })
      updateSensorLatest();
    }, 5000)
    return () => clearInterval(intervalId);
  }, [sensorData.sensors])

  return (
    <div className="App">
      <div className='temperature-display-container'>
        <div className='temperature-display'>{sensorData.sensors['thermistor']}</div>
      </div>
      <div className='button-container'>
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  );

}