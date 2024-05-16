import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Header } from '../../components/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header isActive={false}/>
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Oops... Page not found.</b>
                <p className="cities__status-description">
                  <Link to={AppRoute.Main}>Back go the main page</Link>
                </p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
