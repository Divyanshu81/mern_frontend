import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from './../imgs/bg.jpg'; 

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    minHeight: '93vh',
    // Other styles you want to apply
  },
}));

const Welcome = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h2" color="White">Welcome to Job Portal</Typography>
      </Grid>
    </Grid>
  );
};

export const ErrorPage = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
