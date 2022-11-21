import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "./firebase";
import Navbar from "./Navbar";

function Cart() {
  var user = localStorage.getItem("Docid");
  const [data, setdata] = useState([]);

  function getcart() {
    db.collection("users")
      .doc(user)
      .collection("mycart")
      .onSnapshot((succ) => {
        var ar = [];
        succ.forEach((abc) => {
          ar.push(abc);
          console.log(abc.data());
        });
        setdata(ar);
      });
  }

  useEffect(() => {
    getcart();
  }, []);

  function incre(x) {
    var idd = x.id;
    console.log(idd);
    db.collection("users")
      .doc(user)
      .collection("mycart")
      .doc(idd)
      .update({
        Qty: firebase.firestore.FieldValue.increment(1),
      });
  }

  function decre(x) {
    var idd = x.id;
    console.log(idd);
    db.collection("users")
      .doc(user)
      .collection("mycart")
      .doc(idd)
      .update({
        Qty: firebase.firestore.FieldValue.increment(-1),
      });
  }

  function del(x) {
    var idd = x.id;
    console.log(idd);

    db.collection("users")
      .doc(user)
      .collection("mycart")
      .doc(idd)
      .delete()
      .then((succ) => {
        alert("Deleted");
      });
  }

  return (
    <div>
      <Navbar />

      <div className="col-lg-8 col-md-8 col-sm-8">
        {data.map((row) => (
          <div className="dv1 col-lg-12 col-md-8 col-sm-8">  

            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="box1">
                <img src={row.data().Image} className="ig" />
              </div>
              <div className="btn btn-group btn1">
                <button className="btn" onClick={() => incre(row)}>
                  +
                </button>

                <button className="btn" disabled>
                  {row.data().Qty}
                </button>

                {row.data().Qty <= 1 ? (
                  <button className="btn">
                    <span
                      className="glyphicon glyphicon-trash"
                      onClick={() => del(row)}
                    ></span>
                  </button>
                ) : (
                  <button className="btn" onClick={() => decre(row)}>
                    -
                  </button>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 dv3">
              <div>
                <h5 className="h4">{row.data().Name}</h5>
                <p className="">{row.data().Description}</p>
                <p className="pr"> &#x20b9;{row.data().Price* row.data().Qty}</p>
                <div className="cdv">
                 <button className="btn">
                  
                 <span
                   onClick={() => del(row)}
                     >Remove</span>
                       </button>
                </div>
              </div>
              </div>

          </div>
        ))}
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4 dv4">
        <div className="panel panel-default">
           <div className="panel-heading">PRICE DETAILS</div>
           <div className="panel-body">
            <p>Price</p>
              <p>Discount  </p>
              <p>Delivery Charges</p>
            <p className="pp">Total Bill</p>
            
            </div>
            <div className="panel-footer">
            <button className="btn btn-success pl">Proceed to Buy</button>

            </div>
             </div>
               </div>
      </div>

  );
}

export default Cart;
