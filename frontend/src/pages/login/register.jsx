import { useState } from "react";
import FormInput from "../../components/forms/input";
import EyeIcon from "../../components/icons/eye";
import EyeHiddenIcon from "../../components/icons/eyeHidden";

import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/toast";
import api from "../../utils/api";
import apiEndPoints from "../../constants/apiEndPoints";
import DownSortIcon from "../../components/icons/downSortIcon";
const Register = ({ setRegister }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginObj, setLoginObj] = useState({ role: 2 });

  const onChange = (e) => {
    setLoginObj({ ...loginObj, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    api
      .post(apiEndPoints.REGISTER_USER(), loginObj)
      .then((res) => {
        dispatch(setAlert("Sign Up Success!.", "danger", 2000));
        setRegister(false);
      })
      .catch((err) => {
        dispatch(setAlert(err?.response?.data?.message, "danger", 2000));
      });
  };

  return (
    <form className="forms">
      <FormInput
        id="name"
        type="text"
        isRequired={false}
        labelText="User Name"
        name="name"
        value={loginObj?.name || ""}
        warnText="User Name is required"
        onChange={onChange}
      />
      <FormInput
        id="loginEmail"
        type="text"
        isRequired={false}
        labelText="Email Address"
        name="email"
        value={loginObj?.email || ""}
        warnText="Email Address is required"
        onChange={onChange}
      />

      <FormInput
        id="loginPassword"
        type={showPassword ? "text" : "password"}
        labelText="Password"
        isRequired={false}
        name="password"
        value={loginObj?.password || ""}
        warnText="Password is required"
        onChange={onChange}
        icon={
          <div
            className="icon-wrap icon-l form-icon right mt-three-s"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon /> : <EyeHiddenIcon />}
          </div>
        }
      />

      <input
        checked={loginObj?.role === 1}
        onChange={()=>setLoginObj({ ...loginObj, role: 1 })}
        type="radio"
        id="role1"
        name="role"
        value="1"
      />
      <label className="mr-two-s font-s font-bold" for="role1">
        Business Owner
      </label>

      <input
        checked={loginObj?.role === 2}
        onChange={()=>setLoginObj({ ...loginObj, role: 2 })}
        type="radio"
        id="role2"
        name="role"
        value="2"
      />
      <label className="mr-two-s font-s font-bold" for="role2">
        User
      </label>

      <input
        checked={loginObj?.role === 3}
        onChange={()=>setLoginObj({ ...loginObj, role: 3 })}
        type="radio"
        id="role3"
        name="role"
        value="3"
      />
      <label className="mr-two-s font-s font-bold" for="role3">
        Admin
      </label>

      <div className="wd-100 mt-one-s">
        <div className="btn btn-large mt-one-s btn-primary block-btn" onClick={onSubmit}>
          Sign Up
        </div>
      </div>
      <div className="wd-100 d-flex align-items-center justify-content-end mt-two-s">
        <div className="font-s pointer">
          <u
            onClick={() => {
              setRegister(false);
            }}
          >
            <div className="icon-wrap icon-s transformIcon90">
              <DownSortIcon />
            </div>
            <span className="mr-two-s">Back</span>
          </u>
        </div>
      </div>
    </form>
  );
};

export default Register;
