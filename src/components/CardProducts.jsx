import React from "react";
import Card from "react-bootstrap/Card";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { onDeleteProduct } from "../firebase/api";
import { toast } from "react-toastify";

export default function CardProducts({ row, id, setCurrentID }) {
  //funcion delele evento async
  const deleteProduct = async (id) => {
    if (window.confirm("are you sure you want to delete this product?")) {
      await onDeleteProduct(id);
      toast("Product Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };
/*     <Card style={{ marginBottom: "1.5rem" }}>
      {row.image ? (
        <Card.Img className="img-fluid" variant="top" src={row.image} />
      ) : (
        false
      )}
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>{row.name}</Card.Title>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(id);
              }}
            >
              <AiFillDelete />
            </a>
            <a href="#" onClick={() => setCurrentID(id)}>
              <AiOutlineEdit />
            </a>
          </div>
        </div>
        <Card.Text>{row.description}</Card.Text>
        <Card.Title>{row.price}</Card.Title>
      </Card.Body>
    </Card> */
  return (
    <Card style={{ marginBottom: "1.5rem" }}>
      {row.image ? (
        <Card.Img className="img-fluid" variant="top" src={row.image} />
      ) : (
        false
      )}
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>{row.name}</Card.Title>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(id);
              }}
            >
              <AiFillDelete />
            </a>
            <a href="#" onClick={() => setCurrentID(id)}>
              <AiOutlineEdit />
            </a>
          </div>
        </div>
        <Card.Text>{row.nombre}</Card.Text>
        <Card.Title>{row.confirmo ? 'confirma' : 'false'}</Card.Title>
        <Card.Title>{row.noConfirmo? 'No va' : 'false'}</Card.Title>
        <Card.Title>{row.mensaje}</Card.Title>
      </Card.Body>
    </Card>
  );
}
