import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function TaskList({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  overflow-y: auto;
  padding-top: 20px;
  padding-bottom: 60px;
`;
