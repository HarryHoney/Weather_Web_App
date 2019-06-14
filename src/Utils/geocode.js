const request = require('request')
/*
It is been tested by me that request module is handled by Node API so result will have problem in displaying
// now note the request is npm library and is not provided by node itself but require node to work
*/
const geocode = (location,callback)=>
{
    const address=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiaGFycnlob25leSIsImEiOiJjandzeTFpc28xeWVwNDhsZTg1c3VuNnBjIn0.ChUjFU0u7_gWBg0YbwAofg`
    request(    {url:address,json:true},    (error,response)=>{
        if(error)
        {
            callback('Unable to connect to the server!',undefined)
        }else{
            if(response.body.features.length===0)
            {
                callback('Unable to find that location. Please try someother location',undefined)
            }
            else{
        const lat=response.body.features[0].center[1]
        const long=response.body.features[0].center[0]
        const location=response.body.features[0].place_name
        const data={
            latitude:lat,
            longititude:long,
            location:location
        }
        callback(undefined,data)
    }
        }
    })
}
const report=({latitude,longititude,location},callback)=>{
    const url=`https://api.darksky.net/forecast/5416fa1d491b342a7465a6e2ab5e05c7/${latitude},${longititude}?units=si`
    request({url:url,json:true},(error,{body})=>{
        if(error){callback('Unable to connect to the server',undefined)
    }else
    {
        if(!body.currently){callback('Unable to find the location',undefined)
    }else
    {
        callback(undefined,{location:location,Temperature:body.currently.temperature+' Celius',
        Precipitation_Chances:body.currently.precipProbability*100+'%',Condition:body.hourly.summary})
    }
}
}
    )
}
module.exports={
    report:report,
    geocode:geocode
}