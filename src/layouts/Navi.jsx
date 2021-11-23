import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Menu, Icon } from 'semantic-ui-react';
import "../App.css";
import SingedIn from "./SignedIn";
import SingedOut from "./SignedOut";
import './none.css';

export default function Navi() {


  const isLogged = () => {
    if(Cookies.get("user") !== undefined){
      return(
        <>
        <SingedIn/>
        
        </>
      )
    }
    else{
      return(
        <>
        <SingedOut/>
        </>
      )
    }
  }
  

  return (
    <>
    <Menu size="huge" inverted stackable>
      <Container>
        {
          Cookies.get("user") ? <Menu.Item name="Ana Sayfa" as={Link} to={"/"}>
          Ana Sayfa
    </Menu.Item> : null
        }
  
        <Menu.Menu position="right" style={{ margin: '1em' }}>
        { Cookies.get("user") !== undefined ? <SingedIn /> : <SingedOut /> } 
        </Menu.Menu>
      </Container>
    </Menu>
  </>
  );
}

/* <div>
<Menu size="huge" inverted stackable>
  <Container>
    <button className={isLogged() ? null : `signOutNone` }>
      
      Ana Sayfa
    {/* <Menu.Item name="Ana Sayfa" as={Link} to={"/"} >
    <Icon name="home" />Ana Sayfa
    </Menu.Item> 
    </button>
    <Menu.Menu position="right">
      {isLogged() }
    </Menu.Menu>
  </Container>
</Menu> 
</div> */
