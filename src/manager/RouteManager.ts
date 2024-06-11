import { Application, Request, Response } from 'express';
import { Utilities } from 'will-util';
import { BaseRouter } from '../base/BaseRouter';
import { RenderRouter } from '../routers/RenderRouter';
import { SigninRouter } from '../routers/SigninRouter';
import { TestRouter } from '../routers/TestRouter';
import { UserRouter } from '../routers/UserRouter';
import { ExportRouter } from '../routers/ExportRouter';
import { DataRouter } from '../routers/DataRouter';
import { SurveyRouter } from '../routers/SurveyRouter';
import { FormRouter } from '../routers/FormRouter';
import { MeasureBRouter } from '../routers/MeasureBRouter';
import { MeasureCRouter } from '../routers/MeasureCRouter';
import { MeasureDRouter } from '../routers/MeasureDRouter';
import { MeasureERouter } from '../routers/MeasureERouter';
import { MeasureFRouter } from '../routers/MeasureFRouter';
import { MeasureGRouter } from '../routers/MeasureGRouter';
import { SurveyBRouter } from '../routers/SurveyBRouter';
import { SurveyBXRouter } from '../routers/SurveyBXRouter';
import { SurveyCRouter } from '../routers/SurveyCRouter';
import { SurveyDRouter } from '../routers/SurveyDRouter';
import { SurveyDXRouter } from '../routers/SurveyDXRouter';
import { SurveyERouter } from '../routers/SurveyERouter';
import { SurveyFRouter } from '../routers/SurveyFRouter';
import { SurveyGRouter } from '../routers/SurveyGRouter';
import { SurveyB1Router } from '../routers/SurveyB1Router';
import { SurveyB2Router } from '../routers/SurveyB2Router';
import { SurveyB3Router } from '../routers/SurveyB3Router';
import { SurveyB4Router } from '../routers/SurveyB4Router';
import { SurveyB5Router } from '../routers/SurveyB5Router';
import { SurveyB6Router } from '../routers/SurveyB6Router';
import { SurveyB7Router } from '../routers/SurveyB7Router';
import { SurveySRouter } from '../routers/SurveySRouter';

const errorHandler = require('express-error-handler');
export class RouteManager extends BaseRouter {

    private doHome(req: Request, res: Response,) {
        this.logger.debug(this.constructor.name+':working '+this.dir+' - send /public/home.html');
        let parent = Utilities.getWorkingDir(this.dir); 
        this.logger.debug(this.constructor.name+":parent path : "+parent);
        let ctx = this.buildContext(req);
        this.logger.debug(this.constructor.name+":context : ",ctx);
        res.sendFile(parent + '/public/home.html');        
    }

