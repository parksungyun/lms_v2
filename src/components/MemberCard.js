import styled from "styled-components";
import { BsTelephoneFill } from "react-icons/bs";
import { academics, userList, trainerPosition, managerPosition } from "../assets/TempData";

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

export function MemberCard({id}) {
  const member = academics.find((a) => a.academic_id == id);
  const user = userList.find((u) => u.uid == member.uid);

  return <>
    <Card>
      <Img src={member.user_photo} alt={user.user_name} />
      <Content>
        <Name>{user.user_name}</Name>
        <Position>{
          member.dept == 0 ? (managerPosition.find(m => m.position_id == member.position)).position_name
          : (trainerPosition.find(t => t.position_id == member.position)).position_name
        }</Position>
        <Remark>{member.remark}</Remark>
        <Call><BsTelephoneFill className="callIcon" />{user.user_phone}</Call>
      </Content>
    </Card>
  </>
}