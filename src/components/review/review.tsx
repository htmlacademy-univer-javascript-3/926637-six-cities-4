import {Comment} from '../../types/comment';

type ReviewProps = {
  comment: Comment;
};

const months = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];


export function Review ({comment}: ReviewProps): JSX.Element {
  const date = new Date(comment.date);
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img
            className='reviews__avatar user__avatar'
            src={comment.user.avatarUrl}
            width={54}
            height={54}
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>{comment.user.name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{ width: `${20 * comment.rating}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>
          {comment.comment}
        </p>
        <time className='reviews__time' dateTime={comment.date}>
          {months[date.getMonth()]} {date.getFullYear()}
        </time>
      </div>
    </li>
  );
}

export default Review;
