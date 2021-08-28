import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Layout from "../layout";
import useAuth from "../../hooks/useAuth";
import useContact from "../../hooks/useContact";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const Contact = () => {
  const classes = useStyles();
  const { setCurrentUser } = useAuth();
  const { getContacts } = useContact();

  useEffect(() => {
    setCurrentUser();
  }, []);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return (
    <Layout>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={6} sm={6}>
            <ContactList />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Contact;
