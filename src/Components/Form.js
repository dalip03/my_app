import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db, storage } from "./firebase";

function Form() {

  function subform(e) {
    e.preventDefault();

    var data = new FormData(e.currentTarget);
    var name = data.get("productName");
    // console.log(name)

    var img = data.get("productImage");
    // console.log(img)

    var dis = data.get("discription");
    // console.log(dis) 

    var price = Number(data.get("Price"));
    // console.log(price)

    var type = data.get("Type");
    // console.log(type)

    // Code

    var storageref = storage.ref("/image/" + img.name).put(img);
    storageref.then((suc) => {
      storageref.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log(downloadURL);
        
        db.collection("data")
          .add({
            Name: name,
            Image: downloadURL,
            Description: dis,
            Price: price,
            Type: type,
          })
          .then((succ) => {
            alert("data added");
          })
          .catch((err) => {
            alert("cant add data");
          });
      });
    });

    e.target.reset();
    e.target.file.focus();
  }

  const [data, setdata] = useState([]);
  function getdata() {
    db.collection("data").onSnapshot((succ) => {
      var ar = [];
      succ.forEach((abc) => {
        ar.push(abc);
      });
      setdata(ar);
    });
  }
  useEffect(() => {
    getdata();
  }, []);

  // Edit Function

  // Delete function
  function del(x) {
    if (window.confirm("ready to delete it")) {
      alert("deleted");
      db.collection("data").doc(x).delete();
    }
  }

  const [id, setid] = useState();
  function edit(x) {
    // console.log(x)
    setid(x);
  }

  const [nm, setnm] = useState();
  const [desc, setdesc] = useState();
  const [price, setprice] = useState();
  const [type, settype] = useState();

  function getoneuser() {
    db.collection("data")
      .doc(id)
      .get()
      .then((succ) => {
        // console.log(succ.data())
        setnm(succ.data().Name);
        setdesc(succ.data().Description);
        setprice(succ.data().Price);
        settype(succ.data().Type);
      });
  }
  useEffect(() => {
    getoneuser();
  }, [id]);

  function editform(e) {
    e.preventDefault();
    var data = new FormData(e.currentTarget)
    var img = data.get("productImage");
    // console.log(nm+type+desc+price)
    var storageref = storage.ref("/image/" + img.name).put(img);
    storageref.then((suc) => {
      storageref.snapshot.ref.getDownloadURL().then((downloadURL) => {

            db.collection("data")
              .doc(id)
              .update({
                Name: nm,
                Price: price,
                Description: desc,
                Type: type,
                Image:downloadURL
              })
              .then((succ) => {
                alert("updated");
              });
      });
    });
  }
  return (
    <>
      <Navbar />

      <form className=" col-lg-3" onSubmit={subform}>
        <div className="form-group">
          <h1>Admin Form</h1>
        </div>
        <div className="form-group">
          <input
            type="file"
            name="productImage"
            className=" form-control"
            placeholder="Product Image*"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="productName"
            className="  form-control"
            placeholder="Product Name*"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="discription"
            className=" form-control"
            placeholder="Discription*"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="Price"
            className=" form-control"
            placeholder=" Price"
          />
        </div>
        <div className="form-group">
          <select className="form-control" name="Type">
            <option value={"Shirt"}> Shirt </option>
            <option value={"Pent"}> Pent </option>
            <option value={"Trouser"}> Trouser</option>
            <option value={"T-Shirt"}> T-Shirt</option>
            <option value={"Shoe"}> Shoe</option>
            <option value={"Aceesories"}> Accesories</option>
          </select>
        </div>
        {/* <button type="button" className=" btn btn-success"> Submit </button> */}
        <input className=" btn btn-success" type={"submit"} value="send form" />
      </form>

      <div className="col-lg-8">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Discription</th>
              <th>Price</th>
              <th>Type</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="imm">
                  <img src={row.data().Image} className=" img-responsive" />
                </td>
                <td>{row.data().Name}</td>
                <td>{row.data().Description}</td>
                <td>{row.data().Price}</td>
                <td>{row.data().Type}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => del(row.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#mymodal"
                    onClick={() => edit(row.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="mymodal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <button className="close" data-dismiss="modal">
                  x
                </button>
                <h2>edit form</h2>
              </div>
              <div className="modal-body">
                <form onSubmit={editform}>
                  <div className="form-group">
                    <input
                      type="file"
                      name="productImage"
                      className=" form-control"
                      placeholder="Product Image*"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={nm}
                      name="productName"
                      className="  form-control"
                      placeholder="Product Name*"
                      onChange={(e) => setnm(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="discription"
                      value={desc}
                      className=" form-control"
                      placeholder="Discription*"
                      onChange={(e) => setdesc(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="Price"
                      value={price}
                      className=" form-control"
                      placeholder=" Price"
                      onChange={(e) => setprice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="Type"
                      value={type}
                      onChange={(e) => settype(e.target.value)}
                    >
                      <option value={"Shirt"}> Shirt </option>
                      <option value={"Pent"}> Pent </option>
                      <option value={"Trouser"}> Trouser</option>
                      <option value={"T-Shirt"}> T-Shirt</option>
                      <option value={"Shoe"}> Shoe</option>
                      <option value={"Aceesories"}> Accesories</option>
                    </select>
                  </div>
                  {/* <button type="button" className=" btn btn-success"> Submit </button> */}
                  <input
                    className=" btn btn-success"
                    type={"submit"}
                    value="edit form"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
