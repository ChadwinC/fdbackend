import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const database = { 
	users: [
			{
				id: "1",
				name: "Chadwin",
				email: "chadwin@gmail.com",
				password: "123",
				entries: 0,
				joined: new Date()

			},
			{
				id: "2",
				name: "Britney",
				email: "britney@gmail.com",
				password: "12345678",
				entries: 0,
				joined: new Date()
			}
		]
}
//root endpoint
app.get("/",(req,res)=>{
	res.json(database.users)
});

//sign in endpoint verification
app.post("/signin",(req,res)=>{
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
		res.json({
			  id: database.users[0].id,
			  name: database.users[0].name,
			  email: database.users[0].email,
			  entries: database.users[0].entries,
			  joined: database.users[0].joined
		})
	}else{
		res.status(400).json("error logging in, please check sign in details");
	}
});

//register user endpoint
app.post("/register",(req,res)=>{
	const {email, password, name} = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.

});
	
	database.users.push({
				id: "3",
				name: name,
				email: email,
				password: password,
				entries: 0,
				joined: new Date()
			});

	res.json(database.users[database.users.length - 1])
});

//finding user by id endpoint
app.get("/profile/:id",(req,res)=>{
	const {id} = req.params;
	
	let flag = false;
	database.users.forEach(user=>{
		if (user.id === id){
			flag = true;
			return res.json(user)
		}
	});

	if(!flag){
		res.json("Profile not found")
	}

});

//image entries API
app.put("/image",(req,res)=>{
	const {id} = req.body;
	
	let flag = false;
	database.users.forEach(user=>{
		if (user.id === id){
			flag = true;
			user.entries++
			return res.json(user.entries)
		}
	});

	if(!flag){
		res.json("Profile not found")
	}

})







app.listen(3001, ()=>{
	console.log("server running on port 3001")
});