import styled from "styled-components"

const CommentBox = styled.div`
  margin-top: 2rem;
  border: 1px solid #ddd;
  border-radius: 7px;
`;

const CommentWriter = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const Comment = styled.div`
  height: 100px;
  vertical-align: top;
  padding: 10px;
  overflow-y: scroll;
`;

const Text = styled.p`
  font-size: 1.1rem;
`;

export function ReplyPost({ question, academic }) {

  return <>
    {
      (academic) &&
      <CommentBox>
        <CommentWriter>
          <Text>{academic.user.userName} | {new Date(question.answer.answerRegDate).toLocaleDateString("fr-CA")}</Text>
        </CommentWriter>
        <Comment>
          <Text>{question.answer.answerContent}</Text>
        </Comment>
      </CommentBox>
    }
  </>
}