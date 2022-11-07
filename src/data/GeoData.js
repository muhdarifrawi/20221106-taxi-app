import {useEffect, useState} from "react";
import axios from 'axios';

import Map from '../map/Map';
import { hasPointerEvents } from "@testing-library/user-event/dist/utils";

function GeoData(){
    // declare states
    const [data, setData] = useState();
    const [coordinates, setCoordinates] = useState();

    const getData = async() => {
        const {data} = await axios.get(
            "master-plan-2019-region-boundary-no-sea/master-plan-2019-region-boundary-no-sea-geojson.geojson"
            );
        // let newData = JSON.stringify(data["features"][0]["geometry"]["coordinates"])
        setData(data);
        
        getCoordinates(data);
        
    }
    
    useEffect(() => {
        getData();
    }, []);

    const getCoordinates = (data) => {
        let compiledCoordinates = []
        console.log("coordinates")
        for(let i=0; i < data.features.length; i++){
            // console.log(i, data.features[i])
            let level1 = data.features[i]
            // console.log(level1["geometry"]["coordinates"])
            for(let j=0; j < level1["geometry"]["coordinates"].length; j++){
                // console.log(j, level1["geometry"]["coordinates"][j][0])
                let level2 = level1["geometry"]["coordinates"][j][0]
                // for(let k=0; k < level2.length; k++){
                //     // console.log(k, level2[k])
                //     let holder = []
                //     console.log(holder)
                //     let eachCoordinate = [level2[k][1], level2[k][0]]
                //     holder.push(eachCoordinate);
                //     console.log(holder)
                //     compiledCoordinates.push(holder);
                // }
                // console.log(j, level2)
                let cleanCoordinate = level2.map(i => i.slice(0,-1).reverse())
                // console.log(cleanCoordinate)
                compiledCoordinates.push(cleanCoordinate)
            }
        }
        // console.log(compiledCoordinates)
        setCoordinates(compiledCoordinates);
    }
    
    return (
        <Map coordinates={coordinates}/>
    )
}

export default GeoData;