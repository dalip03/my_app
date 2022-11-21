import React, { useId, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "./firebase";
function Navbar() {
  
  var userid = localStorage.getItem("UserId");
  console.log(userid);
var navi = useNavigate();

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

  function logout(){
    localStorage.removeItem("UserId")
    localStorage.removeItem("Docid")
    alert("logout")
  }

    function cart() {
      navi("/mycart");
    }

  
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand">Flipkart.in</div>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/Form">Form</Link>
          </li> */}
          <li>
            <Link to="/User">User</Link>
          </li>
          {/* <li>
            <Link to="/admin">admin</Link>
          </li> */}



          {userid ? (
            <li>
              <button className="btn btn-success navbar-btn" onClick={logout}>Logout</button>
        &nbsp;<button className="btn btn-success navbar-btn" onClick={cart}>MyCart</button>
            </li>

          ) : (
            <li>
              <button className="btn btn-danger navbar-btn" onClick={login}>
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
          }


export default Navbar;
