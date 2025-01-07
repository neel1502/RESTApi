const express=require("express");
const fs=require('fs');
const users=require("./MOCK_DATA.json");
const app=express();
//Middleware
app.use(express.urlencoded({extended:false}))
//Routes

app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})
//Rest API
app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.route("/api/users/:id").get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res)=> {
    return res.json({status:'pending'})
})
.delete((req,res)=> {
    return res.json({status:'pending'})
});

app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body,id : users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status : 'Success',id : users.length});
    })
});

app.listen(8000,() => {
    console.log("server started");    
})