import { useEffect, useState } from 'react';
import {OfferComment} from '../../types/offer-comment';
import {Review} from '../review/review';

type ReviewListProps = {
    comments: OfferComment[];
};


function ReviewList ({comments}: ReviewListProps): JSX.Element {
  const [newestComments, setNewestComments] = useState<OfferComment[]>([]);
  useEffect(() => {
    setNewestComments(comments.toSorted((a, b) => (new Date(a.date).getTime() - (new Date(b.date)).getTime())).slice(-10).reverse());
  }, [comments]);
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {newestComments.map((comment) => <Review comment={comment} key={comment.id}/>)}
      </ul>
    </>
  );
}

export default ReviewList;
