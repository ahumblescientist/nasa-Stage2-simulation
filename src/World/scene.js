import {Color, Scene } from 'three';
import { TextureLoader } from 'three';

function createScene() {
	const scene = new Scene();
	const loader = new TextureLoader();
	loader.load('background-texture.jpg', (texture) => {
		scene.background = texture;
	});
	return scene;
}

export { createScene };
