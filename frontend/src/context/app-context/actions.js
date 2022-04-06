import types from "./types";
import { fetchApi } from "../../utils";
import { getSession } from "../auth-context/actions";

const rootAPI = process.env.REACT_APP_API;
const minAuth = Number(process.env.REACT_APP_MIN_AUTH_LEVEL);

const actions = (dispatch, state) => {
  const session = getSession();
  console.log("actions");

  return {
    setAppStatus: (status) => {
      dispatch({
        type: types.SET_APP_STATUS,
        payload: {
          status,
        },
      });
    },
    getInitialPage: async (isMounted) => {
      dispatch({
        type: types.SET_APP_STATUS,
        payload: { status: "loading" },
      });
      try {
        let api = `${rootAPI}/app/query`;

        // validate Admin role
        if (session.role >= minAuth) {
          api = `${api}?email=${session.email}`;
        }

        const data = await fetchApi({
          api,
          cacheId: "HOME",
          cacheMin: 10,
          body: {
            query: "initialLoad",
          },
        });
        if (data.error) throw new Error(data.error);

        isMounted.current &&
          dispatch({
            type: types.SET_INITIAL_STATE,
            payload: {
              entries: data.entries,
              maxCals: data.user.MaxCals,
              budget: data.user.Budget,
              username: data.user.Username,
              age: data.Age,
              status: "success",
            },
          });
      } catch (error) {
        isMounted.current &&
          dispatch({
            type: types.SET_APP_STATUS,
            payload: { error: error.message, status: "error" },
          });
      }
    },
    deleteEntry: () => {},
    createEntry: () => {},
    getEntriesByDate: () => {},
  };
};

export default actions;
