import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial , TextureLoader, SphereGeometry} from 'three';
import { MathUtils } from 'three';

const radPerSecond = MathUtils.degToRad(90); 

function createMaterial() {
	const textureLoader = new TextureLoader();
	const material = new MeshStandardMaterial({color: 'green'});
	return material;
}

function createCube() {
	const geo = new BoxGeometry(2, 2, 1);
	const material = createMaterial();
	const cube = new Mesh(geo, material);
	let t = 0;
	cube.tick = (delta) => {
	};
	return cube;
}


export {createCube};
