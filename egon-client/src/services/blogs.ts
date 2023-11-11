const API_URL = "http://localhost:3000";

const blogService = {
    async getAllBlogs() {
        const blogs = await fetch(API_URL);
        return blogs;
    }
}

export default blogService;