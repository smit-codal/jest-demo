import { useEffect, useState } from "react";
import "./login.css";
import InputBox from "../../components/Inputs/input";
import { loginUser } from "../../apiUtils";
import { useNavigate } from "react-router-dom";
import { paths } from "../../router";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formDetails, setFormDetails] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [formSubmitted, setFromSubmitted] = useState(false)

  const handleInputChange = (value: string, key: string) => {
    setFormDetails({
      ...formDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    if(formSubmitted) {
      checkFormError(formDetails);
    }
  }, [formDetails, formSubmitted]);

  const handleSubmit = async() => {
    setFromSubmitted(true)
    // check if form is valid
    const { email, password } = formDetails;
    if (email !== "" && password !== "") {
      try {
        setIsLoading(true)
        const res = await loginUser(formDetails);
        setIsLoading(false)
        if(res && res.token) {
          localStorage.setItem('token', res.token)
          navigate(paths.userList)
        }
      } catch(error: any) {
        console.log(error)
        setIsLoading(false)
        alert(error.message)
      }
    }
  };

  const checkFormError = (formDetails: LoginForm) => {
    let isFormValid = true;
    let formErrors = {
      email: "",
      password: "",
    };
    if (formDetails.email === "") {
      isFormValid = false;
      formErrors.email = "Email is required";
    }
    if (formDetails.password === "") {
      isFormValid = false;
      formErrors.password = "Password is required";
    }
    setFormError(formErrors);
    return isFormValid;
  };

  return (
    <>
      <div className="login-container center">
        <h1>Login</h1>
        {
          isLoading && <div className="status-text">Submitting...</div>
        }
        <form>
          <InputBox
            type="text"
            placeholder="Username"
            value={formDetails.email}
            name="email"
            handleChange={handleInputChange}
          />
          {formError.email && (
            <div className="error-block">{formError.email}</div>
          )}
          <InputBox
            type="password"
            placeholder="Password"
            value={formDetails.password}
            name="password"
            handleChange={handleInputChange}
          />
          {formError.password && (
            <div className="error-block">{formError.password}</div>
          )}
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
