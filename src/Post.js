import React from "react";
import { useParams } from "react-router";

const Post = () => {
  const { id, ind } = useParams();

  return (
    <div>
      POST!!{id},{ind}
    </div>
  );
};

export default Post;
