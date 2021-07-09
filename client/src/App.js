import React, { Fragment, useState, useEffect } from "react";

function App() {

  const [file, setFile] = useState(null)
  const [imageList, setImageList] = useState([])
  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    fetch("http://localhost:5000/images/get")
      .then(res => res.json())
      .then(res => setImageList(res))
      .catch(err => {
        console.error(err)
      })
      setListUpdated(false)
  }, [listUpdated])

  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  const sendHandler = () => {
    if (!file) {
      alert("You must upload file")
      return
    }
    const formdata = new FormData()
    formdata.append("image", file)
    fetch("http://localhost:5000/images/post", {
      method: "POST",
      body: formdata
    })
      .then(res => res.text())
      .then(res => {
        console.log(res)
        setListUpdated(true)
      })
      .catch(err => {
        console.error(err)
      })
    document.getElementById("fileinput").value = null
    setFile(null)
  }

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">Image App</a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileinput" onChange={selectedHandler} type="file" className="form-control" />
            </div>
            <div className="col-2">
              <button onClick={sendHandler} className="btn btn-primary col-12" type="button">Upload</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3" style={{ display: "flex", flexWrap: "wrap" }}>
        {imageList.map(images => (
          <div key={images.id} className="card m-2">
            <img className="card-img-top" src={"http://localhost:5000/" + images.filename} alt="..." style={{ height: "300px", width: "200px" }} />
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default App;
