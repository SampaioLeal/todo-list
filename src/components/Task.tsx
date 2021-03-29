import { observer } from "mobx-react-lite";
import styled from "styled-components";
import useStore, { TodoTask } from "../store/TodoStore";
import BlackCheckbox from "./BlackCheckbox";
import { Gestures } from "react-gesture-handler";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  todo: TodoTask;
  onEditClick(): void;
  onDeleteClick(): void;
}

function Task(props: Props) {
  const store = useStore();
  const [rightOffset, setRightOffset] = useState(0);
  const speed = 5;
  const optionsWidth = 100;

  function handleToggle(
    _e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    store.toggleTodo(props.todo.id!, checked);
  }

  function handleGesture(event: any) {
    setRightOffset((prev) => {
      if (prev - event.velocity * speed <= 0) {
        return 0;
      } else if (prev - event.velocity * speed >= optionsWidth) {
        return optionsWidth;
      } else {
        return prev - event.velocity * speed;
      }
    });
  }

  return (
    <>
      <GestureContainer
        recognizers={{
          Pan: {
            events: {
              panleft: handleGesture,
              panright: handleGesture,
            },
          },
          // Tap: {
          //   events: {
          //     tap: props.onClick,
          //   },
          // },
        }}
      >
        <Container style={{ right: rightOffset }}>
          <Left>
            <BlackCheckbox
              checked={props.todo.feito}
              onClick={(e) => e.stopPropagation()}
              onChange={handleToggle}
            />
            <Title>{props.todo.titulo}</Title>
          </Left>
        </Container>
        <Options>
          <IconButton onClick={props.onEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={props.onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Options>
      </GestureContainer>
    </>
  );
}

export default observer(Task);

const Container = styled.div`
  position: relative;
  z-index: 1;
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

const Options = styled.div`
  position: relative;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 60px;
  background-color: #ececec;
  width: 100%;
  border-radius: 4px;

  right: 0;
  top: -84px;
`;

const GestureContainer = styled(Gestures)`
  position: absolute;
`;
