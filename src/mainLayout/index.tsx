import React, { useState } from "react";
import { Icon, Menu, Sidebar, Container } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Users from "../pages/Users";
import { useSessionState } from "../session";

type item = {
  to: string;
  content: string;
};

type MainLayoutProps = {
  children?: React.ReactNode;
  items: item[];
};

export default function MainLayout({ children, items }: MainLayoutProps) {
  // state
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const sessionState = useSessionState();

  // event handlers
  const handlePusher = () => {
    if (visible) {
      setVisible(false);
    }
  };
  const handleToggle = () => setVisible(prev => !prev);
  const handleItemClick = (key: number) => () => {
    setVisible(false);
    setActiveItem(key);
  };

  // styles
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 768px)"
  });
  const topMenuStyle = isDesktopOrLaptop ? { paddingLeft: "5.5em" } : {};
  const containerStyle = isDesktopOrLaptop
    ? { marginTop: "5em", paddingLeft: "12em", paddingRight: "3em" }
    : { marginTop: "5em" };

  return (
    <Router>
      <Sidebar.Pushable>
        <Sidebar
          width="thin"
          size="large"
          as={Menu}
          animation="overlay"
          vertical
          visible={isDesktopOrLaptop ? true : visible}
        >
          {items.map((item, index) => (
            <Menu.Item
              active={activeItem === index}
              as={Link}
              key={index}
              onClick={handleItemClick(index)}
              {...item}
            />
          ))}
        </Sidebar>
        <Sidebar.Pusher
          dimmed={isDesktopOrLaptop ? false : visible}
          onClick={handlePusher}
          style={{ minHeight: "100vh" }}
        >
          <Menu color="teal" inverted size="massive" borderless fixed="top">
            <Menu.Item onClick={handleToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
            <Menu.Item
              style={topMenuStyle}
              header
              content={
                items[activeItem].content + " - Welcome " + sessionState.email
              }
            />
          </Menu>
          <Container fluid style={containerStyle}>
            {children}
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/users" component={Users} />
            </Switch>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Router>
  );
}
