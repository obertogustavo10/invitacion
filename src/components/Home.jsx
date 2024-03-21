import { useState, useEffect } from "react";
import { stateUser, singOutUser } from "../firebase/api";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//import { setUser } from "../store/slides/user/userSlide";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    stateUser((currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
  }, []);
  const handleClick = async () => {
    try {
      await singOutUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>welcome {user ? user.email : ""}</h1>
      <Button onClick={handleClick}>LogOut</Button>
      <Button onClick={() => navigate("/Market")}>Productos</Button>
    </div>
  );
}
