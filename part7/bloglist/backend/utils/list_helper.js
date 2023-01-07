const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return blogs.map((blog) => blog.likes).reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs
    .filter((blog) => blog.likes === mostLikes)
    .map((blog) => ({
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }));
};

const mostBlogs = (blogs) => {
  const reducer = (array, item) => {
    if (array.includes(item)) {
      return array;
    } else {
      return array.concat(item);
    }
  };

  const authors = blogs.map((blog) => blog.author).reduce(reducer, []);
  const authorsBlogs = authors.map((author) => ({
    author: author,
    blogs: blogs.filter((blog) => blog.author === author).length,
  }));
  const mostBlogsAuthor = Math.max(
    ...authorsBlogs.map((author) => author.blogs)
  );

  return authorsBlogs.filter((author) => author.blogs === mostBlogsAuthor);
};

const mostLikes = (blogs) => {
  const reducer = (array, item) => {
    if (array.includes(item)) {
      return array;
    } else {
      return array.concat(item);
    }
  };

  const authors = blogs.map((blog) => blog.author).reduce(reducer, []);

  const authorsLikes = authors.map((author) => ({
    author: author,
    likes: blogs
      .filter((blog) => blog.author === author)
      .map((blog) => blog.likes)
      .reduce((accumulator, likes) => {
        return accumulator + likes;
      }, 0),
  }));
  const mostLikes = Math.max(...authorsLikes.map((author) => author.likes));

  return authorsLikes.filter((author) => author.likes === mostLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
