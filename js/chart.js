var map = AmCharts.makeChart( "chartdiv", {
  "type": "map",
  "theme": "none",
  "hideCredits":true,
  "projection": "miller",

  "imagesSettings": {
    "rollOverColor": "pink",
    "rollOverScale": 3,
    "selectedScale": 3,
    "selectedColor": "pink",
    "color": "pink"
  },

  "areasSettings": {
    "unlistedAreasColor": "pink"
  },

  "dataProvider": {
    "map": "worldLow",
    "images": [ {
      "zoomLevel": 5,
      "scale": 0.5,
      "title": "Singapore",
      "latitude": 1.3521,
      "longitude": 103.8198,
      "modal": "foxsports"
    }, {
      "zoomLevel": 5,
      "scale": 0.5,
      "title": "Reston, VA",
      "latitude": 38.9586,
      "longitude": -77.3570,
      "url": "appian.html"
    }, {
      "zoomLevel": 5,
      "scale": 0.5,
      "title": "Boston, MA",
      "latitude": 42.3601,
      "longitude": -71.0589,
      "url": "alchemista.html"
    }, {
      "zoomLevel": 5,
      "scale": 0.5,
      "title": "Hong Kong",
      "latitude": 22.3964,
      "longitude": 114.1095,
    } ]
  }
} );

// add events to recalculate map position when the map is moved or zoomed
map.addListener( "positionChanged", updateCustomMarkers );

// this function will take current images on the map and create HTML elements for them
function updateCustomMarkers( event ) {
  // get map object
  var map = event.chart;

  // go through all of the images
  for ( var x in map.dataProvider.images ) {
    // get MapImage object
    var image = map.dataProvider.images[ x ];

    // check if it has corresponding HTML element
    if ( 'undefined' == typeof image.externalElement )
      image.externalElement = createCustomMarker( image );

    // reposition the element accoridng to coordinates
    var xy = map.coordinatesToStageXY( image.longitude, image.latitude );
    image.externalElement.style.top = xy.y + 'px';
    image.externalElement.style.left = xy.x + 'px';
  }
}

// this function creates and returns a new marker element
function createCustomMarker( image ) {
  // create holder
  var holder = document.createElement( 'div' );
  holder.className = 'map-marker';
  holder.title = image.title;
  holder.style.position = 'absolute';
  
  // create dot
  var dot = document.createElement( 'div' );
  dot.className = 'dot';
  holder.appendChild( dot );

  // create pulse
  var pulse = document.createElement( 'div' );
  pulse.className = 'pulse';
  holder.appendChild( pulse );

  // append the marker to the map container
  image.chart.chartDiv.appendChild( holder );
  
  // to view more information about the project
  if ( undefined != image.modal ) {
    holder.onclick = function() {
      var modal = document.getElementById(image.modal);
      modal.style.display = "block";
      
      // close the modal
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function() {
        modal.style.display = "none";
      }
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
    }
    holder.className += ' map-clickable';
  }

  return holder;
}