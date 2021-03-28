import { Checkbox } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  titulo: string;
  onClick?(): void;
}

export default function Task(props: Props) {
  return (
    <Container onClick={props.onClick}>
      <Left>
        <Checkbox onClick={(e) => e.stopPropagation()} />
        <Title>{props.titulo}</Title>
      </Left>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  height: 60px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
  padding: 0 10px;

  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  cursor: ${(props) => (props.onClick ? "pointer" : "normal")};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: normal;
`;
