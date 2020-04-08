/** Creates a Database Singleton Class**/
import mongooose, { Connection } from 'mongoose';
import env from 'dotenv';



class DbHelper{
  public static dbInstance:DbHelper;

  constructor(){
    env.config();
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}` ;
    mongooose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true ,
      useCreateIndex: true,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
  }

  /**Initialise Db by creating new object **/
  public static init(){
    new DbHelper();
  }

  /**Get DB Instance **/
  public static getInstance(): DbHelper{
    if (!DbHelper.dbInstance) {
      DbHelper.dbInstance = new DbHelper();
    }
    return DbHelper.dbInstance;
  }

}

export default DbHelper;