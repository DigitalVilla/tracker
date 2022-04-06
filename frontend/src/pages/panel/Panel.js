import { useRef, useEffect } from "react";
import { PageLayout } from "../../components";
import PropTypes from "prop-types";
import { Entry } from "../../components";
import { useAdminContext } from "../../context/admin-context";

export function Panel({ needsAuth }) {
  const [state, actions] = useAdminContext();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    actions.getInitialPage(isMounted);
    return () => (isMounted.current = false);
  }, []);

  return (
    <PageLayout needsAuth={needsAuth}>
      <h1>Admin Panel</h1>

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
              email={el.Email}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}

Panel.propTypes = {
  needsAuth: PropTypes.bool,
};

export default Panel;
