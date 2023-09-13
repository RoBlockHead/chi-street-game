import "./app.postcss";
import App from "./App.svelte";

import 'leaflet/dist/leaflet.css';
import 'mapbox.js/dist/mapbox.css';
const app = new App({
  target: document.getElementById("app"),
});

export default app;
