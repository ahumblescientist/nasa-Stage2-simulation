import { PerspectiveCamera } from 'three';

function createCamera() {
	const camera = new PerspectiveCamera(35, 1, 0.1, 100);
	camera.position.set(0, 0, 10);
	let t = 0;
	camera.tick = (delta) => {
	}
	return camera;
}

export {createCamera};
