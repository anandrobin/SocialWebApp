import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeCampaign, unlikeCampaign } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedCampaign = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.campaignId === this.props.campaignId
      )
    )
      return true;
    else return false;
  };
  likeCampaign = () => {
    this.props.likeCampaign(this.props.campaignId);
  };
  unlikeCampaign = () => {
    this.props.unlikeCampaign(this.props.campaignId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedCampaign() ? (
      <MyButton tip="Undo like" onClick={this.unlikeCampaign}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeCampaign}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  campaignId: PropTypes.string.isRequired,
  likeCampaign: PropTypes.func.isRequired,
  unlikeCampaign: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeCampaign,
  unlikeCampaign
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
