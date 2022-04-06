import types from "./types";
import jwt_decode from "jwt-decode";
import { isExpired, fetchApi } from "../../utils";
import React from "react";

const env = process.env.REACT_APP_REACT_ENV;
const authApi = process.env.REACT_APP_API;
const minAuth = Number(process.env.REACT_APP_MIN_AUTH_LEVEL);

const actions = (dispatch, state) => {
  const signout = () => {
    localStorage.clear();
    dispatch({
      type: types.SET_AUTH_STATUS,
      payload: {
        authStatus: "expired",
        authorized: false,
        expiration: 0,
      },
    });
  };

  const loginUser = (expiration, authorized) => {
    dispatch({
      type: types.SET_AUTH_STATUS,
      payload: {
        authStatus: "auth",
        expiration,
        authorized,
      },
    });
  };

  return {
    signout: () => signout(),
    validateSession: () => {
      if (isExpired(state.expiration)) signout();
    },
    signin: async ({ email, password }) => {
      const session = { exp: 0, token: "" };

      const api = `${authApi}/users/login`;
      const data = await fetchApi({ api, body: { email, password } });
      if (data.error) throw new Error(data.error);

      // Decode token
      const decoded = jwt_decode(data.token);
      session.token = data.token;
      session.exp = decoded.exp;

      // log token
      localStorage.setItem("session", JSON.stringify(session));

      loginUser(session.exp, decoded.role >= minAuth);
    },
    signup: async ({ email, password, username, age }) => {
      try {
        const api = `${authApi}/users/signup`;
        const data = await fetchApi({
          api,
          body: { email, password, username, age },
        });
        if (data.error) throw new Error(data.error);
      } catch (error) {
        env !== "prod" && console.warn(error.message);
      }
    },
    restoreSession: async () => {
      try {
        const local = JSON.parse(localStorage.getItem("session") || "{}");
        if (!local.exp) throw new Error("Missing auth token");

        // Decode token
        const decoded = jwt_decode(local.token);

        // Validate expiration
        const hasExpired = isExpired(decoded.exp);
        if (hasExpired) throw new Error("Session has expired");

        loginUser(decoded.exp, decoded.role >= minAuth);
        return true;
      } catch (error) {
        env !== "prod" && console.warn(error.message);
        signout();
        return false;
      }
    },
  };
};

export default actions;

export const getSession = () => {
  const local = JSON.parse(localStorage.getItem("session") || "{}");
  const decoded = jwt_decode(local.token);
  return decoded;
};
