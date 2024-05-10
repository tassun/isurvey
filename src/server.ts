import { KnExpress } from "./runner/KnExpress";
import { RouteManager } from './manager/RouteManager';
import { APP_INSTANCES } from './utils/EnvironmentVariable';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
console.log("number of CPU",numCPUs);
let numOfInstances = numCPUs;
if(APP_INSTANCES != "CPU") {
    numOfInstances = parseInt(APP_INSTANCES);
}
if (numOfInstances > 1 && cluster.isMaster) {
    for (let i = 0; i < numOfInstances; i++) {
        cluster.fork();
    }        
    cluster.on('exit', (worker:any, code: any, signal: any) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    let app = KnExpress.createApplication();
    console.log("working directory",__dirname);
    new RouteManager(__dirname).route(app);
}
