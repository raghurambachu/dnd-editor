import styled from "@emotion/styled";

interface ITextEnhancementAction {
  command: string;
  icon: React.ReactNode;
  args?: string;
}

const TextEnhancementActionButton = styled.button`
  padding: 0.75rem;
  margin: 0 0.25rem;
  background: #eee;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #ddd;
  }
`;

const TextEnhancementAction = ({
  command,
  icon,
  args,
}: ITextEnhancementAction) => {
  return (
    <TextEnhancementActionButton
      onMouseDown={(e) => {
        e.preventDefault();
        document.execCommand(command, false, args);
      }}
    >
      {icon}
    </TextEnhancementActionButton>
  );
};

export default TextEnhancementAction;
