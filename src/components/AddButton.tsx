import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";

interface Props {
  onClick(): void;
}

export default function AddButton(props: Props) {
  return (
    <FabButton onClick={props.onClick}>
      <AddIcon />
    </FabButton>
  );
}

const FabButton = styled(Fab)`
  background: black;

  svg {
    color: white;
  }

  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: black;
  }
`;
