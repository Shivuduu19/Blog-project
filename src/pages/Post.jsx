import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Comments from "../components/comments/Comments";
import AllComments from "../components/comments/AllComments";
import Like from "../components/Like";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const loginData = useSelector((state) => state.auth.userData);
  // console.log(loginData);

  const isAuthor = post && loginData ? post.userId === loginData.$id : false;
  // console.log(post);
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        // console.log(post);
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8 flex flex-col items-center">


      <div className="w-full flex justify-center items-center mb-4 relative flex-col border rounded-xl p-2">
        <div className="px-32">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl h-[80vh]"
          />
        </div>

        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className=" flex items-center mb-6 flex-col gap-6 w-[1200px]">
        <h1 className="text-8xl font-bold">{post.title}</h1>
        <div className="w-full flex mt-6 justify-between items-center">
          <div className="p-1 text-2xl">
            <h2>{post.name}</h2>
            <h2>{`@${post.userEmail.split('@')[0]}`}</h2>
          </div>
          <div>{new Date(post.$createdAt).toDateString()}</div>
        </div>
        <p className="text-2xl ">{parse(post.content)}</p>
      </div>
      <div className="w-[80%]">
        <div className="flex justify-between">

          <h2 className="pl-40 text-3xl mb-4">Comments :</h2>
          <h2><Like post={post} slug={slug} /></h2>
        </div>
        <hr className="mt-2 mb-5 border-gray-950" />
        <Comments post={post} slug={slug} />
        {/* <AllComments post={post} /> */}
      </div>
    </div>
  ) : null;
};

export default Post;
