import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const BrandTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  user-select: none;
  margin-top: -2.5rem;
`;

const SidebarInnerWrapper = styled.div`
  .links-container {
    margin-top: 3rem;
  }
  .link {
    display: block;
    font-size: 1.6rem;
    padding: 0.35rem 1.5rem;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #e8e8e8;
    }
  }
  .selected {
    background-color: #e8e7e3;
    font-weight: bold;
  }
`;

const Sidebar = () => {
  return (
    <SidebarInnerWrapper>
      <img
        className="helptap-logo"
        src="https://startupsopportunity.com/wp-content/uploads/2018/08/helptap_logo.png"
        alt="HelpTap logo"
      />
      <BrandTitle>HelpTap</BrandTitle>

      <div className="links-container">
        <NavLink
          className="link"
          activeClassName="selected"
          to="/getting-started"
        >
          Getting Started
        </NavLink>
        <NavLink className="link" activeClassName="selected" to="/about-me">
          About Me
        </NavLink>
      </div>
    </SidebarInnerWrapper>
  );
};

export default Sidebar;
