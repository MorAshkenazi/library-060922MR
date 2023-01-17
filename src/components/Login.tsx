import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import User from "../interfaces/User";
import { checkUser } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  setIsLoggedIn: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setIsLoggedIn }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values: User) => {
      checkUser(values)
        .then((res) => {
          if (res.data.length) {
            navigate("/home");
            setIsLoggedIn(true);
            sessionStorage.setItem("isLoggedIn", "true");
          } else navigate("/");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container mt-5 col-md-3">
        <h5 className="display-5">LOGIN</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 my-3"
            disabled={!formik.isValid || !formik.dirty}
          >
            Login
          </button>
        </form>
        <Link to="/register">New user? Register here</Link>
      </div>
    </>
  );
};

export default Login;
