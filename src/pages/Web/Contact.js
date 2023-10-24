import styled from "styled-components"
import { Container, Col, Row } from "react-bootstrap";
import WebWrapper from "../../components/WebWrapper"
import { BsGeoAltFill, BsTelephoneFill } from "react-icons/bs";

const Content = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 20px;
  gap: 1rem;
  margin: 1rem;
  width: 600px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Map = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

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
  &:hover {
    background-color: #5f7dcf;
    .contactIcon {
      color: white;
    }
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 3px;
  padding-top: 1px;
`;

const SubText = styled.p`
  font-size: 1.1rem;
`;

export function Contact() {
  return <>
    <WebWrapper pageName={"오시는 길"} />
      <Col>
        <Map>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d568.217813915621!2d127.42273219233948!3d36.32866378451815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565490969c2ddb1%3A0x541ea4d67b42a4c2!2zRFfslYTsubTrjbDrr7jtlZnsm5A!5e0!3m2!1sko!2skr!4v1698126513688!5m2!1sko!2skr" width="100%" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </Map>
          <ContentWrapper>
            <Content>
              <Icon><BsGeoAltFill className="contactIcon" /></Icon>
              <TextWrapper>
                <Text>Location:</Text>
                <SubText>(34838)대전광역시 중구 중앙로121번길 20 (선화동 41) 5층</SubText>
              </TextWrapper>
            </Content>
            <Content>
              <Icon><BsTelephoneFill className="contactIcon" /></Icon>
              <TextWrapper>
                <Text>Call:</Text>
                <SubText>042-222-2402</SubText>
              </TextWrapper>
            </Content>
          </ContentWrapper>
      </Col>
  </>
}