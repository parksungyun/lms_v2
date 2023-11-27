import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap";
import { BiWon, BiSolidBusiness } from "react-icons/bi";
import { BsFillMortarboardFill, BsChevronRight } from "react-icons/bs";
import { Course } from "../../components/Course";
import { courses } from "../../assets/TempData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getRecruitingCourses } from "../Api";

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #eef0ef;
  border-radius: 10px;
  padding: 3rem 0rem;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &#hero{
    width: 100%;
    height: 80vh;
    background: url(./main.jpg) center center;
    background-size: cover;
    position: relative;
    margin-bottom: 50px;
    &:before{
      content: "";
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
    }
  }
`;

const Button = styled.button`
  background-color: #7f97d9;
  padding: 10px 40px;
  border-radius: 50px;
  color: white;
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #7f97d9;
  }
`;

const H1 = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 15px 0px;
`

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: 700;
  margin: 15px 0px;
`

const H3 = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 15px 0px;
`

const Icon = styled.div`
  background-color: #ecf5f9;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  .contactIcon {
    color: #5f7dcf;
    width: 20px;
    height: 20px;
  }
`;

export function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    if(!courses) {
      const promise = getRecruitingCourses();
      const getData = () => {
        promise.then((data) => {
          setCourses(data);
        });
      };
      getData();
    }
  });

  return <>
    <Section id="hero">
      <div className="container position-relative">
        <H1 className="mb-0" style={{color: "white", fontSize: "3rem"}}>지식정보화 시대<br /> IT 전문가 양성</H1>
        <H2 className="mt-3" style={{color: "white"}}>당신이 전문가로서 행복한 삶을 누리기를 바랍니다.</H2>
      </div>
    </Section>
    <Container>
      <Row>
        <Col className="col-4">
          <Col style={{height: "100%"}}>        
            <Content className="text-center" style={{backgroundColor: "#5f7dcf"}}>
              <H2 className="text-center mb-0" style={{color: "white"}}>GOOD CHOICE</H2>
              <H3 className="text-center" style={{color: "white"}}>Y&Y ACADEMY</H3>
              <Button onClick={() => navigate("/admission")}><p>입학 상담 <BsChevronRight className="mb-1"/></p></Button>
            </Content>
          </Col>
        </Col>
        <Col className="col-8">
          <Row>
            <Col>
              <Content>
                <Icon><BiSolidBusiness className="contactIcon"/></Icon>
                <H3 className="text-center">취업센터 운영</H3>
                <p className="text-center">알선을 통한 취업률 100% 도전<br/>수료 후 취업률 80% 이상<br /> 졸업생 취업특강</p>
              </Content>
            </Col>
            <Col>
              <Content>
                <Icon><BiWon className="contactIcon"/></Icon>
                <H3 className="text-center">수업비 무료지원</H3>
                <p className="text-center">매월 최대 약 61만원 지급 <br />교육비, 교재비 100% 국비지원<br /> 실업급여 수급자 구직활동 면제</p>
              </Content>
            </Col>
            <Col>
              <Content>
                <Icon><BsFillMortarboardFill className="contactIcon"/></Icon>
                <H3 className="text-center">포트폴리오 / 자격증</H3>
                <p className="text-center">포트폴리오 제작 지원<br />이력서/자소서 첨삭<br />관련 자격증 취득 지원</p>
              </Content>
            </Col>
          </Row>
        </Col>
      </Row>
      <H1 className="mt-5">모집중인 과정</H1>
      <Row>
        {
          courses && courses.map((c, i) => (
            <Col>
              <Course id={c.courseId} />
            </Col>
          ))
        }
      </Row>
    </Container>
  </>
}