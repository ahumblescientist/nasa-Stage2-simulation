import {TextureLoader} from 'three';
import {BoxGeometry} from 'three';
import {MeshBasicMaterial} from 'three';
import {MeshStandardMaterial} from 'three';
import {MeshPhongMaterial} from 'three';
import {SRGBColorSpace} from 'three';
import {Mesh} from 'three';
import {MathUtils, Vector3} from 'three';

function getRandomPointOnSphere(radius = 10) {
	 const vec = new Vector3(
	   MathUtils.randFloatSpread(2),
	   MathUtils.randFloatSpread(2),
	   MathUtils.randFloatSpread(2)
	 ).normalize();
	 return vec.multiplyScalar(radius);
}

function createMaterial(color) {
	const material = new MeshBasicMaterial({color: color});
	material.useful = color == 'green';
	return material;
}

function generateVelocity(bias, pos) {
	let x = Math.random() * 2 - 1;
	let y = Math.random() * 2 - 1;
	let z = Math.random() * 2 - 1;
	if(x*x + y*y + z*z < 2) {
		return generateVelocity();
	}
	return new Vector3(x, y, z);
}


function createDebris(color, bias) {
	const material = createMaterial(color);
	const geometry = new BoxGeometry(0.1, 0.1, 0.1);

	const mesh = new Mesh(geometry, material);
	const pos = getRandomPointOnSphere();
	mesh.position.set(pos.x, pos.y, pos.z);
	mesh.isRendered = false;
	mesh.isCaught = false;
	mesh.isThrown = false;
	mesh.velocity = generateVelocity(bias, pos);
	mesh.intersects = -1;
	const m = mesh.position;
	const v = mesh.velocity;
	let sqr = (m.dot(v) * m.dot(v) - (v.dot(v)) * (m.dot(m) - 2*2));
	if(sqr > 0) {
		sqr = Math.sqrt(sqr);
		const root1 = (-(m.dot(v)) - sqr) / (v.dot(v));
		const root2 = (-(m.dot(v)) + sqr) / (v.dot(v));
		const min = Math.min(root1, root2);
		const max = Math.max(root1, root2);
		let sol = min;
		if(sol < 0) sol = max;
		if(sol < 0) sol = -1;
		mesh.intersects = sol;
		mesh.Ipoint = mesh.velocity.clone().multiplyScalar(mesh.intersects).add(mesh.position);
	}
	mesh.useful = material.useful;
	mesh.tick = (delta) => {
		mesh.position.x += mesh.velocity.x * delta;
		mesh.position.y += mesh.velocity.y * delta;
		mesh.position.z += mesh.velocity.z * delta;
	}
	return mesh;
}

export { createDebris };
