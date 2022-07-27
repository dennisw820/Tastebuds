//Get User loctaion
/*
if("geolocation" in navigator) {
    console.log('Location available!');
    navigator.geolocation.getCurrentPosition(function getLocation(position) {
        var location = (position.coords.latitude, position.coords.longitude);
    });
}
else {
    console.log('Location unavailable.');
}
*/

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
 // TO MAKE THE MAP APPEAR YOU MUST
        // ADD YOUR ACCESS TOKEN FROM
        // https://account.mapbox.com
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
const bounds = [
    [-123.069003, 45.395273],
    [-122.303707, 45.612333]
];
map.setMAxBounds(bounds);
const start = [-122.662323, 45.523751];

async getRoute(start, end) => {
    const query = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${},${};${},${}?steps=true&geometries=geojson&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
    {method: 'GET'}
    );
    const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
  // add turn instructions here at the end
}

map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });
  // this is where the code from the next step will go
});

}