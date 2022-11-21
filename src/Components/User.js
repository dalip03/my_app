import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import {db} from "./firebase";
// import { useNavigate } from 'react-router-dom';

function User(){

//  var navi = useNavigate()
var user =localStorage.getItem("Docid");
console.log(user);

// useEffect(()=>{
//     // if(!user){
//     //     alert("fxgd")
//     //     navi('/')
//     // }
// },[])

const [nm, setnm] = useState()
const [em, setem] = useState()
function getoneuser(){
    if(user){
        db.collection("users").doc(user).get().then((succ)=>{
            setnm(succ.data().Name)
            setem(succ.data().Email)
        })
    }
}

useEffect(() =>{
    getoneuser()
},[user]);


const [data, setdata] = useState([]);
function getdata(){
    db.collection("data").onSnapshot((succ) =>{
        var ar = [];
        succ.forEach((abc) =>{
            ar.push(abc);
        });
        setdata(ar);
    });
}

useEffect(() =>{
    getdata();
}, []);


// add to cart function 

function addcart(x){
    console.log(x.data())
    var crt = db.collection("users").doc(user).collection("mycart");

    crt.where("PID", "==", x.id).get().then((succ)=>{
        if(succ.size==0){
            var obj1 =x.data();
            var obj2 ={PID:x.id,qty:1,Uname:nm,UEmail:em}

            Object.assign(obj1,obj2);
            console.log(obj1)

            crt.add(obj1).then((succc)=>{
                alert("Added to Cart")
            })
        }else{
            alert("already exists")
        
        }
    });

}
   return(
    <div>
    <Navbar/>
    <div className='col-lg-12 col-md-12 col-sm-12'>
        {data.map((row)=>(
           
           <div className='dv col-lg-2 col-md-4 col-sm-6'>
            <div className='box'>
                 <img src={row.data().Image} className="ig"/>
                 </div>
                 <h4 className='h'>{row.data().Name}</h4>  
                 <p className='p'>{row.data().Description}</p>
                 <p className='price'> &#x20b9;{row.data().Price}</p>
                 <div className='cdv'>
                 <button onClick={()=> addcart(row)} className='btn btn-warning form-control crtb' > Add to Cart </button>
                 </div>
                 </div>
        ))}
    </div>
    </div>
   );
}

export default User;