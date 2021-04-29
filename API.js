const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportlocal = require("passport-local").Strategy;

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(cookieParser("mi ultra hiper secreto"));

app.use(session({
    secret: "mi ultra hiper secreto",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportlocal(function(username,password,done){
    if(username === "codigofacilito" && password === "12345678")
        return done(null,{ id: 1, name: "Rene"});
    
    done(null, false);
}));
// { id: 1, name: "Rene"}
// 2 => Serialización
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deserialización
passport.deserializeUser(function(id,done){
    done(null, { id: 1, name: "Rene"});
})

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    // Si ya iniciamos mostrar bienvenida

    // Si no hemos iniciado sesión redireccionar a /login
    res.send("Hola");
})

app.get("/login",(req,res)=>{
    // Mostrar el formulario de login
    res.render("login");
})

app.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
}));


app.listen(8080,()=>console.log("Server started"));
