import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class CenteredGrid extends React.Component {

  render() {
    const { classes } = this.props;
    return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <h3>
            Opened issues
          </h3>
          464
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <h3>Opened PRs</h3>
          37
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <h3>Points left in April</h3>
          0</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
  }
}
export default withStyles(styles)(CenteredGrid);