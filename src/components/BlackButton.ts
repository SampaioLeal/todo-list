import { Button } from "@material-ui/core";
import styled from "styled-components";

const BlackButton = styled(Button).attrs({ variant: "contained" })`
  background-color: black;
  color: white;

  &:hover {
    background-color: black;
  }
`;

export default BlackButton;
