import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
import { auth, db, provider } from "./firebase";

function Admin(){

    var navi = useNavigate()
function admn(e){
    
    e.preventDefault();
    var data = new FormData(e.currentTarget);

    var username = data.get('email');
    var password = data.get("password");

    console.log( username + password)

    db.collection('ADMIN').where("Email",  "==", username).where("Password","==",password).get().then((succ)=>{
        if(succ.size == 0){
            alert("Unauthorized person !")
        }
        else{
            alert("Welcome Admin !")
            navi('/form')
        }
    }) 



}

    return(
<div>      
<div className="back1">
<div className="fmm col-lg-4 col-lg-offset-3 col-md-6 col-md-offset-2 col-sm-8  col-sm-offset-2 col-xs-12">
    <form onSubmit={admn}>
    <h2>Login as an Admin</h2>
        <div className="form-group">
        <input type='email' name="email" className="form-control"  placeholder="User Name" ></input>
        </div>
        <div className="form-group">
        <input type='password' name="password" className="form-control" placeholder="Password" ></input>
        </div>
        <div className="form-group">
        <button className="btn btn-success form-control" >Admin Login</button>
        </div>
    </form>
    </div>
</div>
</div>

    );
}

export default Admin;