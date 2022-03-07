import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  background: ${props => props.status ? "#c3fdff" : ""};
  border-radius: 4px;
  border: 1px solid ${props => props.status ? "black" : "#cbcbcb"};
  font-style: ${props => props.status ? "normal" : "italic"};
  padding: 0.5em;
  :hover{
    background: #c3fdff;
    cursor: pointer;
    border: 1px solid black;
  }
`;

const BODY_MAX_LENGTH = 40;

export default function Note({ note, onSelect }) {
  return (
    <StyledDiv className="mt-2" onClick={() => { onSelect(note) }} status={note.selected}>
      <h5>{note.title}</h5>
      <p>{note.content.substring(0, BODY_MAX_LENGTH)}{note.content.length > BODY_MAX_LENGTH ? "..." : ""}</p>
      <div className='font-italic font-weight-light d-flex justify-content-between' style={{ fontSize: "0.85rem" }}>
        {new Date(note.timeUpdated).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
      </div>
    </StyledDiv>
  )
}