/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username is Too Short!")
    .max(50, "username is Too Long!")
    .required("username is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  )
});


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }

submitForm = (values) => {
  axios
  .post("http://localhost:8080/register",values)
  .then( res => {
    console.log(res.data.result);
    if(res.data.result === "success"){
      swal("Success!", res.data.message, "success").then(value => {
        this.props.history.push("/login");
      });
    } else if (res.data.result === "error") {
      swal("Error!", res.data.message, "error");
    }
  })
  .cathch(error => {
    console.log(error);
    swal("Error!", "Unexpected error", "error")
  })
};
  
showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    return(
      <form onSubmit={handleSubmit}>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            className="form-control"
            placeholder="Username"
            className={
              errors.username && touched.username
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.fullname && touched.fullname ? (
            <small id="passwordHelp" class="text-danger">
              {errors.username}
            </small>
          ) : null}
          <div className="form-group has-feedback">
            <input 
              type="text"
              name="email"
              className={
                errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
              }
              onChange={handleChange}
              value={values.email}
              placeholder="Email"
            />
            {errors.email && touched.email ? (
              <small id="passwordHelp" class="text-danger">
                {errors.email}
              </small>
            ) : null}
          </div>
          <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className={
              errors.password && touched.password
              ? "form-control is-invalid"
              : "form-control"
            }
            placeholder="Password"
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="confirm_password"
            className={
              errors.password && touched.password
              ? "form-control is-invalid"
              : "form-control"
            }
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-block btn-flat"
            >
              Confirm
            </button>
          </div>
        </div>

          {/* end of form-group */}
        </div>

      </form>
    );
  }

  render() {
    return(
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">
            <b>Basic</b>POS
          </a>
        </div>{/* register-logo end */}
        <div className="card">
          <div className="caed-body register-card-body" >
            <p classNmme="login-box-msg"> Register a new membership</p>
            <Formik
              initialValues={{
                fullname: "",
                email: "",
                password: "",
                confirm_password: ""
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.submitForm(values, this.props.history);
                console.log("register.js Formik values= "+values);
                setSubmitting(false);
              }}
              validationSchema={SignupSchema}
            >
              {props => this.showForm(props)}
            </Formik>
              {/*end of register-card-body*/}
          </div> 
              {/*card end*/}
        </div> 
              {/* register-box end */}
      </div> 
    );
  }
}

export default Register;
