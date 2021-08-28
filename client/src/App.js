import React from "react";
import { ContactProvider } from "./contexts/contact/contact.context";
import { AuthProvider } from "./contexts/auth/auth.context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Contact from "./components/contacts";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <AuthProvider>
      <ContactProvider>
        <Router>
          <Switch>
            <PrivateRoute path="/" exact comp={Contact} />
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
          </Switch>
        </Router>
      </ContactProvider>
    </AuthProvider>
  );
}

export default App;
