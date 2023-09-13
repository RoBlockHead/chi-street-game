<script lang="ts">
  import type { LatLngExpression, MapOptions, TileLayerOptions } from 'leaflet';
  import { onMount } from 'svelte';
  import { LeafletMap, TileLayer } from 'svelte-leafletjs';
  import { distance, getStreetObjects, getStreetsLength, streetsInit } from './streets';
  import type { GeoJsonObject, MultiLineString } from 'geojson';
  import _CHIBoundaries from './CHIBoundaries.geo.json'
  import L, { Layer } from 'leaflet';
    import { guessedLength, streetsGuessed } from './store';
    import { get } from 'svelte/store';
  const CHIBoundaries = _CHIBoundaries as GeoJsonObject;

  let leafletMap: LeafletMap;
  
  const mapOptions: MapOptions = {
    zoom: 11,
    center: [41.8820096,-87.6278269],
    maxBounds: L.geoJson(CHIBoundaries).getBounds().pad(.05),
    maxBoundsViscosity: 100,
    
  }
  const tileLayerOptions: TileLayerOptions = {
    minZoom: 10,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: "© OpenStreetMap contributors",
  };

  const tileUrl = "https://api.mapbox.com/styles/v1/miroreo/clmgzyb1k03sm01qr03g35iud/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlyb3JlbyIsImEiOiJjbG1nenN2dG0wZjBqM2xtZWV4bTR0dDBsIn0.E1tfVUp28fbC2WOWVSEyQg";
  let tileLayer: TileLayer;

  onMount(() => {
    streetsInit();
    // let bounds = new L.GeoJSON(CHIBoundaries, {
    //   attribution: "City of Chicago",
    //   interactive: false,
    //   style: {
    //     // color: "#FF0000",

    //   }
    // });
    // bounds.addTo(leafletMap.getMap());
    const boundCoords = L.GeoJSON.coordsToLatLngs(_CHIBoundaries.geometry.coordinates,2);
    let invertedBounds = boundCoords.slice(0, boundCoords.length)
    console.log(invertedBounds[0])
    invertedBounds.unshift([[0,90],[180,90],[180,-90],[0,-90],[-180,-90],[-180,0],[-180,90],[0,90]])
    const polygon = L.polygon(invertedBounds, {
      color: "#FF0000",
      fillColor: "#121212",
      fillOpacity: 1,
      fill: true

    }).addTo(leafletMap.getMap())

    // CHIBoundaries.geometry
    // let polygon = L.polygon(.coordinates[0]. as LatLngExpression[], {
    //   color: "#FF0000"
    // }).addTo(leafletMap.getMap());

  })
  
  export const addStreet = (name: string) => {
    if(get(streetsGuessed).includes(name.toUpperCase())) {
      alert("You've already guessed that one!")
      return
    }

    let streetObjects = getStreetObjects(name);
    let length = getStreetsLength(streetObjects);
    guessedLength.update((v) => v + length);
    streetsGuessed.update((v) => {
      v.push(name.toUpperCase())
      return v
    });

    L.geoJSON(streetObjects, {
      style: {color: "#FF0000", weight:1},
    }).addTo(leafletMap.getMap());
  }
  const getTotalStreetLength = async () => {
    const CHIStreets = L.geoJson()
  };

  const dist = () => {
    let layer: L.Layer = new Layer({
      attribution: "City of Chicago",
    });
    
  }
</script>

<LeafletMap bind:this={leafletMap} options={mapOptions}>
  <TileLayer bind:this={tileLayer} url={tileUrl} options={tileLayerOptions} />
</LeafletMap>