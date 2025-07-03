const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    const password = process.argv[2]
    
    const url = `mongodb+srv://skdalal:${password}@fsocluster.9rojjwa.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=FSOCluster`
    
    mongoose.set('strictQuery', false)
    
    mongoose.connect(url)

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => 
            console.log(`${person.name} ${person.number}`)
        )
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const password = process.argv[2]
    
    const url = `mongodb+srv://skdalal:${password}@fsocluster.9rojjwa.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=FSOCluster`
    
    mongoose.set('strictQuery', false)
    
    mongoose.connect(url)
    
    const person = Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Give name as well as phone number')
    process.exit(1)
}