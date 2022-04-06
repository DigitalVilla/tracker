import { InputField, PageLayout } from "../../components/index";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth-context";
import { isValid as is } from "../../utils";
import { page } from "../../appTypes";
import styles from "./Signup.module.scss";

export function Signup() {
  const [, actions] = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState({});
  const values = useRef({});
  const userRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
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
      actions.signup(values.current).then(() => {
        toSignin();
      });
    }
  };

  const toSignin = () => {
    void navigate(page.SIGNIN);
  };

  return (
    <PageLayout isLoading={isLoading}>
      <div className={styles.container}>
        <h2>Sign up</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            ref={userRef}
            error={errors.username}
            onBlur={handleBlur}
            max={40}
            autocomplete="off"
            placeholder="Enter a Username"
          />
          <InputField
            label="Age"
            name="age"
            max={3}
            regExp={/^[0-9]*$/i}
            error={errors.age}
            onBlur={handleBlur}
            placeholder="Enter yor Age"
          />
          <InputField
            label="Email"
            name="email"
            autocomplete="off"
            error={errors.email}
            regExp={/^[A-Z0-9-_+@.]*$/i}
            max={60}
            onBlur={handleBlur}
            placeholder="Enter your Email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            ref={passRef}
            error={errors.password}
            onBlur={handleBlur}
            placeholder="Enter Password"
          />

          <button className={styles.btnSubmit}>Sign Up</button>
          <button className={styles.forgot} onClick={toSignin}>
            Sign In!
          </button>
        </form>
      </div>
    </PageLayout>
  );
}

export default Signup;
