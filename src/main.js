import { World } from "./World/World.js";

const container = document.querySelector('#scene-container');


const btn = document.querySelector('#clickme');
const world = new World(container);
world.render();
