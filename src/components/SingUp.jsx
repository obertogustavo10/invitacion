import { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { singUpUser, singUpGoogle } from "../firebase/api";
import { useNavigate } from "react-router-dom";


export default function SingUp() {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await singUpUser(state.email, state.password);
      navigate("/");
    } catch (error) {
      let errorLocal = error.code;
      let errormessage = "";
      const MESSAGE_TYPES = Object.freeze({
        EMAIL: "auth/invalid-email",
        PASSWORD: "auth/weak-password",
        EMAILUSE: "auth/email-already-in-use",
      });
      console.log(errorLocal);
      switch (errorLocal) {
        case MESSAGE_TYPES.EMAIL:
          errormessage = "Email invalid";
          break;
        case MESSAGE_TYPES.PASSWORD:
          errormessage = "Password should be at least 6 characters";
          break;
        case MESSAGE_TYPES.EMAILUSE:
          errormessage = "Email already in use";
          break;

        default:
          break;
      }
      setErrors(errormessage);
      console.log(error.code);
      console.log(error.message);
    }
  };


  useEffect(() => {}, []);
  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={12} xs={12}>
          <h1 style={{ textAlign: "center" }}>SingUp</h1>
          {errors ? <p style={{ color: "red" }}>{errors}</p> : false}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="email"
                placeholder="youremail@gmail.com"
                name="email"
                value={state.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmaild">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="password"
                placeholder="*******"
                name="password"
                value={state.password}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              SingUp
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
