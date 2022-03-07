import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actSelectNote } from '../../modules/actions';

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

export default function NoteRedux({ note }) {
  const dispatch = useDispatch();
  const handleOnSelect = () => {
    dispatch(actSelectNote(note));
  }

  return (
    <StyledDiv className="mt-2" status={note.selected} onClick={handleOnSelect}>
      <h5>{note.title}</h5>
      <p>{note.content.substring(0, BODY_MAX_LENGTH)}{note.content.length > BODY_MAX_LENGTH ? "..." : ""}</p>
      <div className='font-italic font-weight-light text-right' style={{ fontSize: "0.85rem" }}>
        {new Date(note.timeUpdated).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
      </div>
    </StyledDiv>
  )
}