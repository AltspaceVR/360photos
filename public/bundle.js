(function () {
'use strict';

function qs(s) {
	return document.querySelector(s);
}

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) { url = window.location.href; }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) { return null; }
    if (!results[2]) { return ''; }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* globals THREE, altspace, Flickr, moment */

// default data url, images of altspace environments
var url = getParameterByName('collection') || 'https://altspacevr.github.io/360photos/public/asvr.json';

// Create a "Simulation". This just takes care of some app boilerplate for us.
var sim = new altspace.utilities.Simulation();

$.getJSON(url, function( data ) {
  render(data['photos']);
});

function render (photos) {
	var index = 0;
  var image = qs('#displayImage');
  image.src = photos[index];

  // add a 3D button to the app for flipping through images
  var nextButton = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 30),
    new THREE.MeshBasicMaterial({color: '#2196F3'})
  );
  nextButton.position.y = -300;

  // We can listen to events on 3D objects.
  nextButton.addEventListener('cursorup', function () {
    index = (index + 1) % photos.length;
    image.src = photos[index];
  });

  sim.scene.add(nextButton);
}

// Use the Altspace API to retrieve the "document".
// This represents the content of the webpage loaded in the Altspace enclosure.
altspace.getDocument().then(function (doc) {
  // The doc object is a Three.js Mesh that we can manipulate.
  // Here we change its geometry to a sphere instead of the default 2D plane.
  var docGeo = new THREE.SphereGeometry(1, 32, 32);
  doc.geometry = docGeo;
  doc.geometry.verticesNeedUpdate = true;

  // Set some more properties on the mesh so that the 360 image
  // displays correctly.
  doc.material.side = THREE.BackSide;
  doc.material.transparent = false;
  doc.scale.x = -1;

  // Disable cursor interactions on the mesh.
  doc.userData.altspace = { collider: { enabled: false } };

  // Optionally scale and reposition the sphere.
  // doc.scale.multiplyScalar(0.9);
  // Units are in "pixels" by default.
  // doc.position.y = -300;

  // Finally, render it into the app.
  sim.scene.add(doc);
});

}());
