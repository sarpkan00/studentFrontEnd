import { replace } from 'formik'
import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { userLogout } from "../store/actions/authActions"

export default function SingedIn({}) {

    const {authItem} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useNavigate();

    const handleLogout=(user)=>{
        dispatch(userLogout(user))
        Cookies.remove("user");
        history("/",{replace : true})
    }

    return (
        <div>
            <Menu.Item>
                <Dropdown pointing="top right" text={authItem[0].user.name}>
                <Dropdown.Item onClick={()=>handleLogout(authItem[0].user)}><Icon name='sign-out' /> Çıkış yap</Dropdown.Item>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}