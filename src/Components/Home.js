import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "./firebase";
import UserNavbar from "./userNavbar";
function Home(){
    

    var navi = useNavigate()

    function login1(e){
        e.preventDefault();
        var data = new FormData(e.currentTarget)
        
        var nm = data.get('mail')
        var pss =data.get('password')

        console.log(nm+pss)

        db.collection('USERS').where("Email",'==',nm).where("Password",'==', pss).get().then((succ)=>{
             if(succ.size==0){
                alert('Please signup First')
                navi('/Signup')
             }else{
                alert('Welcome User')
                navi("/user")
             }
             }
        )


    }

    
function login() {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);

        db.collection("users")
          .where("Email", "==", user.email)
          .get()
          .then((succ) => {
            if (succ.size == 0) {
              alert("no user of this id");
              db.collection("users")
                .add({
                  Email: user.email,
                  Name: user.displayName,
                  UId: user.uid,
                })
                .then((succ) => {
                  alert("login successful");
                  localStorage.setItem("UserId", user.uid);
                  localStorage.setItem("Docid", succ.id);
                });
            } else {
              alert("having user of this id");
              db.collection("users")
                .get()
                .then((succc) => {
                  succc.forEach((abc) => {
                    localStorage.setItem("UserId", user.uid);
                    localStorage.setItem("Docid", abc.id);
                  });
                });
            }
          });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }


    return(
<>
<div className="back">
<div className="fm col-lg-4 col-lg-offset-4 col-xs-12 col-sm-8 col-sm-offset-2">
    <form onSubmit={login1}>
    <h2>Login</h2>
        <div className="form-group">
        <input type='email' name="mail" className="form-control" placeholder="E-mail" ></input>
        </div>
        <div className="form-group">
        <input type='password' name="password" className="form-control" placeholder="Password" ></input>
        </div>
         <div className="form-group">
        <button className="btn btn-success form-control" >Login</button>
        </div>
        <div className="nm form-group">
            <span>not a member</span>
            <Link to="/signup"> Sign Up</Link>
            {/* <a href="#"> signup now</a> */}
        </div>
        or

<div className='form-group'>Login By Gmail
 <button className="btn btn-success navbar-btn" onClick={login}>
<span className='glyphicon glyphicon-log-in'></span>   Login
      </button>
</div>
    </form>
    </div>

</div>
</>
    )
}
export default Home;