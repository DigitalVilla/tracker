import { InputField, PageLayout } from "../../components/index";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth-context";
import { isValid as is } from "../../utils";
import { page } from "../../appTypes";
import styles from "./Signin.module.scss";

export function Signin() {
  const [, actions] = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const values = useRef({ email: "", password: "" });
  const [errors, setError] = useState({ email: "", password: "" });
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleBlur = ({ target: { name, value } }) => {
    const error = is[name]({ value });
    if (!error) {
      values.current[name] = value;
      if (errors[name]) setError({ ...errors, [name]: "" });
    } else setError({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passRef.current.value) {
      values.current.password = passRef.current.value;
    }
    if (values.current.email && values.current.password) {
      setIsLoading(true);
      actions.signin(values.current);
    }
  };

  const toSignup = () => {
    void navigate(page.SIGNUP);
  };

  return (
    <PageLayout isLoading={isLoading}>
      <div className={styles.container}>
        <h2>Sign In</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            name="email"
            label="Email"
            ref={emailRef}
            error={errors.email}
            regExp={/^[A-Z0-9-_+@.]*$/i}
            max={60}
            onBlur={handleBlur}
            placeholder="Enter Email"
          />

          <InputField
            name="password"
            type="password"
            label="Password"
            ref={passRef}
            error={errors.password}
            onBlur={handleBlur}
            placeholder="Enter Password"
          />
          <button className={styles.btnSubmit}>Sign In</button>
          <button className={styles.forgot} onClick={toSignup}>
            Sign Up!
          </button>
        </form>
      </div>
    </PageLayout>
  );
}

export default Signin;
