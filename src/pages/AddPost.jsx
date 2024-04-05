import React from "react";
import { Container } from "../components";
import { PostForm } from "../components/index";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const AddPost = () => {
  // const userData = useSelector(state => state.auth.userData)
  // const navigate = useNavigate()
  // if (!userData) {
  //   navigate("/login")
  // }
  return (
    <div className="py-8">

      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
