import React from 'react'
import './Popup.css'

function Graph({ graphName }) {
    if (graphName == "Temperature") {
        return (
            <h3>THIS IS TEMPERATURE GRAPH</h3>
        );
    } else if (graphName == "Humidity") {
        return (
            <h3>THIS IS HUMIDITY GRAPH</h3>
        );
    }
    else {
        return (
            <h2> GRAPH DOES NOT EXIST</h2>
        );
    }
}

function Popup(props) {



    return (props.trigger) ? (
        <div className='popup'>
            <div className="popup-inner">
                <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>
                <Graph graphName={props.graphType} />
            </div>
        </div>
    ) : "";
}

export default Popup