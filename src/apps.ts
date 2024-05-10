import { KnExpress } from "./runner/KnExpress";
import { RouteManager } from './manager/RouteManager';
import { APP_INSTANCES } from './utils/EnvironmentVariable';
import { Worker } from 'cluster';

import os from 'os';
import cluster from "cluster";

const numCPUs = os.cpus().length;
console.log("number of CPU",numCPUs);
let numOfInstances = numCPUs;
if(APP_INSTANCES != "CPU") {
    numOfInstances = parseInt(APP_INSTANCES);
}
console.log("number of instances",numOfInstances);
if (numOfInstances > 1 && cluster.isPrimary) {
    for (let i = 0; i < numOfInstances; i++) {
        cluster.fork();
    }        
    cluster.on('exit', (worker: Worker, code: number, signal: string) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    let app = KnExpress.createApplication();
    console.log("working directory",__dirname);
    new RouteManager(__dirname).route(app);
}
