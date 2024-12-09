

import { createContext, useState } from 'react';

const myContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  return (
    <myContext.Provider value={{ addBlog, blogs }}>
      {children}
    </myContext.Provider>
  );
};

export default myContext;