    private doWelcome(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+':working '+this.dir+' - send /public/welcome.html');
        let parent = Utilities.getWorkingDir(this.dir as string); 
        this.logger.debug(this.constructor.name+":parent path : "+parent);
        let ctx = this.buildContext(req);
        this.logger.debug(this.constructor.name+":context : ",ctx);
        res.sendFile(parent + '/public/welcome.html');
    }    

    private doHealth(req: Request, res: Response) {
        res.json({status: "OK"});
    }    

    private async doValidate(req: Request, res: Response, next: Function) {
        try {
            await this.validateUser(req,res);
        } catch(ex:any) { 
            this.logger.error(this.constructor.name+".doValidate: error",ex);
            let ctx = this.buildContext(req);
            if(ctx.params.ajax=="true") {
                this.responseError(res,ex,"user");
                return;
            }
            //let render = new RenderRouter(this.dir,this.logger);
            //render.doLogin(req,res);
            res.redirect('/login');
            return;
        }
        next();
    }

    private handleErrors(app: Application) {
        app.use((err: any, req: Request, res: Response, next: Function) => {
            if(err) { console.error(err); }
            next(err);
        });
        const handleError = errorHandler({
            views: {
              404: 'pages/notfound',
              500: 'pages/servererror',
              default: 'pages/servererror'
            },
            shutdown: function(state: any) { }
        });
        app.use(errorHandler.httpError(404));
        app.use(handleError);    
    }

    public route(app: Application, dir?: string) {
        if(dir) this.dir = dir;
        let render = new RenderRouter(this.dir,this.logger);
        let signin = new SigninRouter(this.dir,this.logger);
        let user = new UserRouter(this.dir,this.logger);
        let exporter = new ExportRouter(this.dir,this.logger);
        let data = new DataRouter(this.dir,this.logger);
        let survey = new SurveyRouter(this.dir,this.logger);
        let form = new FormRouter(this.dir,this.logger);
        let measure_b = new MeasureBRouter(this.dir,this.logger);
        let measure_c = new MeasureCRouter(this.dir,this.logger);
        let measure_d = new MeasureDRouter(this.dir,this.logger);
        let measure_e = new MeasureERouter(this.dir,this.logger);
        let measure_f = new MeasureFRouter(this.dir,this.logger);
        let measure_g = new MeasureGRouter(this.dir,this.logger);
        let survey_b = new SurveyBRouter(this.dir,this.logger);
        let survey_bx = new SurveyBXRouter(this.dir,this.logger);
        let survey_c = new SurveyCRouter(this.dir,this.logger);
        let survey_d = new SurveyDRouter(this.dir,this.logger);
        let survey_dx = new SurveyDXRouter(this.dir,this.logger);
        let survey_e = new SurveyERouter(this.dir,this.logger);
        let survey_f = new SurveyFRouter(this.dir,this.logger);
        let survey_g = new SurveyGRouter(this.dir,this.logger);
        let survey_b1 = new SurveyB1Router(this.dir,this.logger);
        let survey_b2 = new SurveyB2Router(this.dir,this.logger);
        let survey_b3 = new SurveyB3Router(this.dir,this.logger);
        let survey_b4 = new SurveyB4Router(this.dir,this.logger);
        let survey_b5 = new SurveyB5Router(this.dir,this.logger);
        let survey_b6 = new SurveyB6Router(this.dir,this.logger);
        let survey_b7 = new SurveyB7Router(this.dir,this.logger);
        let survey_s = new SurveySRouter(this.dir,this.logger);

        app.use(async (req: Request, res: Response, next: Function) => {
            try {
                this.logger.debug(this.constructor.name+".route: url="+req.originalUrl);
                this.logger.debug(this.constructor.name+".route: headers",req.headers);
            } catch(ex) { }
            next();
        });
        app.get("/health", (req: Request, res: Response) => { this.doHealth(req,res); });
        app.post("/health", (req: Request, res: Response) => { this.doHealth(req,res); });
        new TestRouter(this.dir,this.logger).route(app);

        app.get("/", (req: Request, res: Response) => { this.doHome(req,res); });
        app.get('/home', (req: Request, res: Response) => { this.doHome(req,res); });  
        app.get('/welcome', (req: Request, res: Response) => { this.doWelcome(req,res); });  

        app.get('/main', (req: Request, res: Response) => { render.doMain(req,res); });
        app.get('/login', (req: Request, res: Response) => { render.doLogin(req,res); });
        app.use("/signin", signin.route(app));
        
        app.use("/survey_s", survey_s.route(app));

        app.use(async (req: Request, res: Response, next: Function) => { this.doValidate(req,res,next); });

        //app.get('/index', (req: Request, res: Response) => { render.doIndex(req,res); });
        app.get('/index/:token_key?', (req: Request, res: Response) => { survey.routeListAlls(req,res); });
        app.post('/index/:token_key?', (req: Request, res: Response) => { survey.routeListAlls(req,res); });
        app.use("/user", user.route(app));
        app.use("/export", exporter.route(app));
        app.use("/data", data.route(app));
        app.use("/survey", survey.route(app));
        app.use("/form", form.route(app));
        app.use("/measure_b", measure_b.route(app));
        app.use("/measure_c", measure_c.route(app));
        app.use("/measure_d", measure_d.route(app));
        app.use("/measure_e", measure_e.route(app));
        app.use("/measure_f", measure_f.route(app));
        app.use("/measure_g", measure_g.route(app));
        app.use("/survey_b", survey_b.route(app));
        app.use("/survey_bx", survey_bx.route(app));
        app.use("/survey_c", survey_c.route(app));
        app.use("/survey_d", survey_d.route(app));
        app.use("/survey_dx", survey_dx.route(app));
        app.use("/survey_e", survey_e.route(app));
        app.use("/survey_f", survey_f.route(app));
        app.use("/survey_g", survey_g.route(app));
        app.use("/survey_b1", survey_b1.route(app));
        app.use("/survey_b2", survey_b2.route(app));
        app.use("/survey_b3", survey_b3.route(app));
        app.use("/survey_b4", survey_b4.route(app));
        app.use("/survey_b5", survey_b5.route(app));
        app.use("/survey_b6", survey_b6.route(app));
        app.use("/survey_b7", survey_b7.route(app));

        this.handleErrors(app);
    }
}
