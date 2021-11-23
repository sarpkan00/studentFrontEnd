import React from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import UserService from "../services/userService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/authActions.js";
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {

    const dispatch = useDispatch()
    const { authItem } = useSelector(state => state.auth);
    const notify = () => toast("Wow so easy!");

    const handleLogin = (user) => {
        dispatch(userLogin(user))
    }

    const history = useNavigate();

    let userService = new UserService();
    const userLoginSchema = Yup.object().shape({
        userName: Yup.string().required("Bu alan doldurulmak zorundadır"),
        password: Yup.string().required("Bu alan doldurulmak zorundadır")
    })

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema: userLoginSchema,
        onSubmit: (values) => {
                userService.login(values).then((result) => {
                   handleLogin(result.data)
                   if(typeof window !== undefined){
                     window.location.href = "/login";
                   }
                }).catch((result) => {
                    toast.error(result)
                })
        }
    })

  return (
    <div>

      {
        <div>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://hrms.ph/img/logo-large.png" /> Kayıt Ol
          </Header>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <Segment stacked>
              <Grid stackable>
                <Grid.Column width={8}>
                  <div style={{ marginTop: "1em" }}>
                    <label><b>Kullanıcı Adı</b></label>

                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Kullanıcı Adı"
                      type="text"
                      value={formik.values.userName}
                      name="userName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {
                      formik.errors.userName && formik.touched.userName && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.userName}
                        </div>
                      )
                    }
                  </div>
                </Grid.Column>

                <Grid.Column width={8}>
                  <div style={{ marginTop: "1em" }}>
                    <label><b>Şifre</b></label>
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Şifre"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                </Grid.Column>
              </Grid>

              <br />
              <Button color="teal" fluid size="large" type="submit" >
                Register
            
              </Button>
            </Segment>
          </Form>

        </div>}
    </div>
  );
}