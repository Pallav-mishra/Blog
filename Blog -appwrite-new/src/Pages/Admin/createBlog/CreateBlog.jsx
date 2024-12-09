import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import service, { Service } from "../../../appwrite/config"; 

export default function CreateBlog() {
  const navigate = useNavigate();

  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [status, setStatus] = useState('draft');  
  const [userId] = useState('currentUserId');  

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!title || !slug || !content || !featuredImage) {
      return toast.error("Please fill all the fields.");
    }

    try {
      
      let featuredImageUrl = null;
      if (featuredImage) {
        const file = await service.uploadFile(featuredImage);
        featuredImageUrl = file?.$id;  
        const imageurl = await service.getFilePreview(file?.$id)
        console.log(imageurl)
        featuredImageUrl = imageurl
      }

     
      const post = await service.createPost({
        title,
        slug,
        content,
        featuredImage: featuredImageUrl,
        status,
        userId
      });

      if (post) {
        toast.success("Blog post created successfully!");
        navigate('/dashboard'); 
      } else {
        toast.error("Failed to create blog post.");
      }
    } catch (error) {
      toast.error("Error while creating post.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg">
        
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Featured Image</label>
          <input
            type="file"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

    
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>

       
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
