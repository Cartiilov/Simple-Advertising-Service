import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../../components/Buttons/ButtonLink'
import './Navbar.css'
import useAuth from '../../context/AuthContext'
import { useLogout } from '../../hooks/LoginHooks'
import { useGetYourData } from '../../hooks/LoginHooks'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [currentUserId, setCurrentUser] = useState<number>();

    const { isLogged, setIsLogged } = useAuth(); 

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(() => {
    
        const fetchUser = async () => {
            try {
                const userData = await useGetYourData();
                const userId = userData.id;
                setCurrentUser(userId);
            } catch (error) {
                console.error(error);
            }
        };
        if (isLogged) {
            fetchUser();
        }
    });

    useEffect(() => {
        showButton();
    }, []);         

    window.addEventListener('resize', showButton);

    return (
    <>
      <nav className='Navbar'>
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo'>
                POSTIT <i className="fa fa-tree"></i>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Search' className='nav-links' onClick={closeMobileMenu}>
                        Search
                    </Link>
                </li>
                {/* <li className='nav-item'>
                    <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                        Products
                    </Link>
                </li> */}
                <li className='nav-item'>
                    <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                        {isLogged ? 'Log Out' : 'LOG IN'} {/* Change text based on isLogged */}
                    </Link>
                </li>
                {isLogged && (
                    <li className='nav-item'>
                        <Link to={`/user/${currentUserId}`} className='nav-links' onClick={closeMobileMenu}>
                            User Page
                        </Link>
                    </li>
                )}
            </ul>
            {button && isLogged ? <ButtonLink buttonStyle='btn--outline' to="/"
            onClick={() => {useLogout(); setIsLogged(false);}}>LOG OUT</ButtonLink>
            : <ButtonLink buttonStyle='btn--outline'>LOG IN</ButtonLink>} {}
        </div>
      </nav>
    </>
  )
}

export default Navbar