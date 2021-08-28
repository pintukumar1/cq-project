import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layout";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useAuth from "../../hooks/useAuth";

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: 500,
    margin: "0 auto"
  },
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

const Register = () => {
  const history = useHistory();
  const { register, isAuthenticated, setCurrentUser } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated, history]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    register(user);
  };

  const classes = useStyles();

  return (
    <Layout>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <div>
          <TextField
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            className={classes.input}
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            className={classes.input}
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Passworrd"
            type="password"
            variant="outlined"
            className={classes.input}
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className={classes.btn}
        >
          Login
        </Button>
      </form>
    </Layout>
  );
};

export default Register;
