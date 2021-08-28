import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useContact from "../../hooks/useContact";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const ContactList = () => {
  const classes = useStyles();
  const { contacts, deleteContact, setCurrentContact, loading } = useContact();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        List of Contacts
      </Typography>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <List className={classes.root}>
          {contacts.length > 0 ? (
            contacts.map(contact => (
              <div key={contact._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>J</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          style={{ display: "block" }}
                        >
                          {contact.email}
                        </Typography>
                        <Typography
                          style={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {contact.phone}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => setCurrentContact(contact)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteContact(contact._id)}
                  >
                    Remove
                  </Button>
                </ListItem>
                <Divider />
              </div>
            ))
          ) : (
            <div>No Contact yet.</div>
          )}
        </List>
      )}
    </div>
  );
};

export default ContactList;
