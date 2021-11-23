import React, { useEffect, useState } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import UserService from "../services/userService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/authActions.js";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Login() {
  let userService = new UserService();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let userService = new UserService();
    userService.getAll().then((result) => {
      setUsers(result.data);

    });
  }, []);


  const dispatch = useDispatch();
  const { authItem } = useSelector((state) => state.auth);
  const notify = () => toast("Wow so easy!");

  const handleLogin = (user) => {
    dispatch(userLogin(user));
  };

  const history = useNavigate();

  const userLoginSchema = Yup.object().shape({
    userName: Yup.string().required("Bu alan doldurulmak zorundadır"),
    password: Yup.string().required("Bu alan doldurulmak zorundadır"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      users.map((user) => {
        if (
          values.userName == user.userName &&
          values.password == user.password
        ) {
          Cookies.set("user", values.password);
          history("/", { replace: true });
        } else {
        }
      });
    },
  });

  return (
    <div>
      {authItem[0].loggedIn === true && <div></div>}
      {
        <div>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://hrms.ph/img/logo-large.png" /> Giriş Yap
          </Header>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <Segment stacked>
              <div>
                <label>
                  <b>Kullanıcı Adı</b>
                </label>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Kullanıcı Adı"
                  type="userName"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.userName && formik.touched.userName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.userName}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Şifre</b>
                </label>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <Button
                color="teal"
                fluid
                size="large"
                type="submit"
                style={{ marginTop: "1em" }}
              >
                Giriş Yap
              </Button>
            </Segment>
          </Form>
          <Message info>
            Kayıtlı değilmisin?{" "}
            <b>
              <Link to={"/register"}>Şimdi Kaydol</Link>
            </b>
          </Message>
        </div>
      }
    </div>
  );
}
