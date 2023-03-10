import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Moment from 'moment';
import styled, {css} from 'styled-components';
import { showModal, closeModal } from '../store/ModalSlice';
import ModalContainer from './Modal';
import Location from './Location';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import {SkeletonList} from "./Skeleton";
import apple from '../assets/apple.png';
import {
  StyledConfirmModal, 
  ConfirmButton, 
  StyledImageWrap, 
  StyledTitle, 
  StyledSubTitle,
  StatusButton,
  StatusSelect,
  SubmitButton,
  DeleteButton,
} from '../styles/Styled';


const StyledTitleWrap = styled.div`
  display:flex;
  align-items:center
`
const StyledContent = styled.div`
  width:70%;

  > p {
    margin-bottom: 0;
    color: #777;
  }

  > p > span {
    font-weight: bold;
    color: #000;
  }
`

const StyledNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
`

const StyledList = styled.div`
  border: 1px solid lightgray;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3%;
  box-sizing: border-box;
  margin-bottom: 2%;

  ${props => props.small && css`
    width: 97%;
 `}
`

const StyledListInner = styled.div`
  display:flex;
  align-items: center;
    
`
const StyledStatusLabel = styled.span`
  border: none;
  background: #83d644;
  border-radius: 5px;
  padding: 0 0.2rem;
  color: #fff;
  margin: 0 0 0.5rem 0.5rem;
  font-size: 0.8rem;

  ${props => props.marginTop && css`
   margin: 0.5rem 0 0 0;
  `}
`
const StyledButtonWrap = styled.div`
 display: flex;
 flex-direction: column;

 button + button {
  margin: 0.2rem 0 0 0;
 }
`
const StyledSelectWrap = styled.div`
 display: flex;
 flex-direction:column;
 margin-top: 3rem;

 >label {
  margin-bottom: 0.5rem;
 }
`
const StyledRefundEl = styled.h3`
 text-align: center;
 margin-top: 3rem;

 > span {
  color: red;
 }
`
const StyledCancleButtonWrap = styled.div`
 display: flex;
 justify-content: center;
 
 ${props => props.marginTop && css`
  margin-top: 3rem;
 `}

 button + button {
  margin-left: 0.2rem 0 0 0;
 }
`
const StyledPayWrap = styled.div`
 display: flex;
 justify-content: space-between;

 > p + p {
  font-weight: bold;
 }
`
const StyledNotData = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 20px;
margin-top: 50px;

img {
  height: 50px;
  margin-bottom: 20px;
}
`

const ButtonWrap = styled.div`
   text-align: center;
`

const initialState = {
  cancleModal: false,
  confirmModal: false,
  detailModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CANCLE':
      return {
        ...state,
        cancleModal: true,
        detailModal: false,
      };
    case 'CONFIRM':
      return {
        ...state,
       confirmModal: true,
      };
    case 'DETAIL':
      return {
        ...state,
        detailModal: true,
        cancleModal:false,
      };
    case 'CLOSE': 
     return {
      cancleModal: false,
      confirmModal: false,
      detailModal: false,
      reviewModal: false,
     }
    default: return state;
  }
}

