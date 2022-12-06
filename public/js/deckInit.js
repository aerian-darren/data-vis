const countrySettings = {
  uk: {
    initialViewState: {
      longitude: -1.4157,
      latitude: 52.2324,
      zoom: 6,
      minZoom: 5,
      maxZoom: 15,
      pitch: 40.5
    },
    controlPanel: {
      radius: 1000
    },
    dataPath: "../data/uk.csv"
  },
  de: {
    initialViewState: {
      longitude: 9.0,
      latitude: 51,
      zoom: 5,
      minZoom: 4,
      maxZoom: 15,
      pitch: 50
    },
    controlPanel: {
      radius: 10000
    },
    dataPath: "../data/de.csv"
  }
};

function deck1(country) {
  const { DeckGL, HexagonLayer } = deck;

  const settings = countrySettings[country];

  const deckgl = new DeckGL({
    id: "map",
    map: maplibregl,
    mapStyle: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    initialViewState: settings.initialViewState,
    controller: true,
    container: "deck1"
  });

  const data = d3.csv(settings.dataPath);
  //   const data = d3.csv(
  //     "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"
  //   );

  const OPTIONS = ["radius", "coverage", "upperPercentile"];

  const COLOR_RANGE = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];

  OPTIONS.forEach(key => {
    document.getElementById(key).oninput = renderLayer;
  });

  renderLayer();

  function renderLayer() {
    const options = {};
    OPTIONS.forEach(key => {
      const radius = settings.controlPanel.radius;
      if (key === "radius") {
        document.getElementById("radius").value = radius;
        document.getElementById("radius-value").innerHTML = radius;
      }

      const value = +document.getElementById(key).value;
      document.getElementById(key + "-value").innerHTML = value;
      options[key] = value;
    });

    const hexagonLayer = new HexagonLayer({
      id: "heatmap",
      colorRange: COLOR_RANGE,
      data,
      elevationRange: [0, 1000],
      elevationScale: 250,
      extruded: true,
      getPosition: d => [Number(d.lng), Number(d.lat)],
      opacity: 1,
      ...options
    });

    deckgl.setProps({
      layers: [hexagonLayer]
    });
  }
}
