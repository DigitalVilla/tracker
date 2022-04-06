import { useEffect, useRef } from "react";
import { PageLayout } from "../../components";
import PropTypes from "prop-types";
import { Entry } from "../../components";
import { useAppContext } from "../../context/app-context";

export function Home({ needsAuth }) {
  const [state, actions] = useAppContext();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    actions.getInitialPage(isMounted);
    return () => (isMounted.current = false);
  }, []);

  return (
    <PageLayout needsAuth={needsAuth} isLoading={state.status === "loading"}>
      <h1>Welcome {state.username}!</h1>

      <div>
        {state.entries.map((el) => {
          return (
            <Entry
              key={el.Id}
              id={el.Id}
              name={el.Name}
              date={el.Date}
              cals={el.Cals}
              price={el.Price}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}

Home.propTypes = {
  needsAuth: PropTypes.bool,
};

export default Home;
