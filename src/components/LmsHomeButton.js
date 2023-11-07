import { useNavigate } from "react-router";
import styled from "styled-components";

const PrimaryLineButton = styled.button`
  border: 1px solid #5f7dcf;
  border-radius: 5px;
  background-color: white;
  padding: 2rem 1.4rem;
  color: #5f7dcf;
  width: 100%;
  font-size: 1.8rem;
  transition: all 300ms;
  font-weight: bold;
  height: 100%;
  &:nth-child(2){
    width: 50%
  }
  &:nth-child(3){
    width: 50%
  }
  &:nth-child(4){
    width: 50%
  }
  &:nth-child(5){
    width: 50%
  }
  &:hover{
    border: 0;
    background-color: #5f7dcf;
    color: white;
  }
`;

export function LmsHomeButton({buttonName, link}){

  const navigate = useNavigate();

  return<>
      <PrimaryLineButton onClick={()=>navigate(`${link}`)}><p>{buttonName}</p></PrimaryLineButton>
  </>
}