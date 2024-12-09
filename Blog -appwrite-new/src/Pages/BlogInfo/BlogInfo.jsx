import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/data/myContext";
import { useParams } from "react-router";
import Layout from "../../Components/Layout/Layout";
import Loader from "../../components/loader/Loader";
import service from "../../appwrite/config"; 

function BlogInfo() {
    const context = useContext(MyContext);
    const { mode, setLoading, loading } = context;

    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true); 
            try {
                const response = await service.getPost(id); 
                setBlog(response); 
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlog(null);
            } finally {
                setLoading(false); 
            }
        };

        fetchBlog();
        window.scrollTo(0, 0); 
    }, [id, setLoading]);

    function createMarkup(content) {
        return { __html: content };
    }

    return (
        <Layout>
            <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
                <div className="py-4 lg:py-8">
                    {loading ? (
                        <Loader /> 
                    ) : blog ? (
                        <div>
                            <img
                                alt="content"
                                className="mb-3 rounded-lg h-full w-full"
                                src={blog.featuredImage || "https://via.placeholder.com/800"}
                            />
                            <div className="flex justify-between items-center mb-3">
                                <h1
                                    style={{ color: mode === "dark" ? "white" : "black" }}
                                    className="text-xl md:text-2xl lg:text-2xl font-semibold"
                                >
                                    {blog.title}
                                </h1>
                                <p style={{ color: mode === "dark" ? "white" : "black" }}>
                                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown Date"}
                                </p>
                            </div>
                            <div
                                className={`border-b mb-5 ${
                                    mode === "dark" ? "border-gray-600" : "border-gray-400"
                                }`}
                            />
                            <div className="content">
                                <div
                                    className={`[&>h1]:text-[32px] [&>h1]:font-bold [&>h1]:mb-2.5 ${
                                        mode === "dark" ? "[&>h1]:text-[#ff4d4d]" : "[&>h1]:text-black"
                                    } [&>p]:text-[16px] [&>p]:mb-1.5 ${
                                        mode === "dark" ? "[&>p]:text-[#7efff5]" : "[&>p]:text-black"
                                    }`}
                                    dangerouslySetInnerHTML={createMarkup(blog.content)}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: mode === "dark" ? "white" : "black" }}>Blog not found.</p>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default BlogInfo;
