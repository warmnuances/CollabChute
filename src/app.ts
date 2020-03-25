import express, { Application }  from 'express';
import bodyParser from 'body-parser';

/** Create a singleton standard Express Application Instance 
 * **/

class App{
  public app:Application;

  /** Takes in arguments to initialise express instance
   * @param {} middleWares
   * @param {} controllers
   * **/

  constructor(init: {middleWares?:any, controller?:any}){
    this.app = express();
    this.config();  

    this.addMiddlewares(init.middleWares)
  }

  public getInstance(){
    return this.app;
  }

   /** Initialise commonly used middlewares **/
  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  /** Allow application to extend other middlewares through constructor
   *  @param {} middleWares
   **/
  private addMiddlewares(middleWares:any){
    middleWares.forEach((middleware:any) => {
        this.app.use(middleware);
    });
  }

  public listen(port:Number){
    this.app.listen(port, () => {
      console.log(`App listening on the http://localhost:${port}`)
      console.log("dirname", __dirname)
    })
  }
}



export default App;