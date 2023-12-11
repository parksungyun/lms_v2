import styled from "styled-components";
import { BsTelephoneFill } from "react-icons/bs";
import { trainerPosition, managerPosition } from "../assets/TempData";
import { useEffect } from "react";
import { useState } from "react";
import { getUserByUid } from "../pages/Api";

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
  const [member, setMember] = useState(null);

  useEffect(() => {
    if(!member) {
      const promise = getUserByUid(id);
      const getData = () => {
        promise.then((data) => {
          setMember(data);
        });
      };
      getData();
    }
  });

  console.log(member);

  // courses.coursePhoto.substring(courses.coursePhoto.lastIndexOf("\\") + 1)
  return <>
    {
      member &&  
      <Card>
        <Img src={"/upload/" + `${member.academic.userPhoto.substring(member.academic.userPhoto.lastIndexOf("\\") + 1)}`} alt={member.user.userName} />
        <Content>
          <Name>{member.user.userName}</Name>
          <Position>{member.position}</Position>
          <Remark>{member.remark}</Remark>
          <Call><BsTelephoneFill className="callIcon" />{member.user.userPhone}</Call>
        </Content>
      </Card>
    }
  </>
}