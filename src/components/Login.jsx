import { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  logInUser,
  singUpGoogle,
  resetPasswordSendEmail,
} from "../firebase/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaGooglePlusG } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  //state
  /*   const count = useSelector((state) => state.user.user);
  console.log(count); */

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
      await logInUser(state.email, state.password);
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
  const handleClick = async () => {
    try {
      await singUpGoogle();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgotPassword = async () => {
    !state.email ? setErrors("entry a Email") : false;

    try {
      await resetPasswordSendEmail(state.email);
    } catch (error) {
      setErrors(error.message);
    }
  };

  useEffect(() => {}, []);
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
      }}
    >
      {/*       <Row >
        <Col md={12} lg={12} xs={12}> */}
      {errors ? <p style={{ color: "red" }}>{errors}</p> : false}
      <Form
        style={{
          padding: "80px",
          backgroundColor: "#f3f2f2",
          borderRadius: "10px",
          width: "500px",
        }}
        onSubmit={handleSubmit}
      >
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
        <div
          className="d-flex justify-content-between"
          style={{ textAlign: "center" }}
        >
          <Button variant="primary" type="submit">
            Login
          </Button>
          <a
            style={{
              textDecoration: "none",
              color: "blue",
              fontWeight: "bold",
              fontSize: "12px",
            }}
            href="#"
            onClick={handleForgotPassword}
          >
            forgot password?
          </a>
        </div>
      </Form>

      <Button
        style={{
          marginTop: 20,
          backgroundColor: "white",
          color: "blue",
          width: "100%",
        }}
        onClick={handleClick}
      >
        Login with google{" "}
        <span style={{ fontSize: 18 }}>
          <FaGooglePlusG />
        </span>
      </Button>

      {/*         </Col>
      </Row> */}
    </div>
  );
}
