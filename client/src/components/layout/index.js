import React from "react";
import Header from "./Header";
import Container from "@material-ui/core/Container";

export default ({ children }) => {
  return (
    <>
      <Header title="Contact Keeper" />
      <main style={{ margin: "50px 0" }}>
        <Container maxWidth="lg">{children}</Container>
      </main>
    </>
  );
};
