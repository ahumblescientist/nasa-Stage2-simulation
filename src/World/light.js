import { DirectionalLight, PointLight } from 'three';

function createLights() {
	const light = new DirectionalLight('white', 2);
	light.position.set(-0, 0, 10);
	return light;
}

export { createLights };
