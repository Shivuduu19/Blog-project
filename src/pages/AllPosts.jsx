import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <Container>
      <div className="flex flex-wrap flex-col w-full md:w-[75%] h-full">
        <h1 className="text-xl text-center mb-4 mt-3">for you</h1>
        {posts.map((post) => (
          <div key={post.$id} className="p-[2px] w-full ">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>

  );
};

export default AllPosts;
