import styled,{css} from "styled-components";

//memo 가영 : 로그인, 회원가입 등 큰 버튼
export const SubmitButton = styled.button`
    border: none;
    background: #83d644;
    border-radius: 10px;
    margin-top: 40px;
    padding: 2% 3%;
    color: #fff;
    font-weight: 700;

    ${props => props.reject && css`
    border:1px solid #b1b0ac;
    background: #b1b0ac3b;
    color:#b1b0ac;
`}

    +button {
        margin-left: 6px;
    }

`
//memo 가영 : 수정, 삭제 등 작은 버튼
//강조하고 싶지 않은 버튼에 props로 reject 전달
export const ConfirmButton = styled.button`
    border:1px solid #f4d815;
    border-radius: 10px;
    color: #d1b80d;
    font-weight: 500;
    background: rgba(244,216,21,0.18);

    ${props => props.reject && css`
        border:1px solid #b1b0ac;
        background: #dbdad43b;
        color:#d1b80d;
    `}

    +button {
        margin-left: 6px;
    }
    
`
//memo 가영 : 예약조회페이지 - 상태목록
//클릭된 버튼에 props로 clicked 전달
export const StatusButton = styled.button`
    border-radius: 5px;
    border:1px solid #b1b0ac;
    background: #dbdad43b;
    color:#d1b80d;

    ${props => props.clicked && css`
        border:1px solid #f4d815;
        background: #f4d815;
        color:#fff;
        font-weight: 500;
    `}

    +button {
        margin-left: 6px;
    }
`
//memo 가영 : 예약조회페이지 - 상태목록
//클릭된 버튼에 props로 clicked 전달
export const StatusSelect = styled.select`
    border-radius: 5px;
    border:1px solid #b1b0ac;
    background: #dbdad43b;
    color:#d1b80d;
    border-radius: 5px;
    padding: 0.2rem 0.4rem;

    select option:checked {
        background: #83d644;
    }
`
//memo 가영 : input
export const Input = styled.input`
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
    margin-top: 2%
`
//memo 가영 : 페이지 타이틀
export const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 2%;
  display: inline-block;
`
//memo 가영 : 소제목
export const StyledSubTitle = styled.h5`
    margin-bottom: 30px;
    font-weight: 600;
`
//memo 가영 : 콘텐츠 글자
export const StyledParagraph = styled.p`
    margin-bottom: 10px;
`
//memo 가영 : 예약조회, 후기조회 등 리스트의 이미지
export const StyledImageWrap = styled.div`
  width: 30%;
  height: 100%;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 20px;

  >img {
    width: 100%;
  }
`