import { useEffect, useState } from "react";
import axios from 'axios';

function GetTaxi() {
    const [taxiData, setTaxiData] = useState();
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
        console.log(taxiData);
        getTaxiCoordinates(taxiData);
    }

    useEffect(() => {
        getTaxiData();
    }, []);

    const getTaxiCoordinates = (taxiData) => {
        console.log(taxiData["data"]["features"][0]["geometry"]["coordinates"])
    }

}

export default GetTaxi;
