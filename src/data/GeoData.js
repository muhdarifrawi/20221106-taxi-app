import {useEffect, useState} from "react";
import axios from 'axios';

function GeoData(){
    // declare states
    const [data, setData] = useState("");

    const getData = async() => {
        const {data} = await axios.get(
            "master-plan-2019-region-boundary-no-sea/master-plan-2019-region-boundary-no-sea-geojson.geojson"
            );
        setData(data);
    }
    
    useEffect(() => {
        getData();
    }, []);

    console.log(JSON.stringify(data))
}

export default GeoData;