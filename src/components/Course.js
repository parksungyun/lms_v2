import { Card } from "react-bootstrap";
import clas from '../assets/img/class/class1.png'
import { NavLink } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 20px;
`

const Box = styled.div`
  border-radius: 5px;
  border: 1px solid #eef0ef;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
`

const Content = styled.div`
  padding: 15px;
`

const PositionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const Position = styled.div`
  font-size: 14px;
  background: #5f7dcf;
  padding: 7px 14px;
  color: #fff;
  margin: 0;
`

const StyledNavLink = styled(NavLink)`
  font-weight: 700;
  font-size: 20px;
  color: #37423b;
  &:hover{
    color: #5f7dcf;
  }
`

const Capacity = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid #eef0ef;
  display: flex;
  justify-content: end;
  align-items: center;
`

export function Course() {
  return <>
    <Container>
      <Box>
        <Img src={clas} alt="..."/>
        <Content>
          <PositionWrapper>
            <Position>Design</Position>
          </PositionWrapper>
          <StyledNavLink to="">디지털콘텐츠 UI/UX 디자인</StyledNavLink>
          <Capacity>
            <BiUser />&nbsp;30
          </Capacity>
        </Content>
      </Box>
    </Container>
  </>
}