import './Map.css';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon, LayersControl } from 'react-leaflet'
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


function Map(props) {
    // import default icon from leaflet
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    const coordinatesOptions = { color: 'blue' }
    // const polyline = [
    //     [103.7413428293, 1.15996825144986],
    //     [103.741299851279, 1.15978016934132],
    //     [103.741260919125, 1.15978885810629]
    // ]
    // console.log("Map", props.coordinates)
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
                            <LayersControl.Overlay checked name={index}>
                                <Polygon pathOptions={coordinatesOptions} positions={ele || []} />
                            </LayersControl.Overlay>
                            
                        )
                    })
                }
                </LayersControl>
                
                {/* <Polygon pathOptions={coordinatesOptions} positions={props.coordinates || []} /> */}
                {/* <Marker position={[1.3521, 103.8198]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    )
}

export default Map;