console.log('Client Side Javascript file is loaded')
var messageOne = document.querySelector('#para1')
var messageTwo = document.querySelector('#para2')
const forcast=(address)=>{
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
   response.json().then((data)=>{
       //console.log(data)
       if(data.Error)
       messageOne.textContent=data.Error
       else{
         //  console.log(data.response.location)
        messageOne.textContent=data.response.location
        messageTwo.textContent=`It feels like ${data.response.Temperature} outside
        ,with ${data.response.Precipitation_Chances} chance of rain.\nOverall the weather is ${data.response.Condition}`
       }
   })
})
}
const weatherform = document.querySelector('form')
const search = document.querySelector('input')

weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()
    forcast(search.value)
})