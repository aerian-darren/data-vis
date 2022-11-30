function globe1() {
  const catColor = d3.scaleOrdinal(
    d3.schemeCategory10.map(col => polished.transparentize(0.2, col))
  );

  const getAlt = d => d.population * 5e-8;

  //   const getTooltip = d => `
  //       <div style="text-align: center">
  //         <div><b>${d.name}</b>, ${d.country}</div>
  //         <div>(${d.type})</div>
  //         <div>Elevation: <em>${d.elevation}</em>m</div>
  //       </div>
  //     `;
  const weightColor = d3
    .scaleSequentialSqrt(d3.interpolateYlOrRd)
    .domain([0, 1e7]);

  const myGlobe = Globe()
    .height(500) //todo can this be done better?
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
    .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
    .pointLat("lat")
    .pointLng("lon")
    .pointAltitude(getAlt)
    .pointRadius(0.12)
    .pointColor(d => weightColor(d.population))(
    document.getElementById("globe1")
  );
  // .pointLabel(getTooltip)
  // .labelLat("lat")
  // .labelLng("lon")
  // .labelAltitude(d => getAlt(d) + 1e-6)
  // .labelDotRadius(0.12)
  // .labelDotOrientation(() => "bottom")
  // .labelColor(d => catColor(d.type))
  // .labelText("name")
  // .labelSize(0.15)
  // .labelResolution(1)
  // .labelLabel(getTooltip)(document.getElementById("globe1"));

  //controls
  myGlobe.controls().autoRotate = true;
  myGlobe.controls().autoRotateSpeed = 0.6;
  myGlobe.controls().enableZoom = false;

  let timer;

  const getData = (amount, i = 0) => {
    console.log("i", i);
    clearTimeout(timer);

    if (i > amount) {
      i = 0;
    }
    const datax = d3
      .json(
        `../data/world_population${i}.json`
        // ({ lat, lon, population }) => ({
        //   lat: +lat,
        //   lon: +lon,
        //   population: +population
        // })
      )
      .then(data => {
        // console.log("myGlobe", myGlobe);
        populationData = [];
        populationData = [...data];
        // console.log("populationData", populationData[1]);
        myGlobe.pointsTransitionDuration(4000);
        myGlobe.pointsData(populationData);
      });

    i++;

    timer = setTimeout(getData, 6000, amount, i);
  };

  getData(5);
}
function numbers1() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = `${Math.ceil(count + increment)}`;
        setTimeout(updateCounter, 1);
      } else counter.innerText = target;
    };
    updateCounter();
  });
}

function title() {
  // Wrap every letter in a span
  var textWrapper = document.querySelector(".ml1 .letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: false })
    .add({
      targets: ".ml1 .letter",
      scale: [0.3, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 3200,
      delay: (el, i) => 270 * (i + 1)
    })
    .add({
      targets: ".ml1 .line",
      scaleX: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 2500,
      offset: "-=875",
      delay: (el, i, l) => 280 * (l - i)
    });
  // .add({
  //     targets: ".ml1",
  //     opacity: 0,
  //     duration: 1000,
  //     easing: "easeOutExpo",
  //     delay: 1000,
  // });
}
