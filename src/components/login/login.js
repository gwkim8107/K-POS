import React, { Component } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import {Link} from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
  .min(2, "username is Too Short!")
  .mzx(50, "username is Too Long!")
  .required("username is required"),
  password: Yup.string().required("password is required")
});

class Login extends Component {
  render() {
    return <div>Login</div>;
  }
}

export default Login;
