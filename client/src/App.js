import React, { Fragment, useState, useEffect } from "react";
import Modal from "react-modal";

function App() {

  const [file, setFile] = useState(null)
  const [imageList, setImageList] = useState([])
  const [listUpdated, setListUpdated] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    Modal.setAppElement("body")
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

  const modalHandler = (isOpen, image) => {
    setModalIsOpen(isOpen)
    setCurrentImage(image)
  }

  const deleteHandler = (id) => {
    fetch(`http://localhost:5000/images/delete/${id}`, {
      method: "DELETE"
    })
      .then(res => res.text())
      .then(res => console.log(res))
    setListUpdated(true)
  }

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">Images App</a>
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

      <div className="container py-4 mt-3 text-center" style={{ display: "flex", flexWrap: "wrap" }}>
        {imageList.map(images => (
          <div key={images.id} className="card m-2 mx-auto">
            <img className="card-img-top" src={"http://localhost:5000/" + images.filename} alt="..." style={{ height: "300px", width: "200px" }} />
            <div className="card-body">
              <button onClick={() => modalHandler(true, images.filename)} className="btn btn-dark m-2">View</button>
              <button onClick={() => deleteHandler(images.id)} className="btn btn-danger m-2">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal style={{ content: { right: "25%", left: "25%" } }} isOpen={modalIsOpen} onRequestClose={() => modalHandler(false, null)}>
        <div className="card">
          <img className="card-img-top mx-auto" src={"http://localhost:5000/" + currentImage} alt="..." style={{ height: "100%", width: "300px" }} />
        </div>
        <div className="card-body">
          <button onClick={() => setModalIsOpen(false)} className="btn btn-primary m-2">Close Modal</button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default App;
