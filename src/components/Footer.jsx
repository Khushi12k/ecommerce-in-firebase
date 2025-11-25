// import '../components/Footer.css';
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer>
            <div className='top'>
                <ul>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to ='/shop'>Shop</Link></li>
                    <li><Link to ='/contact'>Locate Us</Link></li>
                </ul>
            </div>
            <div className='bottom'>
                <p>&copy; {new Date().getFullYear()}All Rights Reserved</p>
            </div>
            
        </footer>
    );
}

export default Footer;
