import {
  SET_CAMPAIGNS,
  LIKE_CAMPAIGN,
  UNLIKE_CAMPAIGN,
  LOADING_DATA,
  DELETE_CAMPAIGN,
  POST_CAMPAIGN,
  SET_CAMPAIGN,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  campaigns: [],
  campaign: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
        loading: false
      };
    case SET_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload
      };
    case LIKE_CAMPAIGN:
    case UNLIKE_CAMPAIGN:
      let index = state.campaigns.findIndex(
        (campaign) => campaign.campaignId === action.payload.campaignId
      );
      state.campaigns[index] = action.payload;
      if (state.campaign.campaignId === action.payload.campaignId) {
        state.campaign = action.payload;
      }
      return {
        ...state
      };
    case DELETE_CAMPAIGN:
      index = state.campaigns.findIndex(
        (campaign) => campaign.campaignId === action.payload
      );
      state.campaigns.splice(index, 1);
      return {
        ...state
      };
    case POST_CAMPAIGN:
      return {
        ...state,
        campaigns: [action.payload, ...state.campaigns]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        campaign: {
          ...state.campaign,
          comments: [action.payload, ...state.campaign.comments]
        }
      };
    default:
      return state;
  }
}
