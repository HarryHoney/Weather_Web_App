const path=require('path')//core module
const geocodelib = require('./Utils/geocode')
const express = require('express')
const app = express()
const hbs = require('hbs')

//setting the path to directories for Express config
const publicdir=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicdir))
//using above two lines we are exposing public directory to web-server


app.get('/weather',(req,res)=>{
    console.log(req.query.address)
    if(!req.query.address)
    {
       return  res.send({
            error:'Address field is required in URL'
            })
              
    }
  
    geocodelib.geocode(req.query.address,(error,data)=>{
        if(error){
            console.log(`Error=${error}`)
            return res.send({
                Error:error
            })
         }
        else
        geocodelib.report(data,(error,response)=>{
         if(error)
             {console.log(`Error=+${error}`)
             return res.send({
                Error:error
            })
        }else
             console.log(response);
             return res.send({
                response
            })
        })
    })

})
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Harpreet Singh'
    })
    })
    app.get('/about',(req,res)=>{
    res.render('about',{
      title:'About Page',
      name:'Harpreet Singh'
    })
    })
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        description:'How can I Help You?',
        name:'Harpreet'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Harpreet Singh'
    })
    })
app.get('*',(req,res)=>{
res.render('error',{
    title:'Error',
    name:'Harpreet Singh'
})
})
app.listen(3000,()=>{
    console.log("Server is up on 3000")
})