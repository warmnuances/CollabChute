import express, {Application,Request,Response} from 'express';
import bodyParser from 'body-parser';
import Compression from 'compression';
import path from 'path';
import compression from 'compression';



/**  
 * Create a standard Express Application Instance with commonly used middlewares
 * @method config -> initialise commonly used middlewares
 * @method addMiddlewares -> option to add other middleware through constructor
 * @method addController -> add controllers through constructor
 * @method listen -> indicates server to listen to a port
 * @method setReactAsViewEngine -> use React as View Engine
 * **/

class App{
  public app:Application;

  /** Takes in arguments to initialise express instance
   * @param {boolean} setReactAsViewEngine
   * **/

  constructor(init: {setReactAsViewEngine?:boolean}){
    this.app = express();
    this.config();  

    if(this.setReactAsViewEngine){
      this.setReactAsViewEngine();
    }
  }
  private config(){
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(Compression({
      filter: this.shouldCompress,
      threshold: 0
    }))
    
  }

  public listen(port:Number){
    this.app.listen(port, () => {
      console.log(`App listening on the http://localhost:${port}`)
    })
  }

  private shouldCompress = (req:Request,res:Response) =>{
    if (req.headers['x-no-compression']) {
      // don't compress responses if this request header is present
      return false;
    }
    return compression.filter(req,res)
  }

  private setReactAsViewEngine(){

    /** ********************************************************************
     * Set React as View Engine instead of hbs or pug
     *  Since React is a client-side SPA. All page routes is done in React
     *  What express does is; it sends production build of React bundle to when url is accessed
     *  e.g. accessing http://localhost:5000/ will request express to 
     *       send files associated with React Application 
     *  All routing is done through React Application; more specifically react-router 
     *  To access api -> url will have "/api/" in base path
     *  ********************************************************************/

    /** ********************************************************************
     *  Since we are using Typescript,
     *  All files are transpiled to Javascript in dist folder
     *  It is in dist folder since we specify in tsconfig.json
     *  Go to client folder and run "npm run build:dist"
     *  npm build:dist -> creates a optimize build folder and move it to dist
     * *********************************************************************/

    // if(process.env.NODE_ENV === 'production'){
    //   const dir = path.join(__dirname, 'build');
    //   this.app.use(express.static(path.join(dir)));

    //   this.app.get('*', function(_, res:Response) {
    //     res.sendFile(dir);
    //     // res.send("Hello")
    //   });
    // }

    const dir = path.join(__dirname, 'build');
      this.app.use(express.static(path.join(dir)));

      this.app.get('*', function(_, res:Response) {
        res.sendFile(dir);
        // res.send("Hello")
      });

  }

}



export default App;