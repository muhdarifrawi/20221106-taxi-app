import {useEffect, useState} from "react";
import axios from 'axios';

import Taxi from './Taxi';
import { hasPointerEvents } from "@testing-library/user-event/dist/utils";

function GeoData(){
    // declare states
    const [data, setData] = useState();
    const [coordinates, setCoordinates] = useState();

    const getData = async() => {
        const {data} = await axios.get(
            "master-plan-2019-region-boundary-no-sea/master-plan-2019-region-boundary-no-sea-geojson.geojson"
            );

        setData(data);
        getCoordinates(data);
    }
    
    useEffect(() => {
        getData();
    }, []);

    const getCoordinates = (data) => {
        let compiledCoordinates = []
        for(let i=0; i < data.features.length; i++){
            let level1 = data.features[i]
            for(let j=0; j < level1["geometry"]["coordinates"].length; j++){
                let level2 = level1["geometry"]["coordinates"][j][0]
                let cleanCoordinate = level2.map(i => i.slice(0,-1).reverse())
                compiledCoordinates.push(cleanCoordinate)
            }
        }
        setCoordinates(compiledCoordinates);
    }
    
    return (
        <Taxi coordinates={coordinates}/>
    )
}

export default GeoData;