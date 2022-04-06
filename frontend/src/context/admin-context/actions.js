import types from "./types";
import { fetchApi } from "../../utils";
import { getSession } from "../auth-context/actions";

const rootAPI = process.env.REACT_APP_API;
const minAuth = Number(process.env.REACT_APP_MIN_AUTH_LEVEL);

const actions = (dispatch, state) => {
  const session = getSession();

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
      if (session.role < minAuth) return;

      dispatch({
        type: types.SET_STATUS,
        payload: { status: "loading" },
      });
      try {
        const api = `${rootAPI}/app/query?email=${session.email}`;
        const data = await fetchApi({
          api,
          cacheId: "Entries",
          cacheMin: 5,
          body: {
            query: "allEntries",
          },
        });
        if (data.error) throw new Error(data.error);

        isMounted.current &&
          dispatch({
            type: types.SET_INITIAL_STATE,
            payload: {
              entries: data.entries,
              status: "success",
            },
          });
      } catch (error) {
        isMounted.current &&
          dispatch({
            type: types.SET_STATUS,
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