const MyReservationTable = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataIndex, setDataIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(reducer, initialState);
  const modalDispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);

  const [statusOption , setStatusOption] = useState('??????');
  const [dateOption , setDateOption] = useState('?????? 3??????');
  const statusList = ["??????", "????????????", "????????????", "????????????", "????????????"];

  const getReservationData = async () => {
    const token = getToken();
    const res = await userApi.get(`/api/reserve`, {
      headers: {
        authorization: token,
      },
    });
    const result = res.data.sort((a, b) => {
      let aTime = a.info.date;
      let bTime = b.info.date;
      if (aTime > bTime) return -1;
      if (aTime === bTime) return 0;
      if (aTime < bTime) return 1;
    });
    setOriginalData(result);
    setFilteredData(result);
    setLoading(false);
  };

  useEffect(() => {
    getReservationData();
  },[]);

  const  filterData= () => {
    let filteredData = [...originalData];
    const today =  Moment().format('YYYY-MM-DD');

    if(statusOption !== "??????" ){
      filteredData = filteredData.filter(item => item.reserve.status === statusOption);
    }

    if(dateOption === 'threeMonthAgo'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('3', 'months').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }else if(dateOption === 'sixMonthAgo'){
      filteredData = filteredData.filter(item =>
        (Moment().subtract('6', 'months').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }else if(dateOption === 'oneYearAgo'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('1', 'years').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }
    setFilteredData(filteredData);
  };

  useEffect(()=> {
    filterData();
  },[statusOption, dateOption]);

  const ShowDefault = () => {
    return <>
        <StyledTitle>????????????</StyledTitle>
        <StyledNavWrapper>
        <div>
          {statusList.map((state) => (
            <StatusButton 
              key={state} 
              onClick={()=>
              setStatusOption(state)}
              clicked = {statusOption === state ? true : false}
              >
              {state}
            </StatusButton>
          ))}
        </div>
        <StatusSelect
          value={dateOption} 
          onChange={(e) => setDateOption(e.target.value)}>
					<option value="threeMonthAgo">?????? 3??????</option>
					<option value="sixMonthAgo">?????? 6??????</option>
					<option value="oneYearAgo">?????? 1???</option>
				</StatusSelect>
      </StyledNavWrapper>
    </>
  };

  const ShowResrvation = () => {
    return (<>
      {filteredData.map((reservation , index) => { 
        const {info, reserve} = reservation || {};
        const start_time = info.start_time.slice(0,5);
        const end_time = info.end_time.slice(0,5);
        const title_img = (info.url).split(',')[0];
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                <img src={title_img} alt="????????????"/>
              </StyledImageWrap>
              <StyledContent>
                <StyledTitleWrap>
                  <StyledSubTitle
                    style={{
                      textDecoration 
                      : reserve.status === '????????????' 
                      ? 'line-through' 
                      : 'none'}}>
                      {info.name}
                  </StyledSubTitle>
                  <StyledStatusLabel>
                    {reserve.status}
                  </StyledStatusLabel>
                </StyledTitleWrap>
                <p>?????? ?????? <span>{info.date}</span></p>
                <p>?????? ?????? <span>{start_time} -  {end_time}</span></p>
                <p>?????? <span>{reserve.personnel}</span>???</p>
                <p>???????????? <span>{(reserve.total_price).toLocaleString()}</span>???</p>
              </StyledContent>
            </StyledListInner>
            <StyledButtonWrap>
              <ConfirmButton
                name={index} 
                onClick={(e)=> {
                setDataIndex(e.target.name);
                modalDispatch(showModal());
                dispatch({type: 'DETAIL'})
                }}>
                ?????????
              </ConfirmButton>
              {(reserve.status === '????????????' && !reserve.review) &&
                <ConfirmButton>
                  <Link to={`/mypage/writereview/${reserve.id}`}>
                    ????????????
                  </Link>
                </ConfirmButton>
              }
              {(reserve.status === '????????????' || reserve.status === '????????????') && 
                <DeleteButton 
                  name={index}
                  onClick={(e)=> {
                    setDataIndex(e.target.name);
                    modalDispatch(showModal());
                    dispatch({type: 'CANCLE'})
                  }}
                >
                  ????????????
               </DeleteButton>
              }
            </StyledButtonWrap>
          </StyledList>
          )
        })}
      </>  
    );
  };

  const DetailReservation = () => {
    const filterDataArr = [filteredData[dataIndex]];
    
    return (
      <>
        {filterDataArr.map(reservation => {
          const {info, reserve} = reservation || {};
          const start_time = info.start_time.slice(0,5);
          const end_time = info.end_time.slice(0,5);
          const title_img = (info.url).split(',')[0];
          return (
            <div key={`${dataIndex}`-`${info.id}`}>
              <StyledList small>
                <StyledTitleWrap>
                  <StyledImageWrap modalImg>
                    <img src={title_img} alt="????????????"/>
                  </StyledImageWrap>
                    <div>
                      <h3 style={{
                      textDecoration : reserve.status === '????????????' 
                      ? 'line-through' 
                      : 'none'}}>{info.name}</h3>
                      <StyledStatusLabel marginTop>
                        {reserve.status}
                      </StyledStatusLabel>
                    </div>
                </StyledTitleWrap>
              </StyledList>
                  <StyledSubTitle marginTop>????????????</StyledSubTitle>
                  <hr />
                    <StyledContent>
                      <p>?????? ?????? <span>{info.date}</span></p>
                      <p>?????? ?????? <span>{start_time} - {end_time}</span></p>
                      <p>?????? ?????? <span>{reserve.personnel}???</span></p>
                    </StyledContent>
                    <br />
                    {info.address !== null && <Location location={info.address}/>}
                    <hr />
                    <StyledPayWrap>
                      <p>????????????</p>
                      <p>{reserve.payment === 'card' && '????????????'}</p>
                    </StyledPayWrap>
                    <StyledPayWrap>
                      <p>???????????? </p>
                      <p>{reserve.total_price.toLocaleString()}???</p>
                    </StyledPayWrap>
                {(reserve.status === "????????????" || reserve.status === "????????????") && 
                <ButtonWrap>
                  <SubmitButton 
                    onClick={() => {
                      modalDispatch(showModal());
                      dispatch({type: 'CANCLE'})
                    }}> 
                      ????????????
                  </SubmitButton>
                </ButtonWrap>
                }
            </div>)
        })}
      </>
    )
  }

  const cancleResevationHandler = async(e) => {
    const id = e.target.name;
    try {
      await userApi.patch(`/api/reserve/${id}`, {
        status: '????????????',
      }); 
      alert('????????? ?????????????????????.')
      modalDispatch(closeModal());
      getReservationData();
    } catch (err) {
      console.log(err.response.data.Error)
    }
  }

  const CancleReservationPage = () => {
    const filterDataArr = [filteredData[dataIndex]];

    return (
      <>
      {filterDataArr.map(reservation => {
        const {info, reserve} = reservation || {};
        const start_time = info.start_time.slice(0,5);
        const end_time = info.end_time.slice(0,5);
        const title_img = (info.url).split(',')[0];
        return (
         <div key={`${dataIndex}-${info.id}`}>
          <StyledListInner>
              <StyledImageWrap>
                <img src={title_img} alt="????????????" />
              </StyledImageWrap>
            <StyledContent>
                <h4>{info.name}</h4>
                <p>{info.date} | {start_time}-{end_time}</p>
                <p>?????? {reserve.personnel}???</p>
                <p>???????????? {reserve.total_price.toLocaleString()}???</p>
            </StyledContent>
          </StyledListInner>
          <StyledSelectWrap>
            <label>?????? ????????? ????????? ?????????.</label>
            <StatusSelect>
              <option>?????? ??? ?????? ???????????? ??????</option>
              <option>????????? ????????? ?????? ??????</option>
              <option>?????? ???????????? ???????????? ??????</option>
            </StatusSelect>
          </StyledSelectWrap>
          <hr />
          <StyledRefundEl>
            ??????????????????: 
            <span>{reserve.total_price.toLocaleString()}???</span>
          </StyledRefundEl>
          <StyledCancleButtonWrap>
            <SubmitButton 
              onClick={() => {
                dispatch({type: 'DETAIL'})
              }}
                reject
              >
                ??????
            </SubmitButton>
            <SubmitButton onClick={() => {
              dispatch({type: 'CONFIRM'})
            }}>
              ????????????
            </SubmitButton>
          </StyledCancleButtonWrap>
          {state.confirmModal && modalOpen && 
            <ModalContainer w="320px" h="170px">
              <StyledConfirmModal>
                <p>????????? ?????????????????????????</p>
                <StyledCancleButtonWrap marginTop>
                  <DeleteButton 
                  name={reserve.id}
                  onClick={(e) => 
                  cancleResevationHandler(e)}>
                    ??????
                  </DeleteButton>
                  <ConfirmButton 
                  onClick={() => {
                    dispatch({type: 'CLOSE'})
                    modalDispatch(closeModal())
                  }}
                  reject
                  >
                    ??????
                  </ConfirmButton>
                </StyledCancleButtonWrap>
              </StyledConfirmModal>
          </ModalContainer>}
        </div>
      )}
    )} 
    </>   
    )
  }

  return (
    <>
     <ShowDefault/>
    {loading 
    ? <>
      <SkeletonList />
      <SkeletonList />
      <SkeletonList />
      <SkeletonList />
      </> 
    : filteredData.length > 0 
    ? <>
    <ShowResrvation /> 
    {state.detailModal && modalOpen && 
        <ModalContainer w="500px" h="510px">
          <DetailReservation />
        </ModalContainer>
    }
    {state.cancleModal && modalOpen && 
      <ModalContainer w="500px" h="510px">
        <CancleReservationPage/>
      </ModalContainer>
    }
    </>
    : <StyledNotData>
      <img src={apple} alt="" />
      <h4>???????????? ?????? ????????? ????????????.</h4>
     </StyledNotData>
    }
    </>
  )
}

export default MyReservationTable;