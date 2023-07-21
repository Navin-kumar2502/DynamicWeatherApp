const http=require('http');
const fs=require('fs');
var requests = require('requests');
const homeFile=fs.readFileSync('index.html' + './index.html',"UTF-8");
const replaceVal=(tempVal,orgVal)=>{
    let tempe=tempVal.replace("{%tempval%}",orgVal.main.temp);
    tempe=tempe.replace("{%tempmin%}",orgVal.main.temp_min);
    tempe=tempe.replace("{%tempmax%}",orgVal.main.temp_max);
    tempe=tempe.replace("{%location%}",orgVal.name);
    tempe=tempe.replace("{%country%}",orgVal.sys.country);
    tempe=tempe.replace("{%tempstatus%}",orgVal.weather[0].main);
    tempe=tempe.replace("{%tempstatus%}",orgVal.weather[0].main);
    return tempe;
};
const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        //copy pasted
        requests("https://api.openweathermap.org/data/2.5/weather?q=surat&units=metric&appid=cbac6b09413a5ade3642f3e727740c3b")
        .on("data",(chunk)=>{
            const objdata=JSON.parse(chunk);
            const arrData=[objdata];
            const realTimeData=arrData
            .map((val)=>replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
            //console.log(realTimeData); 
        })
        .on("end",(err)=>{
            if(err) return console.log("connection error",err);
            res.end();
        });
    }
}); 

server.listen(8000,"127.0.0.1");             
