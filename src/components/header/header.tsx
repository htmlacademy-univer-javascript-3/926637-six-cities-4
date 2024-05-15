import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

type HeaderProps = {
  isActive: boolean;
};

export function Header({isActive = false}: HeaderProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  const userData = useAppSelector((state) => state.userData);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const dispatch = useAppDispatch();
  const handleSignOutOnClick = () => {
    dispatch(logoutAction());
  };
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo isActive={isActive}/>
          </div>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              {
                authStatus === AuthStatus.Auth ?
                  <>
                    <li className='header__nav-item user'>
                      <Link
                        className='header__nav-link header__nav-link--profile'
                        to={AppRoute.Favorites}
                      >
                        <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                        <span className='header__user-name user__name'>
                          {userData?.email}
                        </span>
                        <span className='header__favorite-count'>{favoriteOffers.length}</span>
                      </Link>
                    </li>
                    <li className='header__nav-item'>
                      <a className='header__nav-link' href='#' onClick={handleSignOutOnClick}>
                        <span className='header__signout'>Sign out</span>
                      </a>
                    </li>
                  </> :
                  <li className='header__nav-item'>
                    <Link className='header__nav-link header__nav-link--login' to={AppRoute.Login}>
                      <span className='header__login'>Login</span>
                    </Link>
                  </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
