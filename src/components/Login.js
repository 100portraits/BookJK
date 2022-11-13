import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { auth, logout, signInWithGoogle } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Login() {

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user || !user) navigate("/");
    }, [user, loading]);
    return (
          <button className="btn" onClick={user ? logout : signInWithGoogle}>
            {user ? "Logout" : "Login"}
          </button>
    );
  }