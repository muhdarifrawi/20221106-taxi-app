import './Map.css';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon, LayersControl } from 'react-leaflet'
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function mapArea(index){
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

function Map(props) {
    // import default icon from leaflet
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    const coordinatesOptions = { color: 'blue' }

    let holdingCoordinates = []
    if (props.coordinates !== undefined){
        holdingCoordinates = props.coordinates
    }
    return (
        <div id="map">
            <MapContainer center={[1.3521, 103.8198]}
                zoom={12}
                scrollWheelZoom={true}>
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position='topright'>
                {
                    holdingCoordinates.map((ele, index) =>{
                        return(
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