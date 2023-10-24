import img from "../assets/img/trainers/t2.jpg"
import styled from "styled-components";
import { BsTelephoneFill } from "react-icons/bs";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #eef0ef;
  border-radius: 10px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Name = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0px;
`;

const Position = styled.p`
  font-size: 1rem;
  font-style: italic;
  font-weight: 200;
  margin-bottom: 5px;
`;

const Remark = styled.p`
  margin-top: 0px;
  padding: 1.1rem;
  height: 8rem;
  text-align: center;
  font-style: italic;
  font-size: 1rem;
  color: #bbb;
`;

const Call = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  .callIcon {
    margin-right: 3px;
  }
`;

export function MemberCard({key}) {
  return <>
    <Card>
      <Img src={img} alt="key" />
      <Content>
        <Name>최서희</Name>
        <Position>Web Development</Position>
        <Remark>최대한 즐겁게 공부하고 최대한 빨리 취업할 수 있도록 최선을 다해 강의하겠습니다.</Remark>
        <Call><BsTelephoneFill className="callIcon" />042-222-1234</Call>
      </Content>
    </Card>
  </>
}