import { KnExpress } from "./runner/KnExpress";
import { RouteManager } from './routers/RouteManager';

let app = KnExpress.createApplication();
console.log("working directory",__dirname);
new RouteManager(__dirname).route(app);
