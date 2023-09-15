const express=require("express")
const mongoose=require("mongoose")
const body=require("body-parser")
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://shravyasahitya793:shravya2023@cluster0.q8mwtd6.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true})

const todoschema=new mongoose.Schema({task:String})
const todomodel=mongoose.model("tasks",todoschema)

var lists=[]

app.get("/",function(req,res){
    todomodel.find().then((result) => {
       
    res.render('index',{tasks:result})
        
    
    }).catch((err) => {
        console.log(err)
    });

})

app.post("/", function(req,res){
var todotask=req.body.task
//console.log(task)
//list.push(task)
const task=new todomodel({task:todotask})

task.save()

res.redirect("/")
})

app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result) => {
        res.redirect("/")
        
    }).catch((err) => {
        console.log(err)
        
    });
})

app.listen(process.env.PORT ||3001,function(){
    console.log("server is up and running")
})