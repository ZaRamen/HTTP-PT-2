const express = require('express');
const app = express();

app.use(express.json());


const courses = 
[
    {id: 1, name:'Web Development'},{id:2, name: 'IT'},{id:3, name:'Cybersecurity'}
]

app.get('/', (req, res)=>
{
    res.send('Hello there');
})
app.get('/api/courses/', (req,res)=>
{
    res.send(courses);
})

app.get('/api/courses/:id', (req,res)=>
{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found");
        return
    }
    res.send(course);
})
   
//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/courses', (req, res) => {

    if (!req.body.name)
    {
        res.status(404).send("Missing name or genre");
        return;
    }

    if (req.body.name.length < 3)
    {
        res.status(404).send("Name must have at least 3 characters");
        return;
    }

    let course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);


    res.status(200).send(course);

});



//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/courses/:id', (req, res) => {

    if (!req.body.name)
    {
        res.status(404).send("Missing name");
        return;
    }
    if (req.params.id < 0 || req.params.id > courses.length)
    {
        res.status(400).send("Invalid id");
        return;
    }
    if (req.body.name.length < 3)
    {
        res.status(400).send("Name must have at least 3 characters");
        return;
    }

    courses[req.params.id - 1] = {
        id: parseInt(req.params.id),
        name: req.body.name,
    }
    

    res.status(200).send(courses[req.params.id - 1]);
   

});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/courses/:id', (req, res) => {
    

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
    {
        res.status(404).send("Couldn't find course");
        return;
    }
    let objIndex = courses.indexOf(course);
    
    // delete the song at that index, second param means # of deletions
    courses.splice(objIndex, 1);
    
    //updates each song with their new id
    courses.forEach((obj, index) =>
    {
        obj.id = index + 1;
    })

    res.status(200).send("Course deleted successfully");

});



app.listen(3000, () => { 
    console.log('app listening on port 3000\nhttp://localhost:3000'); 
});
