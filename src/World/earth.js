import {TextureLoader} from 'three';
import {SphereGeometry} from 'three';
import {MeshBasicMaterial} from 'three';
import {MeshStandardMaterial} from 'three';
import {MeshPhongMaterial} from 'three';
import {SRGBColorSpace} from 'three';
import {Mesh} from 'three';

function createMaterial() {
	const loader = new TextureLoader();
	const albedo = loader.load('Albedo-texture.jpg');
	const bumpMap = loader.load('Bump-texture.jpg');
	const cloudsMap = loader.load('Clouds-texture.png');
	const oceanMap = loader.load('Clouds-texture.png');
	albedo.colorSpace = SRGBColorSpace;
	const material = new MeshStandardMaterial({
		map: albedo,
		bumpMap: bumpMap,
		bumpScale: 0.05,
		metalnessMap: oceanMap,
		metalness: 0.8,
	});
	return material;
}

function createEarth() {
	const material = createMaterial();
	const geometry = new SphereGeometry(2, 100, 100);
	const earth = new Mesh(geometry, material);
	earth.position.set(0, 0, 0);
	return earth;
}

export {createEarth};
