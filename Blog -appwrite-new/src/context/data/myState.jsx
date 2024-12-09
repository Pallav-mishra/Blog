import React, { useState, useEffect } from 'react';
import MyContext from './myContext';
import { v4 as uuidv4 } from 'uuid';
import service from '../../appwrite/config';


function MyState(props) {
    const [mode, setMode] = useState('light');
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    };

    const [loading, setLoading] = useState(false);
    const [getAllBlog, setGetAllBlog] = useState([]);
    const [searchkey, setSearchkey] = useState(''); 

   
    const getAllBlogs = async () => {
        setLoading(true);
        try {
            const currentDateTime = new Date();
            const getAllBlog = await service.getPosts()
            console.log(getAllBlog)
            setGetAllBlog(getAllBlog.documents);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const addBlog = (newBlog) => {
        const currentDateTime = new Date();
        newBlog.id = uuidv4();
        newBlog.date = currentDateTime.toLocaleDateString();
        newBlog.time = currentDateTime.toLocaleTimeString();
        setGetAllBlog((prevBlogs) => [...prevBlogs, newBlog]);
    };

    
    const deleteBlog = (id) => {
        setGetAllBlog((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <MyContext.Provider
            value={{
                mode,
                toggleMode,
                loading,
                setLoading,
                getAllBlog,
                addBlog,
                deleteBlog,
                searchkey,
                setSearchkey,
            }}
        >
            {props.children}
        </MyContext.Provider>
    );
}

export default MyState;

