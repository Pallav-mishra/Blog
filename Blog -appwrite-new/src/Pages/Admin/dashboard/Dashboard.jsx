
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import myContext from '../../../context/data/myContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../appwrite/auth';
import toast from 'react-hot-toast';
import service from '../../../appwrite/config';

function Dashboard() {
    const context = useContext(myContext);
    const { mode, getAllBlog, deleteBlog } = context;
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (getAllBlog) {
            setBlogs(getAllBlog);
        }
    }, [getAllBlog]);

   
    const handleDelete = async (blogId) => {
        console.log(blogId)
        await service.deletePost(blogId)
        deleteBlog(blogId); 
        setBlogs(blogs.filter((blog) => blog.id !== blogId)); 
        toast.success("Blog deleted successfully")
    };

   
    const logout2 = async () => {
        await authService.logout()
        localStorage.clear();
        navigate('/');
    };

    return (
        <Layout>
            <div className="py-10">
                
                <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                    <div className="left">
                        <img
                            className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                            src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                            alt="profile"
                        />
                    </div>
                    <div className="right">
                        <h1 className="font-bold text-2xl mb-2" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                            Hello User
                        </h1>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            Software Developer
                        </h2>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            admin@gmail.com
                        </h2>
                        <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            <span>Total Blog: </span> {blogs.length}
                        </h2>
                        <div className="flex gap-2 mt-2">
                            <Link to={'/createblog'}>
                                <div className="mb-2">
                                    <Button
                                        style={{
                                            background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                            color: mode === 'dark' ? 'black' : 'white',
                                        }}
                                        className="px-8 py-2"
                                    >
                                        Create Blog
                                    </Button>
                                </div>
                            </Link>
                            <div className="mb-2">
                                <Button
                                    onClick={logout2}
                                    style={{
                                        background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                                        color: mode === 'dark' ? 'black' : 'white',
                                    }}
                                    className="px-8 py-2"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className={`border-2 ${mode === 'dark' ? 'border-gray-300' : 'border-gray-400'}`} />

                
                <div className="container mx-auto px-4 max-w-7xl my-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                        <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                style={{
                                    background: mode === 'dark' ? 'white' : 'rgb(30, 41, 59)',
                                }}
                                className="text-xs"
                            >
                                <tr>
                                    <th
                                        style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                        scope="col"
                                        className="px-6 py-3"
                                    >
                                        S.No
                                    </th>
                                    <th
                                        style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                        scope="col"
                                        className="px-6 py-3"
                                    >
                                        Thumbnail
                                    </th>
                                    <th
                                        style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                        scope="col"
                                        className="px-6 py-3"
                                    >
                                        Title
                                    </th>
                                    <th
                                        style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                        scope="col"
                                        className="px-6 py-3"
                                        >
                                        
                                        </th>
                                   
                                        <th
                                            style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            scope="col"
                                            className="px-6 py-3"
                                        >
                                            Action
                                        </th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.length > 0 ? (
                                    blogs.map((item, index) => {
                                        const { $id, featuredImage , title, category } = item;
                                        return (
                                            <tr
                                                key={$id}
                                                className="border-b-2"
                                                style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}
                                            >
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4"
                                                >
                                                    {index + 1}.
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    <img
                                                        onClick={() => navigate(`/allblog${$id}`)}
                                                        className="w-16 rounded-lg cursor-pointer"
                                                        src={featuredImage  || 'https://via.placeholder.com/150'}
                                                        alt="Thumbnail"
                                                    />
                                                </td>
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4"
                                                >
                                                    {title}
                                                </td>
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4"
                                                >
                                                    {category}
                                                </td>
                                               
                                                <td
                                                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                                                    className="px-6 py-4"
                                                >
                                                    <button
                                                        onClick={() => handleDelete($id)}
                                                        className="px-4 py-1 rounded-lg text-white font-bold bg-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            No Blogs Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;


