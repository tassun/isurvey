import { KnExpress } from "./runner/KnExpress";
import { RouteManager } from './manager/RouteManager';

let app = KnExpress.createApplication();
console.log("working directory",__dirname);
new RouteManager(__dirname).route(app);
