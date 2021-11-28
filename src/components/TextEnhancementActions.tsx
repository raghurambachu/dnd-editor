import styled from "@emotion/styled";
import { FaBold, FaUnderline } from "react-icons/fa";
import { IoCopySharp } from "react-icons/io5";
import TextEnhancementAction from "./TextEnhancementAction";

const TextEnhancementActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
`;

const TextEnhancementActions = () => {
  // can also be stored in an object with properties command and icon and mapped over array of this object.
  return (
    <TextEnhancementActionsWrapper>
      <TextEnhancementAction command="bold" icon={<FaBold />} />
      <TextEnhancementAction command="underline" icon={<FaUnderline />} />
      <TextEnhancementAction command="copy" icon={<IoCopySharp />} />
    </TextEnhancementActionsWrapper>
  );
};

export default TextEnhancementActions;
