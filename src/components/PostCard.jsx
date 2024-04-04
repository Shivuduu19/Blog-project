import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import parse from "html-react-parser"
import { useSelector } from "react-redux";

const PostCard = ({ $id, title, featuredImage, content, $createdAt, name, userEmail }) => {
  // const userData = useSelector((state) => state.auth.userData);
  const userName = userEmail?.split('@')
  const date = new Date($createdAt)
  // console.log(userName[0]);
  // console.log(userData);


  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-[20%] flex justify-between bg-gray-100 rounded-xl p-4 ">
        <div className="w-2/3 flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl">{name}</h1>
            <h1 className="line-clamp-1">{`@${userName[0]}`}
            </h1>
            <span className="text-5xl ">&#183;</span>
            <h1>{date.getDate()} {date.toLocaleString('en-US', { month: 'short' })}</h1>
          </div>
          <h2 className="text-4xl font-bold m-0 text-start">{title}</h2>
          {/* {console.log(parse(content).props.children)} */}
          <p className="text-2xl w-full line-clamp-2">{parse(content)}</p>
        </div>
        <div className="h-36  justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt="title"
            className="rounded-xl h-full   aspect-square"
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
