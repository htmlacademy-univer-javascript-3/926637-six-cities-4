import { Link } from 'react-router-dom';
import { OfferCardType } from '../../const';
import { Offer } from '../../types/offer';
import { useAppDispatch } from '../../hooks';
import { setFavoriteOffer } from '../../store/api-actions';

type OfferCardProps = {
  offer: Offer;
  offerCardType: OfferCardType;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

function OfferCard({offer, offerCardType,
  onMouseOver = (() => 0), onMouseLeave = (() => 0)}: OfferCardProps): JSX.Element {
  let articleClassName: string = '';
  let imgWrapperClassName: string = '';
  let imgWidth: number = 0;
  let imgHeight: number = 0;
  let bookmarkButtonText: string = '';
  const bookmarkButtonClassName = `place-card__bookmark-button${offer.isFavorite ? '--active' : ''} button`;
  const offerUrl = `/offer/${offer.id}`;
  switch (offerCardType){
    case OfferCardType.Main:
      articleClassName = 'cities__card place-card';
      imgWrapperClassName = 'cities__image-wrapper place-card__image-wrapper';
      imgWidth = 260;
      imgHeight = 200;
      bookmarkButtonText = 'To bookmarks';
      break;
    case OfferCardType.Favorite:
      articleClassName = 'favorites__card place-card';
      imgWrapperClassName = 'favorites__image-wrapper place-card__image-wrapper';
      imgWidth = 150;
      imgHeight = 110;
      bookmarkButtonText = 'In bookmarks';
      break;
    case OfferCardType.Offer:
      articleClassName = 'near-places__card place-card';
      imgWrapperClassName = 'near-places__image-wrapper place-card__image-wrapper';
      imgWidth = 260;
      imgHeight = 200;
      bookmarkButtonText = 'In bookmarks';
      break;
    default:
      break;
  }
  const dispatch = useAppDispatch();
  const handleBookmarkOnClick = () => {
    dispatch(setFavoriteOffer({offerId: offer.id, isFavorite: !offer.isFavorite}));
  };
  return (
    <article className={articleClassName} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      {
        offer.isPremium ? (
          <div className='place-card__mark'>
            <span>Premium</span>
          </div>
        ) : ''
      }
      <div className={imgWrapperClassName}>
        <Link to={offerUrl}>
          <img
            className='place-card__image'
            src={offer.previewImage}
            width={imgWidth}
            height={imgHeight}
            alt='Place image'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>€{offer.price}</b>
            <span className='place-card__price-text'>/&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClassName} type='button' onClick={handleBookmarkOnClick}>
            <svg className='place-card__bookmark-icon' width={18} height={19}>
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>{bookmarkButtonText}</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${20 * offer.rating}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={offerUrl}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
