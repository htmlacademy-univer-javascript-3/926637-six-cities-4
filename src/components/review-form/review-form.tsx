import React, { FormEvent, useEffect, useState } from 'react';
import { postComment } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { HttpStatusCode } from 'axios';

export function ReviewForm() {
  const [formData, setFormData] = React.useState({
    review: '',
    rating: '',
  });

  const [isButtonEnabled, setIsButtonEnabled] = React.useState<boolean>(false);
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = React.useState<boolean>(false);


  const handleFieldChange = (evt: { target: { name: string; value: string } }) => {
    if (isFormBeingSubmitted) {
      return;
    }
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  useEffect(() => {
    const reviewLength = formData.review.length;
    const rating = parseInt(formData.rating, 10);
    setIsButtonEnabled(!isFormBeingSubmitted && 1 <= rating && rating <= 5 && 50 <= reviewLength && reviewLength < 300);
  }, [formData, isFormBeingSubmitted]);

  const params = useParams();
  const offerId = params.id;

  const dispatch = useAppDispatch();

  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);
  const [currentStarInput, setCurrentStarInput] = useState<HTMLInputElement | null>(null);

  const handleFormOnSumbit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (offerId === undefined){
      return;
    }

    setIsFormBeingSubmitted(true);
    dispatch(postComment({offerId: offerId,
      comment: formData.review,
      rating: parseInt(formData.rating, 10)})).then((result) => {
      const isError = result.payload !== HttpStatusCode.Created;
      setIsErrorOccured(isError);
      setIsFormBeingSubmitted(false);
      if (isError){
        return;
      }
      formData.rating = '';
      formData.review = '';
      if (currentStarInput !== null){
        currentStarInput.checked = false;
      }
      return isError;
    });
  };

  const starInputTitle = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

  return (
    <form className='reviews__form form' action='' onSubmit={handleFormOnSumbit}>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {
          [...Array(5).keys()].map((x) => 5 - x).map((x) => (
            <>
              <input
                className='form__rating-input visually-hidden'
                name='rating'
                defaultValue={x}
                id={`${x}-stars`}
                type='radio'
                onChange={handleFieldChange}
                onClick={(evt) => setCurrentStarInput(evt.currentTarget)}
              />
              <label
                htmlFor={`${x}-stars`}
                className='reviews__rating-label form__rating-label'
                title={starInputTitle[x - 1]}
              >
                <svg className='form__star-image' width={37} height={33}>
                  <use xlinkHref='#icon-star' />
                </svg>
              </label>
            </>)
          )
        }
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={formData.review}
        onChange={handleFieldChange}
      />
      {
        isErrorOccured ?
          <p className='reviews__help'>
            <b style={{color: 'red'}}>Error occured while submitting review...</b>
          </p> : ''
      }
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set{' '}
          <span className='reviews__star'>rating</span>
          and describe your stay with at least{' '}
          <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          disabled={!isButtonEnabled}
          type='submit'
        >
          Submit
        </button>
      </div>
    </form>
  );
}
