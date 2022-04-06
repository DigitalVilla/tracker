import { useEffect, useState } from "react";
import NavLink from "../nav-link/NavLink";
import { page } from "../../appTypes";
import { useAuthContext } from "../../context/auth-context";

import styles from "./Navigation.module.scss";

export function Navigation() {
  const [state, actions] = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e) => {
    const el = e.target.closest("button");
    if (el) closeMenu();
  };

  return state.authStatus === "auth" ? (
    <header className={styles.navigation}>
      <nav className={styles.linksContainer}>
        <ul className={styles.menu}>
          <NavLink
            icon="about"
            style={styles.link}
            active={styles.linkActive}
            path={page.HOME}
            label="Home"
          />
          <NavLink
            icon="racing"
            style={styles.link}
            active={styles.linkActive}
            path={page.VIEW}
            label="View"
          />
          {state.authorized && (
            <NavLink
              icon="roadmap"
              style={styles.link}
              active={styles.linkActive}
              path={page.PANEL}
              label="Panel"
            />
          )}
          <NavLink
            icon="cup"
            style={styles.link}
            active={styles.linkActive}
            path={page.SETTINGS}
            label="Settings"
          />
          <NavLink
            onClick={closeMenu}
            style={styles.button}
            active={styles.buttonActive}
            path={page.SIGNOUT}
            label="Signout"
          />
          <button
            className={`${styles.mobileButton} ${
              isOpen ? styles.mobileButtonOpen : ""
            }`}
            onClick={toggleMenu}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </ul>
        <ul
          className={`${styles.mobileMenu}
        ${isOpen ? styles.mobileMenuOpen : ""}`}
          onClick={handleNavClick}
        >
          <NavLink
            icon="about"
            style={styles.link}
            active={styles.linkActive}
            path={page.HOME}
            label="Home"
          />
          <NavLink
            icon="racing"
            style={styles.link}
            active={styles.linkActive}
            path={page.VIEW}
            label="View"
          />
          {state.authorized && (
            <NavLink
              icon="roadmap"
              style={styles.link}
              active={styles.linkActive}
              path={page.PANEL}
              label="Panel"
            />
          )}
          <NavLink
            icon="cup"
            style={styles.link}
            active={styles.linkActive}
            path={page.SETTINGS}
            label="Settings"
          />
        </ul>
      </nav>
    </header>
  ) : null;
}

export default Navigation;
