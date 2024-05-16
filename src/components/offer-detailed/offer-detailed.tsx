import { AuthStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setFavoriteOffer } from '../../store/api-actions';
import { OfferDetailed } from '../../types/offer';
import { OfferComment } from '../../types/offer-comment';
import { capitalizeFirstLetter } from '../../utils/capitalize-first-letter';
import Loading from '../loading/loading';
import { ReviewForm } from '../review-form/review-form';
import ReviewList from '../review-list/review-list';

type OfferCardDetailedProps = {
  currentOffer: OfferDetailed;
  isDoneFetchingOfferComments: boolean;
  authStatus: AuthStatus;
  comments: OfferComment[];
}

export function OfferCardDetailed({currentOffer, authStatus, isDoneFetchingOfferComments, comments}: OfferCardDetailedProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleBookmarkOnClick = () => {
    dispatch(setFavoriteOffer({offerId: currentOffer.id, isFavorite: !currentOffer.isFavorite}));
  };

  return (
    <>
      <div className='offer__gallery-container container'>
        <div className='offer__gallery'>
          {
            currentOffer.images.slice(0, 6).map((image) => (
              <div className='offer__image-wrapper' key={image}>
                <img
                  className='offer__image'
                  src={image}
                  alt='Photo studio'
                />
              </div>)
            )
          }
        </div>
      </div>
      <div className='offer__container container'>
        <div className='offer__wrapper'>
          {
            currentOffer.isPremium ?
              (
                <div className='offer__mark'>
                  <span>Premium</span>
                </div>
              ) : ''
          }
          <div className='offer__name-wrapper'>
            <h1 className='offer__name'>
              {currentOffer.title}
            </h1>
            <button className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type='button' onClick={handleBookmarkOnClick}>
              <svg className='offer__bookmark-icon' width={31} height={33}>
                <use xlinkHref='#icon-bookmark' />
              </svg>
              <span className='visually-hidden'>To bookmarks</span>
            </button>
          </div>
          <div className='offer__rating rating'>
            <div className='offer__stars rating__stars'>
              <span style={{ width: `${20 * Math.round(currentOffer.rating)}%` }} />
              <span className='visually-hidden'>Rating</span>
            </div>
            <span className='offer__rating-value rating__value'>{currentOffer?.rating}</span>
          </div>
          <ul className='offer__features'>
            <li className='offer__feature offer__feature--entire'>
              {capitalizeFirstLetter(currentOffer.type)}
            </li>
            <li className='offer__feature offer__feature--bedrooms'>
              {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms === 1 ? '' : 's'}
            </li>
            <li className='offer__feature offer__feature--adults'>
              Max {currentOffer.maxAdults} adult{currentOffer.maxAdults === 1 ? '' : 's'}
            </li>
          </ul>
          <div className='offer__price'>
            <b className='offer__price-value'>€{currentOffer.price}</b>
            <span className='offer__price-text'>&nbsp;night</span>
          </div>
          <div className='offer__inside'>
            <h2 className='offer__inside-title'>What&aposs inside</h2>
            <ul className='offer__inside-list'>
              {
                currentOffer.goods.map((good) => <li className='offer__inside-item' key={good}>{good}</li>)
              }
            </ul>
          </div>
          <div className='offer__host'>
            <h2 className='offer__host-title'>Meet the host</h2>
            <div className='offer__host-user user'>
              <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                <img
                  className='offer__avatar user__avatar'
                  src={currentOffer.host.avatarUrl}
                  width={74}
                  height={74}
                  alt='Host avatar'
                />
              </div>
              <span className='offer__user-name'>{currentOffer.host.name}</span>
              {
                currentOffer.host.isPro ? <span className='offer__user-status'>Pro</span> : ''
              }
            </div>
            <div className='offer__description'>
              <p className='offer__text'>
                {currentOffer.description}
              </p>
            </div>
          </div>
          <section className='offer__reviews reviews'>
            {
              isDoneFetchingOfferComments ? <ReviewList comments={comments}/> : <Loading/>
            }
            {
              authStatus === AuthStatus.Auth ? <ReviewForm/> : ''
            }
          </section>
        </div>
      </div>
    </>
  );
}
