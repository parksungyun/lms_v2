import { useState } from "react";
import styled from "styled-components";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const PageSection = styled.div`
  margin: 2rem auto;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  border: 0;
  padding: 10px;
  border-radius: 5px;
`;

export function Pagination ({page, totalPosts, limit, setPage}){
  const numPages = Math.ceil(totalPosts/limit);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;
  console.log(numPages);

  return <>
    <PageSection>
        <ButtonWrap>
            <Button 
                onClick={() => {setPage(page-1); setCurrPage(page-2);}} 
                disabled={page==1}>
                <BsCaretLeftFill />
            </Button>
            <Button 
                onClick={() => setPage(firstNum)}
                aria-current={page === firstNum ? "page" : null}><p>
                {firstNum}</p>
            </Button>
            {Array(4).fill().map((_, i) =>{
                if(i <=2){
                    return (
                        <Button
                            border="true" 
                            key={i+1} 
                            onClick={() => {setPage(firstNum+1+i)}}
                            aria-current={page === firstNum+1+i ? "page" : null}
                            disabled={firstNum+1+i > numPages}><p>
                            {firstNum+1+i}</p>
                        </Button>
                    )
                }
                else if(i>=3){
                    return (
                        <Button
                            border="true" 
                            key ={i+1}
                            onClick={() => setPage(lastNum)}
                            aria-current={page === lastNum ? "page" : null}
                            disabled={lastNum > numPages}><p>
                            {lastNum}</p>
                        </Button>
                    )  
                }
            })}
            <Button 
                onClick={() => {setPage(page+1); setCurrPage(page);}} 
                disabled={lastNum >= numPages}>
                <BsCaretRightFill />
            </Button>
        </ButtonWrap>
    </PageSection>
  </>
}