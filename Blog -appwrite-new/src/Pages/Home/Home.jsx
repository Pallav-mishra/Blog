import React from 'react'
import Layout from '../../Components/Layout/Layout'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BlogPostCard from '../../Components/BlogPostCard/BlogPostCard'


const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <BlogPostCard/>
    </Layout>
  )
}

export default Home
