import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebase";

function Signup(){

    var navi = useNavigate()
function signup(e){
 
    e.preventDefault();
    var data = new FormData(e.currentTarget);

    var name = data.get("name");
    var phone = data.get("phone");
    var email = data.get("email");
    var password = data.get("password");

    console.log(name + phone + email+ password)
  
    db.collection("USERS").add(
        {
            Name:name,
            Phone :phone,
            Email:email,
            Password:password 
        }
    ).then((succ)=>{
        alert("Sign Up Successfully ")
        navi('/')
    }).catch((err)=>{
        alert("can't Signup Try Again");
    })
    e.target.reset();
    e.target.name.focus();
}


    return(
<>

<div className="back1">
<div className="fmm col-lg-4 col-lg-offset-3 col-md-6 col-md-offset-2 col-sm-8  col-sm-offset-2 col-xs-12">
    <form onSubmit={signup}>
    <h2>Sign Up</h2>
    <div className="form-group">
        <input type='text' name="name" className="form-control"  placeholder="Name" ></input>
        </div>
        <div className="form-group">
        <input type='tel' name="phone" className="form-control"  placeholder="Mobile No. " ></input>
        </div>
        <div className="form-group">
        <input type='email' name="email" className="form-control"  placeholder="E-mail" ></input>
        </div>
        <div className="form-group">
        <input type='password' name="password" className="form-control" placeholder="Password" ></input>
        </div>
        <div className="form-group">
        <button className="btn btn-success form-control" >Sign Up</button>
        </div>
        <div className="form-group">
            <span>Already have an Account</span>
            <Link to="/"> Login</Link>
        </div>
    </form>
    </div>
</div>
</>
    )
}
export default Signup;