/* globals THREE, altspace, Flickr, moment */

import {param, qs, getImageUrl} from './utils'
import config from '../app.config'

// Create a "Simulation". This just takes care of some app boilerplate for us.
let sim = new altspace.utilities.Simulation();
var image;

// collection of altspace environments
if (param('asvr')) {
	image = qs('#displayImage');
	image.src = '';

	var photos = [
		'https://altspacevr.github.io/360spaces/img/Conference_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Desert_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/DiscGolf_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/DownstairsClub_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Exhibition_01_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Exhibition_02_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Exhibition_03_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Exhibition_04_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Highrise_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/JungleMaze_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Office_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/SketchyQuiz_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Tavern_360_sm.jpg',
		'https://altspacevr.github.io/360spaces/img/Theater_360_sm.jpg'
	];
	var index = 0;

	image.src = photos[index];

	// add a 3D button to the app for flipping through images
	var nextButton = new THREE.Mesh(
		new THREE.BoxGeometry(50, 50, 50),
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
altspace.getDocument().then(doc => {
	// The doc object is a Three.js Mesh that we can manipulate.
	// Here we change its geometry to a sphere instead of the default 2D plane.
	let docGeo = new THREE.SphereGeometry(1, 32, 32);
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
	// if (param('scaled')) {
	// 	doc.scale.multiplyScalar(0.2);
	// 	// Units are in "pixels" by default.
	// 	doc.position.y = -300;
	// };

	// Finally, render it into the app.
	sim.scene.add(doc);
});
