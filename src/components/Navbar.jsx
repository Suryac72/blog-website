import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../css/Nav.css";
import AddBlog from "./AddBlog";
import AllBlogs from "./AllBlogs";
import Blog from "./Blog";
function Navbar() {
  
  const sticky = () =>{
    const navbar = document.getElementById("nav");
    let top = navbar.offsetTop;
    if (window.scrollY >= top) {    
      navbar.classList.add('sticky-nav');
    } else {
      navbar.classList.remove('sticky-nav');    
    }
  }
  
  window.addEventListener('scroll', sticky);
  return (
    <>
      <Router>
        <nav id="nav"className="container-fluid main-nav">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="menu-btn">
            <FontAwesomeIcon icon={faBars} />
          </label>
          <Link to="/" className="logo">
            Blog App
          </Link>
          <ul className="navlinks">
            <li>
              <Link to="/">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/add" className="contact">
                New Post
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/add" element={<AddBlog />} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<AllBlogs />} />
        </Routes>
        <Routes>
        <Route exact path= "/blog/:id" element={<Blog />} />
        </Routes>
        <Routes>
        <Route path= "/blog/edit/:id" element={<AddBlog/>} />
        </Routes>
      </Router>
    </>
  );
}

export default Navbar;
