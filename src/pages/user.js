import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Campaign from '../components/campaign/Campaign';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import CampaignSkeleton from '../util/CampaignSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    campaignIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const campaignId = this.props.match.params.campaignId;

    if (campaignId) this.setState({ campaignIdParam: campaignId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { campaigns, loading } = this.props.data;
    const { campaignIdParam } = this.state;

    const campaignMarkup = loading ? (
      <CampaignSkeleton />
    ) : campaigns === null ? (
      <p>No campaigns from this user</p>
    ) : !campaignIdParam ? (
      campaigns.map((campaign) => <Campaign key={campaign.campaignId} campaign={campaign} />)
    ) : (
      campaigns.map((campaign) => {
        if (campaign.campaignId !== campaignIdParam)
          return <Campaign key={campaign.campaignId} campaign={campaign} />;
        else return <Campaign key={campaign.campaignId} campaign={campaign} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {campaignMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
