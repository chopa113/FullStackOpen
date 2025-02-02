import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:3001/";

const password = "fnYOxOdrv3Y7Mq3m";

const mongodburl = `mongodb+srv://nbalaev231:<db_password>@cluster0.b4ppc.mongodb.net/`;

MongoClient.connect(mongodburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    console.log("Database created!");
    db.close();
    }
);