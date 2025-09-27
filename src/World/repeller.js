import {TextureLoader} from 'three';
import {BoxGeometry} from 'three';
import {MeshBasicMaterial} from 'three';
import {MeshStandardMaterial} from 'three';
import {MeshPhongMaterial} from 'three';
import {SRGBColorSpace} from 'three';
import {Mesh} from 'three';

function createMaterialR() {
	const material = new MeshBasicMaterial({color: "gray"});
	return material;
}

function createRepeller() {
	const geometry = new BoxGeometry(0.2, 0.2, 0.2);
	const material = createMaterialR();
	const mesh = new Mesh(geometry, material);
	return mesh;
}


function createMaterialA() {
	const material = new MeshBasicMaterial({color: "cyan"});
	return material;
}

function createAtt() {
	const geometry = new BoxGeometry(0.2, 0.2, 0.2);
	const material = createMaterialA();
	const mesh = new Mesh(geometry, material);
	return mesh;
}

export {createRepeller, createAtt};
