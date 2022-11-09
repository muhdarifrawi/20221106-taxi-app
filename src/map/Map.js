import './Map.css';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon, LayersControl } from 'react-leaflet'
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useState } from "react";

// imports needed for marker cluster
import '@changey/react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

// point in polygon package
import pointInPolygon from 'point-in-polygon';

function Map(props) {
    const [locationChoice, setLocationChoice] = useState("0");

    function mapArea(index) {
        let mapAreaArr = [
            "Pulau Satumu (dock)",
            "Pulau Satumu",
            "Island Southeast of Pulau Senang",
            "Pulau Senang",
            "Sea Area, East of Pulau Pawai",
            "Sea Area, North of Pulau Pawai",
            "Pulau Pawai",
            "Sea Area, West of Pulau Semakau",
            "Pulau Sebarok",
            "Pulau Sudong",
            "Pulau Jong",
            "Pulau Salu",
            "Pulau Semakau",
            "Pulau Hantu Kecil",
            "Pulau Hantu Besar",
            "Pulau Busing",
            "West of Sultan Shoal",
            "Sultan Shoal",
            "Pulau Bukom",
            "Pulau Pergam",
            "West of Singapore",
            "Pulau Sarimbun",
            "Pulau Seletar",
            "North of Singapore",
            "Pulau Ketam",
            "Pulau Ubin",
            "North-East of Singapore",
            "Sea Area, North-East of Pulau Tekong",
            "Pulau Tekong",
            "Sea Area, South-East of Singapore",
            "Sea Area, East of Singapore",
            "East of Singapore",
            "Pulau Subar Laut (Breakwater)",
            "Pulau Subar Laut",
            "Pulau Subar Darat",
            "South of Pulau Kusu (Breakwater)",
            "Pulau Kusu",
            "North of Pulau Kusu (Breakwater)",
            "St. John's Island, Lazarus Island, Pulau Renget",
            "Pulau Tekukor",
            "South of Sentosa (Breakwater)",
            "Sea Area, South-East of Sentosa",
            "Southernmost Point of Continental Asia",
            "Island, South-West of Sentosa",
            "South-West of Sentosa (Breakwater)",
            "South-West of Sentosa (Breakwater)",
            "South-West of Sentosa (Breakwater)",
            "Sea Area, North of Sentosa",
            "South of Singapore"
        ]

        return mapAreaArr[index]
    }

    function taxiCounts(ele) {
        let numberTaxis = ele.length;
        return numberTaxis
    }

    function handleLocation(event) {
        setLocationChoice(event.target.value)
    }
    // import default icon from leaflet
    let DefaultIcon = L.icon({
        iconUrl: "./icons/taxi-colored.png",
        iconSize: [30, 30],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const coordinatesOptions = { color: '#434A42' }

    let holdingCoordinates = []
    if (props.coordinates !== undefined) {
        holdingCoordinates = props.coordinates
    }

    let holdingTaxiCoordinates = []
    if (props.taxiCoordinates !== undefined) {
        holdingTaxiCoordinates = props.taxiCoordinates
    }
    return (
        <div id="map">
            <button id="info-btn" class="btn btn-light leaflet-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasInfo" aria-controls="offcanvasInfo">
                Show Info
            </button>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasInfo" aria-labelledby="offcanvasInfoLabel">
                <div class="offcanvas-header">
                    <span class="offcanvas-title" id="offcanvasInfoLabel">
                        <img id="infoIcon" src="./icons/taxi-colored.png" />
                        <span id="taxiNumbers" class="badge bg-primary align-middle ms-2">
                            {taxiCounts(holdingTaxiCoordinates)}
                        </span>
                    </span>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body pt-1">
                    <div>
                        <select class="form-select" aria-label="Default select example" onChange={handleLocation}>
                            <option checked value="0">Available Locations</option>
                            <option value="1">All Locations</option>
                        </select>
                    </div>
                    <div class="container my-3">
                        {
                            holdingCoordinates.map((ele, index) => {
                                let taxiLocationCount = holdingTaxiCoordinates.filter((eleT) => {
                                    return pointInPolygon(eleT, ele)
                                }).length
                                let condition = "";
                                if (locationChoice === "0") {
                                    condition = taxiLocationCount != 0
                                }
                                else if (locationChoice === "1") {
                                    condition = taxiLocationCount >= 0
                                }
                                else {
                                    console.log("Location choice error")
                                }
                                let percentageConv = Math.floor((taxiLocationCount * 100)/taxiCounts(holdingTaxiCoordinates))
                                
                                if (condition) {
                                    return (
                                        <div>
                                            <div class="mt-1 mb-1">{mapArea(index)} </div>
                                            <div class="progress mb-2" style={{height: "20px"}}>
                                                <div class="progress-bar" role="progressbar" 
                                                aria-label="Example 20px high"
                                                style={{width:percentageConv + "%"}} 
                                                aria-valuenow={percentageConv}
                                                aria-valuemin="0" 
                                                aria-valuemax="100">
                                                {taxiLocationCount}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div class="offcanvas-header d-flex justify-content-start">
                    <a href="https://github.com/muhdarifrawi/20221106-taxi-app" class="social-media me-3">
                        <img src="./icons/github.png" style={{height: "32px"}}/>
                    </a>
                    <a href="https://www.linkedin.com/in/arif-rawi-9661aa192/" class="social-media me-3">
                        <img src="./icons/linkedin.png" style={{height: "32px"}}/>
                    </a>
                </div>
            </div>
            <MapContainer center={[1.3521, 103.8198]}
                zoom={12}
                scrollWheelZoom={true}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup>
                    {
                        holdingTaxiCoordinates.map((ele, index) => {
                            return (
                                <Marker position={ele || []}>
                                </Marker>
                            )
                        })
                    }
                </MarkerClusterGroup>

                <LayersControl position='topright'>
                    {
                        holdingCoordinates.map((ele, index) => {
                            return (
                                <LayersControl.Overlay checked name={mapArea(index)}>
                                    <Polygon pathOptions={coordinatesOptions} positions={ele || []} />
                                </LayersControl.Overlay>

                            )
                        })
                    }
                </LayersControl>
            </MapContainer>
        </div>
    )
}

export default Map;