import styled from "@emotion/styled";

const BrandTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  user-select: none;
  margin-top: -2.5rem;
`;

const Sidebar = () => {
  return (
    <>
      <img
        className="helptap-logo"
        src="https://startupsopportunity.com/wp-content/uploads/2018/08/helptap_logo.png"
        alt="HelpTap logo"
      />
      <BrandTitle>HelpTap</BrandTitle>
    </>
  );
};

export default Sidebar;
