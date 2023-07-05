import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const NavBar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => logout();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'> Home </Link>
          </li>
        </ul>
      </nav>

      <span>Diary app</span>

      {user ? (
        <div>
          <span>{user.email}</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      ) : (
        <div>
          <Link to='api/login'>Login</Link>
          <Link to='api/signup'>Signup</Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
