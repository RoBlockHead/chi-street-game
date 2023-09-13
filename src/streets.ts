import type { Feature, FeatureCollection, GeoJsonObject, GeoJsonProperties, Geometry, MultiLineString } from 'geojson';
// import streetsRaw from './chicagostreets.geo.json';
import L, { Point, type Coords } from 'leaflet';
const streetsRes = fetch("http://chidatarepo.tessa.ooo/chicagostreets.geo.json");
let streetsRaw; 
streetsRes.then(async (res) => {
    if(res.status == 200) streetsRaw = await res.json();
})
interface CHIFeature<G extends Geometry | null = Geometry, P = GeoJsonProperties> extends Feature {
    geometry: G,
    properties: P & {
        ewns_dir: "E" | "W" | "N" | "S"
        street_nam: string,
        street_typ: string,
    }
}

interface CHIFeatureCollection<G extends Geometry | null = Geometry, P = GeoJsonProperties> extends GeoJsonObject {
    type: 'FeatureCollection';
    features: Array<CHIFeature<G, P>>;
}

const allStreets: CHIFeatureCollection = streetsRaw as CHIFeatureCollection;


export const listStreets = (n: number) => {
    let skip = 0;
    for(let i = 0; i <= 100; i++) {
        console.log(allStreets.features[i].properties.street_nam)
    }
}

export const getStreetObjects = (name: string) => {
    let objs: FeatureCollection = {
        type: "FeatureCollection",
        features: []
    };
        // let [direction, ...streetNameSegs] = name.split(' ');
        // console.log(`${direction} ${streetNameSegs}`);
    // let streetName = streetNameSegs.join(" ");
    allStreets.features.forEach((val, ind) => {
        // if(val.properties.ewns_dir == null) direction = null;
        // if(val.properties.ewns_dir != direction) return;
        if(val.properties.street_nam?.toLowerCase() != name.toLowerCase()) return;

        objs.features.push(val);
    })
    return objs
}

export const getStreetsLength = (streets: FeatureCollection) => {
    let totalLength = 0;
    let streetCount = 0;
    streets.features.forEach(street => {
        streetCount++;
        (street.geometry as MultiLineString).coordinates[0]?.forEach((coord, ind, arr) => {
            if(ind == 0) return;
            let lon = coord[0];
            let lat = coord[1];
            totalLength += L.latLng(lat, lon).distanceTo(L.latLng(arr[ind-1][1],arr[ind-1][0]))
            // totalLength += distance(lat, lon, arr[ind-1][1], arr[ind-1][0])
        })
    })
    console.log(streetCount);
    return totalLength * 0.00062137;
}
export const streetsInit = () => {
    console.log("Total Street Length: " + getStreetsLength(allStreets));
}
// export const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
//     const R = 6371000
//     // let a = Math.pow(
//     //             Math.sin(
//     //                 Math.abs(lat1-lat2)/2
//     //             ), 2) 
//     //         + istance(λ1,φ1,λ2,φ2) {
//     var R = 6371000;
//     let Δλ = (λ2 - λ1) * Math.PI / 180;
//     φ1 = φ1 * Math.PI / 180;
//     φ2 = φ2 * Math.PI / 180;
//     var x = Δλ * Math.cos((φ1+φ2)/2);
//     var y = (φ2-φ1);
//     var d = Math.sqrt(x*x + y*y);
//     return R * d;
// };Math.cos(lat1)*Math.cos(lat2)
//     //         * Math.pow(Math.sin(Math.abs(lon1 - lon2)/2), 2)
//     //         // the above formula is a = sin^2(Δlat)+cos(lat1)cos(lat2)sin^2(Δlon/2)
//     // let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//     // let d = R * c
//     let dLat = (lat2 - lat1) * Math.PI / 180;
//     lon1 = lon1 * Math.PI / 180;
//     lon2 = lon2 * Math.PI / 180;
//     let x = dLat * Math.cos((lon1 + lon2)/2);
//     let y = lon2 - lon1;
//     let d = Math.sqrt(x*x + y*y);
//     return R * d;
// }

export function distance(λ1,φ1,λ2,φ2) {
    var R = 6371000;
    let Δλ = (λ2 - λ1) * Math.PI / 180;
    φ1 = φ1 * Math.PI / 180;
    φ2 = φ2 * Math.PI / 180;
    var x = Δλ * Math.cos((φ1+φ2)/2);
    var y = (φ2-φ1);
    var d = Math.sqrt(x*x + y*y);
    return R * d;
};