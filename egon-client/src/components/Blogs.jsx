import React, { useEffect } from 'react'
import blogService from '../services/blogs';

const Blogs = () => {

    useEffect(() => {
        return blogService.getAllBlogs();
    })
  return (
    <div>
      
    </div>
  )
}

export default Blogs
