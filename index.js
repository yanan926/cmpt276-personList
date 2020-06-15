const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const axios = require('axios');
const mongoose = require('mongoose');

var app = express();
mongoose.connect("mongodb+srv://yanan926:wy570310@cluster0-hnknb.mongodb.net/personDB",{useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
  name : String,
  gender: String,
  age: Number,
  height: Number, 
  size: String,
  type: String, 
  url: String
  }
);
const Person = new mongoose.model("Person", personSchema);

app.use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/database', (req, res) => {
    let data = { results: [2, 3, 4, 5, 6, 7, 8] };
    res.render('pages/db', data);
  })

 app.get('/display', (req, res) => {
    Person.find({}, (err, allPeople)=>{
      if(err) {
        console.log(err);
      }else {
        res.render('pages/display', { peopleList: allPeople});
      }
    }
    )
  })
  app.post('/display', (req, res) => {
    let queryAge;
    let {name, gender, age,height,size, type} = req.body;
    let flag = gender.includes("Female");
    if(age <= 1) {
        queryAge ='infant';
    }else if(age <= 10) {
      if(flag) {
        queryAge = 'toddler-girl';
      }else {
        queryAge = 'toddler-boy';
      }
    }else if (age <= 18) {
      if(flag) {
        queryAge = 'teenager-girl';
      }else {
        queryAge = 'teenager-boy';
      }
    } else if(age <= 40){
      if(flag) {
        queryAge = 'young-woman';
      }else {
        queryAge = 'young-man';
      }
    }
    else if(age >= 60){
      if(flag) {
        queryAge = 'old-woman';
      }else {
        queryAge = 'old-man';
      }
    }else {
      if(flag) {
        queryAge ='middle-age-woman';
      }else {
        queryAge ='middle-age-man';
      }
    }

    let apiUrl = "https://api.unsplash.com/search/photos/?client_id=kxS5eOkaUPs4P3K4oD9TvnK-0oHX6Sx_eZlQ8x-adis";
    let queryUrl = apiUrl + `&query=${queryAge}-face&orientation=portrait` 
    axios.get(queryUrl)
      .then(function (response) {
        // handle success
       let num = Math.floor(Math.random() * 10);  
       const imageUrl = response.data.results[num].urls.regular;
       let newPerson = 
       {name: name, 
        gender: gender, 
        age : age, 
        height: height,
        size : size,
        type : type,
        url: imageUrl
      }
      const person = new Person(newPerson);
      person.save();
       res.redirect('/display');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  })

  app.get('/new', (req, res) => {
    res.render('pages/new.ejs');
  })
 app.get('/display/:id',(req, res) => {
  Person.findById(req.params.id, (err, foundPerson)=>{
    if(err) {
      console.log(err);
    }else {
      res.render('pages/show', {person: foundPerson});
    }
  })
})
  app.get('/display/:id/edit', (req, res)=> {
  Person.findById(req.params.id, (err, foundPerson)=>{
    if(err) {
      res.redirect('pages/display');
    }else {
      res.render('pages/edit', {person: foundPerson});
    }
  })
})

  app.post('/display/:id',(req, res) => {
  let {name, gender, age,height,size, type} = req.body;
  let uPerson = {
    name: name, 
    gender: gender, 
    age : age, 
    height: height,
    size : size,
    type : type,
  }
  Person.findByIdAndUpdate(req.params.id,{ $set: uPerson},(err, updatedPerson)=>{
    if(err) {
      console.log(err);
    }else {
      res.redirect("/display/" + req.params.id);
    }
  })
})

app.post("/display/:id/delete", (req, res)=>{
  Person.findByIdAndDelete(req.params.id,(err)=>{
    if(err) {
      console.log(err);
    }else {
      res.redirect("/display");
    }
  });
})
//database: postgresql-elliptical-77435 
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

