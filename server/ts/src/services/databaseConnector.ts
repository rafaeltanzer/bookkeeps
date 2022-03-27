import mongoose from 'mongoose';

export class MongoConnector{
    //env variables for pass and user(for future)
    private uri: string = 'mongodb://127.0.0.1:2717';

    //Connecction to DB
    public ConnectToDatabase(){
        mongoose.connect(this.uri, (err:any) => {
            if(err){
                console.log(err);
            }else{
                console.log("Connection succesful")
            }
        });
    }

    public DisconnectFromDatabase(){
        mongoose.disconnect();
    }
}