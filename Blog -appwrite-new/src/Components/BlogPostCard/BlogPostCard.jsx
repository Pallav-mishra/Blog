import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router';
import './BlogPostCard.css'; 
import { Link } from 'react-router';

function BlogPostCard() {
    const context = useContext(myContext);
    const { mode, getAllBlog } = context;

    const navigate = useNavigate();

    return (
        <div className="blog-post-container">
            <section className="blog-post-section">
                <div className="blog-post-wrapper">
                    <div className="blog-post-grid">
                        {getAllBlog.length > 0 ? (
                            getAllBlog.map((item) => {
                                const { featuredImage, $id, date, title } = item;
                                return (
                                    <div className="blog-post-card" key={$id}>
                                        <div
                                            className={`blog-post-card-inner ${
                                                mode === 'dark' ? 'dark-mode' : 'light-mode'
                                            }`}
                                        >
                                            <img
                                                onClick={() => navigate(`/bloginfo/${$id}`)}
                                                className="blog-thumbnail"
                                                src={featuredImage}
                                                alt={title}
                                            />
                                            <div className="blog-details">
                                                <h2 className="blog-date">{date}</h2>
                                                <h1 className="blog-title">{title}</h1>
                                                <p className="blog-description">Click on image to read more</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h1 className="no-blogs-message">No Blogs Found</h1>
                        )}
                    </div>
                   
                </div>
            </section>
        </div>
    );
}

export default BlogPostCard;


// =======================



