import styled from 'styled-components'

export const CellWrapper = styled.div`
  background:${(props) => props.isRevealed ? "#FCFAF9" : "#333333"};
  border: 1px solid #48E5C2;
  border-radius: 4px;
  float:left;
  line-height:45px;
  height:45px;
  text-align:center;
  width:45px;
  cursor: pointer;
  color: ${(props) => props.isMine || props.isFlagged ? "#fc543c" : "#333333"};
  font-weight:600;
  &:focus{
    outline:none;
  }
`