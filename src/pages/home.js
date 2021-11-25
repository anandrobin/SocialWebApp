import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Campaign from '../components/campaign/Campaign';
import Profile from '../components/profile/Profile';
import CampaignSkeleton from '../util/CampaignSkeleton';

import { connect } from 'react-redux';
import { getCampaigns } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getCampaigns();
  }
  render() {
    const { campaigns, loading } = this.props.data;
    let recentCampaignsMarkup = !loading ? (
      campaigns.map((campaign) => <Campaign key={campaign.campaignId} campaign={campaign} />)
    ) : (
      <CampaignSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentCampaignsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getCampaigns: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getCampaigns }
)(home);
