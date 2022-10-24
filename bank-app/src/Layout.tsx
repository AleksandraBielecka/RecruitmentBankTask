import * as React from "react";
import Container from "react-bootstrap/Container";
import Footer from "./Footer";
import Header from "./Header";
import Dashboard from "./views/Dashboard";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <Container>
        <Dashboard />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
