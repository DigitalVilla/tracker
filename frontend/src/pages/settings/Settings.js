import { PageLayout } from "../../components";
import PropTypes from "prop-types";

export function Settings({ needsAuth }) {
  return <PageLayout needsAuth={needsAuth}> Settings</PageLayout>;
}

Settings.propTypes = {
  needsAuth: PropTypes.bool,
};

export default Settings;
