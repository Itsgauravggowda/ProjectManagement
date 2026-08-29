import dotenv from "dotenv";
dotenv.config({
    path : "./.env",
})


let database = process.env.database
let myusername = process.env.userName
console.log(myusername);
console.log(database);

console.log("Hello");