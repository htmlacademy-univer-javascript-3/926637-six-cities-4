import {Comment} from '../../types/comment';
import {Review} from '../review/review';

type ReviewListProps = {
    comments: Comment[];
};


function ReviewList ({comments}: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <Review comment={comment} key={comment.id}/>)}
    </ul>
  );
}

export default ReviewList;
