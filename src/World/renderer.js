import { WebGLRenderer } from 'three';


function createRenderer() {
	const renderer = new WebGLRenderer({antialiasing: true});
	renderer.getContext().sampleCount = 20;
	renderer.physicallCorrectLights = true;
	return renderer;
}

export {createRenderer};
