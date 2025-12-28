import {Review} from '../../types/review.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {fetchReviews, sendReview} from '../api-actions/review.ts';


type ReviewsDataState = {
  reviews: Review[];
  isLoading: boolean;
  sendingReview: boolean;
  hasSubmitError : boolean;
}

const initialState: ReviewsDataState = {
  reviews: [],
  isLoading: false,
  sendingReview: false,
  hasSubmitError: false
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearError: (state) => {
      state.hasSubmitError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(sendReview.pending, (state) => {
        state.sendingReview = true;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.sendingReview = false;
      })
      .addCase(sendReview.rejected, (state) => {
        state.sendingReview = false;
        state.hasSubmitError = true;
      });
  },
});

export const { clearError } = reviewsData.actions;
