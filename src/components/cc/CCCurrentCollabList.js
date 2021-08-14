import CampaignCard from "../forms_and_cards/CampaignCard";

import Grid from '@material-ui/core/Grid';


function CCCurrentCollabList() {

    return (
      <div className="cc-current-collab-list">
        <h2>CCCurrentCollabList</h2>
        <Grid container spacing={1}>
          <CampaignCard />
        </Grid>
      </div>
    );
  }
  
  export default CCCurrentCollabList;