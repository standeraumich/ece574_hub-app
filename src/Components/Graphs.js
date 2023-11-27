import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  CategoryScale
} from 'chart.js';
import Axios from 'axios';
import { useState, useEffect } from 'react';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  CategoryScale
)

function Graph(props) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
    },
  };
  const [sensorData, setSensorData] = useState({ sensor: { labels: [], datasets: [] }, DataisLoaded: false })

  async function getAllSensor(sensor) {
    await Axios.get(`http://${process.env.REACT_APP_API_HOST}:3001/sensors`)
      .then((res) => {

        const allData = res.data
        var arrData = []

        for (let i = 0; i < allData.length; i++) {
          let item = allData[i]
          let entry = {}
          if (item['sensor'] == sensor) {
            console.log(item)
            entry['created'] = item.created
            entry['data'] = item.data
            arrData.push(entry)
          }
        }
        setSensorData({
          sensor: {
            labels: arrData.map((data) => data.created),
            datasets: [
              {
                label: "Historical Data",
                data: arrData.map((data) => data.data),
                backgroundColor: [
                  "#f3ba2f"
                ]
              }
            ]
          },
          DataisLoaded: true
        }
        );

        console.log(sensorData['sensor'])
      });
  }
  useEffect(() => {
    getAllSensor(props.sensor)
  }, [])



  return (sensorData['DataisLoaded']) ? (
    <Line options={options} data={sensorData['sensor']} />
  ) : (<h3>Loading...</h3>);
}
export default Graph