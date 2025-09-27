import {createCamera} from './camera.js';
import {createCube} from './cube.js';
import {createScene} from './scene.js';
import {createLights} from './light.js';
import {createControls} from './controls.js';
import {createEarth} from './earth.js';
import {createRepeller, createAtt} from './repeller.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import {createRenderer} from './renderer.js';
import {Resizer} from './Resizer.js';
import {Loop} from './Loop.js';
import {MathUtils, Vector3} from 'three';
import {GUI} from 'lil-gui';


let camera;
let renderer;
let scene;
let loop;

class World {
	constructor(container) {
		camera = createCamera();
		scene = createScene();
		renderer = createRenderer();
		container.append(renderer.domElement);

		const controls = createControls(camera, renderer.domElement);
		controls.tick = () => controls.update();

		const earth = createEarth();
		scene.add(earth);

		const light = createLights();
		scene.add(camera);
		camera.add(light);
		
		let repeller;
		const loader = new GLTFLoader();
		loader.load('dish-model.glb', (gltf) => {
			const model = gltf.scenes[0];
			model.scale.set(0.01, 0.01, 0.01);
			model.rotation.set(0, 1.5, 1.5);
			repeller = model;
			loop.repeller = repeller;
			scene.add(repeller);
			repeller.theta = 0;
			repeller.omega = 0;
			repeller.radius = 3;
			repeller.thetaTarget = 0;
			repeller.omegaTarget = 0;
			repeller.moving = false;
			repeller.setTargetFromVector = function(vector) {
				const R = this.radius;
				const n = vector.length();
				const p = vector.clone().multiplyScalar(1/n);
				const theta = Math.atan2(p.y, p.x);
				const omega = Math.acos(MathUtils.clamp(p.z, -1, 1));
				this.thetaTarget = theta;
				this.omegaTarget = omega;
				this.moving = true;
			}
			repeller.tick = function(delta, shipSpeed) {
				if(this.moving) {
					const stepTheta = shipSpeed * delta * 3;   // rad/sec
					const stepOmega = shipSpeed * delta * 3;
					
					const dTheta = ((this.thetaTarget - this.theta + Math.PI) % (2*Math.PI)) - Math.PI;
					const dOmega = this.omegaTarget - this.omega;
					
					this.theta += MathUtils.clamp(dTheta, -stepTheta, stepTheta);
					this.omega += MathUtils.clamp(dOmega, -stepOmega, stepOmega);
				        if (Math.abs(dTheta) < 1e-3 && dOmega < 1e-3) this.moving = false;
				}
				this.position.x = this.radius * Math.cos(this.theta) * Math.sin(this.omega);
				this.position.y = this.radius * Math.sin(this.theta) * Math.sin(this.omega);
				this.position.z = this.radius * Math.cos(this.omega);
				const dir = this.position.clone().sub(new Vector3(0, 0, 0)).normalize();
 				const target = this.position.clone().add(dir);
				this.lookAt(target);
			}
	
			loop.updatables.push(repeller);


		});

		const resizer = new Resizer(container, camera, renderer);
		loop = new Loop(camera, scene, renderer);
		loop.updatables.push(controls);
		

		const gui = new GUI();
		const repellerFolder = gui.addFolder('Simulation');
		repellerFolder.add(loop, 'red', 0, 10);
		repellerFolder.add(loop, 'simspeed', 0, 10);
		repellerFolder.add(loop, 'green', 0, 10);
		repellerFolder.add(loop, 'shipSpeed', 0.1, 10);
		repellerFolder.add(loop.params, 'recycled', 0, 10).listen().disable();
		repellerFolder.add(loop.params, 'repelled', 0, 10).listen().disable();
		this.start();
	}
	start() {
		loop.start();
	}
	stop() {
		loop.stop();
	}
	render() {
		renderer.render(scene, camera);
	}
}

export { World };
