import styled from 'styled-components'

export const BoardWrapper = styled.div`
  max-width:400px;
  margin:0 auto;
  padding:20px;
  background:#00a883;
  margin-top:15vh;
`

export const GameInfo = styled.div`
  margin-bottom:20px;
  background:transparent;
  padding:7px;
  text-align:center;
  color:#fff;
  min-height:100px;
  border-radius:7px;
  h1, span{
    display:block;
    margin-top:15px;
  }
`

export const Clear = styled.div`
  clear: both;
  content:"";
`
