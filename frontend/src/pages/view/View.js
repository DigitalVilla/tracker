import { PageLayout } from "../../components";
import PropTypes from "prop-types";

export function View({ needsAuth }) {
  return <PageLayout needsAuth={needsAuth}> View</PageLayout>;
}

View.propTypes = {
  needsAuth: PropTypes.bool,
};

export default View;
