import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import useContact from "../../hooks/useContact";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    marginBottom: 15
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    width: "100%",
    marginBottom: 15
  },
  btn: {
    width: "100%",
    height: 60
  }
}));

const ContactForm = () => {
  const classes = useStyles();
  const {
    addContact,
    currentContact,
    updateContact,
    clearCurrentContact
  } = useContact();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: ""
  });

  const handleChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setContact({
      name: "",
      email: "",
      phone: "",
      type: ""
    });
  };

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
    } else {
      resetForm();
    }
  }, [currentContact]);

  const handleSubmit = e => {
    e.preventDefault();
    addContact(contact);
    resetForm();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {currentContact ? "Edit Contact" : "Add Contact"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className={classes.input}
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className={classes.input}
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Contact Number"
            variant="outlined"
            className={classes.input}
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="type"
              value={contact.type}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"personal"}>Personal</MenuItem>
              <MenuItem value={"professional"}>Professional</MenuItem>
            </Select>
          </FormControl>
        </div>
        {currentContact ? (
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              type="button"
              color="primary"
              style={{ width: "50%", marginRight: 15 }}
              className={classes.btn}
              onClick={() => {
                updateContact(contact);
                clearCurrentContact();
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              type="button"
              color="secondary"
              style={{ width: "50%" }}
              className={classes.btn}
              onClick={clearCurrentContact}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.btn}
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
