import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import {
  addProduct,
  updateProduct,
  getProduct,
  uploadFile,
  getUrlImg,
} from "../firebase/api";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

function FormComponent({ addOrEdit, currentId, getLinkById }) {
  const initialState = {
    name: "",
    price: "",
    description: "",
    image: "",
  };

  const [state, setState] = useState(initialState);
  const [urlImg, setUrlImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleChangeFile = async (e) => {
    let fileLocal = e.target.files[0];
    setUrlImg(fileLocal);
    try {
      const uploadImg = await uploadFile(fileLocal);
      console.log(uploadImg);
      const urlImgLocal = await getUrlImg();
      console.log(urlImgLocal);
      setUrlImg(urlImgLocal);
    } catch {
      console.error("error upload");
      alert("Error upload image, please try again");
    }
  };

  const handleSubmit = async (e) => {
    const collectionName = "products";
    state.image = urlImg;
    e.preventDefault();
    //addOrEdit(state);
    if (!currentId) {
      await addProduct(state, collectionName);
      toast("Product Add Successfully", {
        type: "success",
        autoClose: 2000,
      });
    } else {
      await updateProduct(currentId, state);
      toast("Updated", {
        type: "success",
      });
    }

    setState(initialState);
  };

  const getDocumentById = async (id) => {
    try {
      const doc = await getProduct(id);
      console.log(doc.data());
      setState(doc.data().product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentId) {
      getDocumentById(currentId);
    }
  }, [currentId]);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>ABM PRODUCTOS</h1>
      <Form style={{ padding: "100px" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="name"
            name="name"
            value={state.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Price Product"
            name="price"
            value={state.price}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Descriptions</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descriptions"
            name="description"
            onChange={handleChange}
            value={state.description}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imagProduct">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Descriptions"
            name="img"
            onChange={handleChangeFile}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </>
  );
}

export default FormComponent;
