import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { white } from 'material-ui/styles/colors';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 40,
    borderTop: '2px solid #77b748',
    marginTop: 150,
    background: '#f6f7f9',
    textAlign: 'center'
  },
  imgAva: {
    height: 100,
    width: 100,
    border: '2px solid white',
    borderRadius: '50%'
  },
  grayFotter: {
    background: '#484848',
    height: 50,
    width: '100%'
  },
  copyRight: {
    color: white,
    marginLeft: 20,
    padding: 15
  }
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Container>
          <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item xs>
              <img alt="img" src="https://ca.slack-edge.com/TM2QVR1GU-UMH122R7Z-0b186193ccd6-512" className={classes.imgAva} />
              <p>Tasnim Zakarneh</p>
            </Grid>
            
            <Grid item xs>
              <img alt="img" src="https://i.ibb.co/MfmVMTX/Screen-Shot-2019-12-20-at-10-41-48-PM.png" className={classes.imgAva} />
              <p>Nour Saqqa</p>
            </Grid>
            <Grid item xs>
              <img alt="img" src="https://ca.slack-edge.com/TM2QVR1GU-UMA80TBPT-b7bd933b562d-512" className={classes.imgAva} />
              <p>Nazeh M.Taha</p>
            </Grid>
            <Grid item xs>
              <img alt="img" src="https://ca.slack-edge.com/TM2QVR1GU-UMELWK15J-420bcea92d48-512" className={classes.imgAva} />
              <p>Alaa Al Agha</p>
            </Grid>
            
            <Grid item xs>
              <img alt="img" src="https://ca.slack-edge.com/TM2QVR1GU-UMF5C2H7X-4ec876416ea9-512" className={classes.imgAva} />
              <p>Yasmeen Othman</p>
            </Grid>
          </Grid>
        </Container>

      </div>
      <div className={classes.grayFotter}>
        <p className={classes.copyRight}>2019 All Rights Reserved By © BookBank</p>
      </div>
    </div>
  );
};

export default Footer;