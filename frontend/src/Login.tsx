import React, { useState } from "react";
import "./Login.css";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";

interface LoginProps {
  onLogin: any;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="ubuntu-login">
      <div className="login-box">
        <div className="avatar" />
        <div className="username">YOU</div>

        <div onSubmit={onLogin} className="login-form">
          <div className="password-wrapper">
            <input
              disabled={true}
              type={showPassword ? "text" : "password"}
              value={"whatIsMirai123"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} />
            </button>
            <button className="login-btn" onClick={onLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
