import mongoose from 'mongoose';

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const url = `mongodb+srv://chopa113:${process.argv[2]}@cluster0.c1kqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String  
})

const Person = new mongoose.model('Person', personSchema)

if(process.argv.length > 3){
    const NewPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });
    
    NewPerson.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close()
    });
}else{
    Person.find({}).then(result=>{
        console.log('phonebook:')
        result.forEach(person =>{
            console.log(person.name , person.number)
        })
        mongoose.connection.close()
    })
}

