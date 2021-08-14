import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function CCCard() {

  const classes = useStyles();

    return (
      <div className="CCCard">
        <h2>CCCard</h2>
        <Grid item xs={12}>
          <Paper className={classes.paper}>  
          papers
          </Paper>
        </Grid>
      </div>
    );
  }
  
  export default CCCard;