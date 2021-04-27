import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Stars from '../OView/StarRating';

import SizeFB from './AddRevComponents/SizeFB';
import WidthFB from './AddRevComponents/WidthFB';
import ComfortFB from './AddRevComponents/ComfortFB';
import QualityFB from './AddRevComponents/QualityFB';

const WriteModal = styled.div`
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(248,248,255);
  padding: 50px;
  zIndex=1000;
  border: 2.5px solid black;
  width: fit-content;
  height: 85%;
  font-family: Arial;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);

`;

const Close = styled.button`
  position: absolute;
  margin: 5px;
  background: transparent;
  border: none;
  top: 0;
  left: 0;
  &:hover {
    background: red;
  }
`;

const ClickableReview = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background: rgb(248,248,255);
  border-bottom: 3.5px solid black
`;

const Feedback = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background: rgb(248,248,255);
  border-bottom: 3.5px solid black
`;
const Title = styled.h2`
  padding: 10px;
  text-align: center;
`;

const ReviewComponent = styled.div`
  margin-top: 28px;
  margin-bottom: 28px;
  margin-right: 56px;
`;

const SummaryInput = styled.textarea`
  background: rgb(248,248,255);
  font-family: Arial;
  border: none;
  width: 2in;
  height: fit-content;
`;

const UserInput = styled.textarea`
  background: rgb(248,248,255);
  border: none;
  font-family: Arial;
`;

const SubmitButton = styled.button`
  position: absolute;
  margin: 5px;
  background: transparent;
  border: none;
  &:hover {
    background: lightgreen;
    padding: 5px;
  }
`;
const starCategory = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great!',
};

const productChars = {
  Size: {
    id: 14,
    value: 0,
  },
  Width: {
    id: 15,
    value: 0,
  },
  Quality: {
    id: 16,
    value: 0,
  },
  Comfort: {
    id: 17,
    value: 0,
  },
};

const AddReview = ({ open, onClose, currentProduct }) => {
  if (!open) return null;
  const [reviewStars, updateRStars] = useState(5);
  const [didRecommend, updateRec] = useState(null);
  const [sizeFeedback, updateSizeF] = useState(0);
  const [widthFeedback, updateWidthF] = useState(0);
  const [comfortFeedback, updateComfortF] = useState(0);
  const [qualityFeedback, updateQualityF] = useState(0);
  const [reviewSummary, updateSummary] = useState('');
  const [reviewBody, updateBody] = useState('');
  const [userName, updateUserName] = useState('');
  const [email, updateEmail] = useState('');
  const [images, updateImages] = useState([]);
  const [characteristics, updateChars] = useState(productChars);

  // const postReview = () => {
  //   const data = {
  //     product_id: currentProduct.id,
  //     rating: reviewStars,
  //     summary: reviewSummary,
  //     body: reviewBody,
  //     recommend: didRecommend,
  //     name: userName,
  //     email,
  //     photos: images,
  //     characteristics,
  //   };
  //   axios.post('/reviews', data)
  //     .then((response) => {
  //       console.log('Upload successful!', response);
  //     })
  //     .catch((error) => {
  //       console.log('Failed to Post', error);
  //     });
  // };

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <WriteModal>
        <Title>
          WRITE YOUR REVIEW:
          {' '}
          <span><u>{currentProduct.name}</u></span>
        </Title>
        <form>
          <ClickableReview>
            <ReviewComponent>
              <h4>Would you recommend this product?</h4>
              <div>
                <input type="radio" name="recommend" value="Yes" required onClick={() => updateRec(true)} />
                <label htmlFor="Yes"> Yes </label>
              </div>
              <div>
                <input type="radio" name="recommend" value="No" onClick={() => updateRec(false)} />
                <label htmlFor="No"> No </label>
              </div>
            </ReviewComponent>
            <ReviewComponent>
              <h4>*How would you rate this product?</h4>
              <input type="range" name="rating" min="1" max="5" step="1" required onChange={(event) => updateRStars(event.target.value)} />
              <div>{starCategory[reviewStars]}</div>
              <Stars rating={reviewStars} />
            </ReviewComponent>
            <ReviewComponent>
              <SizeFB
                sizeFeedback={sizeFeedback}
                updateSizeF={updateSizeF}
                characteristics={characteristics}
                updateChars={updateChars}
              />
            </ReviewComponent>
            <ReviewComponent>
              <WidthFB
                widthFeedback={widthFeedback}
                updateWidthF={updateWidthF}
                characteristics={characteristics}
                updateChars={updateChars}
              />
            </ReviewComponent>
            <ReviewComponent>
              <ComfortFB
                comfortFeedback={comfortFeedback}
                updateComfortF={updateComfortF}
                characteristics={characteristics}
                updateChars={updateChars}
              />
            </ReviewComponent>
            <ReviewComponent>
              <QualityFB
                qualityFeedback={qualityFeedback}
                updateQualityF={updateQualityF}
                characteristics={characteristics}
                updateChars={updateChars}
              />
            </ReviewComponent>
          </ClickableReview>
          <Feedback>
            <ReviewComponent>
              <h5>Review Summary:</h5>
              {' '}
              <SummaryInput type="text" value={reviewSummary} onChange={(event) => updateSummary(event.target.value)} placeholder="Love it" maxLength="60" />
            </ReviewComponent>
            <ReviewComponent>
              <h5>*Details:</h5>
              {' '}
              <SummaryInput type="text" required value={reviewBody} onChange={(event) => updateBody(event.target.value)} placeholder="Best purchase ever!" maxLength="1000" minLength="50" />
            </ReviewComponent>
            <ReviewComponent>
              <h5>*Username:</h5>
              {' '}
              <UserInput type="text" required value={userName} onChange={(event) => updateUserName(event.target.value)} placeholder="Username" minlength="10" maxLength="60" />
            </ReviewComponent>
            <ReviewComponent>
              <h5>*Email:</h5>
              {' '}
              <UserInput type="text" required value={email} onChange={(event) => updateEmail(event.target.value)} placeholder="Email" minlength="10" maxLength="250" />
            </ReviewComponent>
            <ReviewComponent>
              <h5>Images: (Max 5) </h5>
              {' '}
              {images.length < 5 && (
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => updateImages((oldImages) => [...oldImages, e.target.files[0]])}
              />
              )}
              <div>
                {images.length}
                {' '}
                added
              </div>
            </ReviewComponent>
          </Feedback>
          <SubmitButton type="submit">
            <strong>
              <u>
                SUBMIT
              </u>
            </strong>
          </SubmitButton>
        </form>
        <Close type="button" onClick={onClose}>
          <strong>
            <u>
              x
            </u>
          </strong>
        </Close>

      </WriteModal>
    </>, document.getElementById('portal'),
  );
};

export default AddReview;
