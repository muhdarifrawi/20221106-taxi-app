import { useEffect, useState } from "react";
import axios from 'axios';
import Map from '../map/Map';

function GetTaxi(props) {
    const [taxiData, setTaxiData] = useState();
    const [taxiCoordinates, setTaxiCoordinates] = useState();
    const getTaxiData = async () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let currentDate = new Date()
        currentDate = monthNames[currentDate.getMonth()] + " " + currentDate.getDate()
            + ", " + currentDate.getFullYear() + " " +
            currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()


        let ISODate = new Date(currentDate).toISOString()
        ISODate = ISODate.slice(0, -5)

        const taxiData = await axios.get(
            `https://api.data.gov.sg/v1/transport/taxi-availability?date_time=${ISODate}`
        )

        setTaxiData(taxiData);
        getTaxiCoordinates(taxiData);
    }

    useEffect(() => {
        getTaxiData();
    }, []);

    const getTaxiCoordinates = (taxiData) => {
        let taxiCoordinates = taxiData["data"]["features"][0]["geometry"]["coordinates"];
        let cleanTaxiCoordinates = taxiCoordinates.map(i => i.reverse());
        setTaxiCoordinates(cleanTaxiCoordinates);
    }
    return (
        <Map taxiCoordinates={taxiCoordinates} coordinates={props.coordinates}/>
    )
}

export default GetTaxi;
