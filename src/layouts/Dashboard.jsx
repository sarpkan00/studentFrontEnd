import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import Login from '../pages/Login'
import Register from '../pages/Register'
import StudentList from '../pages/StudentList'
import Navi from './Navi'
import { Container, Grid } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify'
import Footer from './Footer'
import { authItem } from '../store/initialValues/authItem';
import StudentUpdate from '../pages/StudentUpdate';
import Cookies from 'js-cookie';
import UserService from '../services/userService';

export default function Dashboard() {

    const [user, setUser] = useState(false);
    const [routed, setRouted] = useState(false);
    const [users, setUsers] = useState([])
    const history = useNavigate();
    let userService = new UserService();

    useEffect(()=>{
        userService.getAll().then((result) => {
            setUsers(result.data);
          });
    },[])

    console.log(users);
    const setLogged = () => {
        if(Cookies.get("user") != null){
            return(
                <Route exact path="/" element={<StudentList></StudentList>}/>
            )
        }else{
                if(window.location.pathname !== "/login" && window.location.pathname !=="/register"){
                    if(typeof window != undefined){
                        window.location.href = "/login";
                    }
                }
        }
    }


    const isShowFooter = () => {
        if(typeof window !== undefined){
            if(window.location.pathname !== "/login" && window.location.pathname !== "/register"){
                return(
                    <>
                    <Footer/>
                    {console.log("another")}
                    </>
                )
            }else if(window.location.pathname === "/login" && window.location.pathname === "/register") {
                console.log("login reg")
            }
        }
    }


    return (

        <div>
            <ToastContainer position="bottom-right" />

            <Container className="main">
                <Grid stackable>

                    {/* {authItem[0].user ? <></>:<Navi/>} */}
                    <Navi/>
                    <Grid.Column width={16}>

                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Routes>
                            {setLogged()}
                            
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/register" element={<Register />} />
                            <Route exact path="/deneme" element={<StudentUpdate></StudentUpdate>} />
                        </Routes>

                    </Grid.Column>
                </Grid>
            </Container>
            {isShowFooter()}

        </div>

    )
}
