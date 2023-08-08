import { Request, Response } from "express";
import {
  editPost,
  fetchAllPosts,
  fetchPost,
  insertPost,
  removePost,
} from "../services/blog.service";

export const getAllPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await fetchAllPosts();
    res.send({ data: posts, message: "from posts table" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong.", error: err });
  }
};

export const getPostController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = await fetchPost(id);
    res.send({ data: post, message: "from posts table" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong.", error: err });
  }
};

export const createPostController = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Check if a file has been uploaded or a default image is being used
    let imagePath;
    if (files["image"] && files["image"][0]) {
      imagePath = files["image"][0].path;
    } else if (req.body.image === 'images/default.webp') {
      imagePath = req.body.image;
    } else {
      return res.status(400).send({ message: "No image provided." });
    }

    const newPostData = { ...req.body, image: imagePath };
    const newPost = await insertPost(newPostData);
    res.send({ data: newPost, message: "post created" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong.", error: err });
  }
};

export const updatePostController = async (req: Request, res: Response) => {  
  try {
    const { title, content, author, user_id, useExistingImage, tags } = req.body;
    const id = Number(req.params.id); // convert id to a number

    let image;
    if (useExistingImage === "true") {
      // Retrieve the existing image URL from the database
      const existingPost = await fetchPost(id);
      image = existingPost.image;
    } else if (req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })["image"]) {
      image = (req.files as { [fieldname: string]: Express.Multer.File[] })["image"][0].path;
    }

    const updatedPost = await editPost({
      id,
      title,
      content,
      author,
      user_id,
      image,
      tags
    });

    res.send({ data: updatedPost, message: "post updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong.", error: err });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedPost = await removePost(id);
    res.send({ data: deletedPost, message: "post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong.", error: err });
  }
};
