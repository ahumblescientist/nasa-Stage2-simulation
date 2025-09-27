import { Clock } from 'three';
import { createDebris } from './createDebris';
import { Vector3 } from 'three';
import { Line } from 'three';
import { BufferGeometry } from 'three';
import { LineBasicMaterial } from 'three';
import { Color } from 'three';

const clock = new Clock();


class Loop {
	constructor(camera, scene, renderer) {
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
		this.updatables = [];
		this.debris = [];
		this.prev = 0;
		this.current = 0;
		this.closest = null;
		this.red = 0;
		this.green = 0;
		this.params = {recycled: 0, repelled: 0}
		this.simspeed = 1;
		this.shipSpeed = 1;
	}
	addDebris() {

		if(this.current > this.prev + 1/(this.simspeed)) {
			this.prev = this.current;
			for(let i=0;i<this.red;i++) {
				this.debris.push(createDebris('red', this.bias));
			}
			for(let i=0;i<this.green;i++) {
				this.debris.push(createDebris('green', this.bias));
			}
		}
	}

	start() {
		this.renderer.setAnimationLoop(() => {
			this.tick();
			const delta = clock.getDelta();
			this.current = clock.getElapsedTime();
			this.addDebris();
			this.renderer.render(this.scene, this.camera);
		});
	}

	stop() {
		this.renderer.setAnimationLoop(null);
	}

	drawLine(p1, p2, color) {
		const geometry = new BufferGeometry().setFromPoints([p2, p1]);
		const material = new LineBasicMaterial({color: color});
		const line = new Line(geometry, material);
		return line;
	}

	cmpPoints(p1, p2) {
		return (Math.abs(p1.x - p2.x) <= 0.1) && 
		(Math.abs(p1.y - p2.y) <= 0.1) && 
		(Math.abs(p1.z - p2.z) <= 0.1);
	}
	tick() {
		const delta = clock.getDelta() * this.simspeed;
		for(const object of this.updatables) {
			object.tick(delta, this.shipSpeed);
		}
		for(const object of this.debris) {
			if(object.position.length() > 20) {
				this.scene.remove(object);
				continue;
			}
			if(!object.isRendered) { 
				this.scene.add(object); 
				this.updatables.push(object);
				object.isRendered = true;
			}
			if(this.locked) continue;
			if(object.thrown) continue;
			if(object.intersects < 0) continue;
			if(this.closest == null) {
				this.closest = object;
			}
			if(this.closest.position.length() > object.position.length()) {
				this.closest = object;
			}
		}
		let target = this.closest;
		if(target != null) {
			this.locked = true;
			if(!this.repeller.moving) this.repeller.setTargetFromVector(target.Ipoint);
			this.scene.remove(target.line);
			const p1 = target.position;
			const p2 = this.repeller.position;
			let color = 'lightcoral';
			if(target.useful) {
				let color = 'lightGreen';
			}
			target.velocity.x = (p2.x - p1.x) * 10;
			target.velocity.y = (p2.y - p1.y) * 10;
			target.velocity.z = (p2.z - p1.z) * 10;
			const line = this.drawLine(p1, p2, color);
			target.line = line;
			this.scene.add(line);
			if(p1.length() <= 5) {

			}
			if(this.cmpPoints(p1, p2)) {
				this.scene.remove(line);
				if(target.useful) {
					target.position.x = 1000;
					this.params.recycled++;
				} else {
					target.velocity.x = this.repeller.position.x;
					target.velocity.y = this.repeller.position.y;
					target.velocity.z = this.repeller.position.z;
					this.params.repelled++;
				}
				this.locked = false;
				target.thrown = true;
				this.closest = null;
			}
		}
		this.debris.filter((obj) => obj.position.length() < 20);
		this.updatables.filter((obj) => obj.isRendered === undefined || obj.position.length() < 20)
	}
}

export { Loop };
