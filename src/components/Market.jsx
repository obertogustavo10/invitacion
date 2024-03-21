import { useEffect, useState } from "react";
import FormComponent from "./FormComponent";
import { db, addOrEditareas } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import CardProducts from "./CardProducts";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import { onGetProducts } from "../firebase/api";

export default function Market() {
  //agregar productos a la base de datos firebase
  const [rows, setRows] = useState([]);
  const [currentId, setCurrentID] = useState("");

  const addOrEdit = (product) => {
    addOrEditareas(product);
  };

  const callApi = () => {
    onGetProducts((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log("nueva funcion", docs);
      setRows(docs);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <Container fluid>
      <Row style={{ alignItems: "center" }}>
        <Col lg={12} xs={12}>
          <FormComponent
            currentId={currentId}
            //getLinkById={getLinkById}
            addOrEdit={addOrEdit}
          />
        </Col>
        {rows.map((element) => (
          <Col key={element.id} lg={3} md={3} xs={12}>
            <CardProducts
              setCurrentID={setCurrentID}
              //onDeleteProduct={onDeleteProduct}
              row={element.product}
              id={element.id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
