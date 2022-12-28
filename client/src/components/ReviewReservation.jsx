import styled from 'styled-components';

const Container = styled.div`
 display: flex;
 justify-content: space-evenly;
`

const ReservationWrap = styled.div`
 display: flex;
 align-items: center;
`

const FarmImg = styled.div`
  width: 30%;
  margin-right: 1.5rem;
  > img {
    width: 100%;
    border-radius: 20px;
  }
`

const  ReviewReservation = ({reservationData}) => {
    return (
     <>
       {reservationData.map(item => {
         const {info, reserve} = item || {};
         const start_time = info.start_time.slice(0,5);
         const end_time = info.end_time.slice(0,5);
         return (
          <ReservationWrap key={info.id}>
           <FarmImg><img src={info.url} alt="농장이미지"/></FarmImg>
           <div>
            <h1>{info.name}</h1>
            <p>날짜: {info.date}</p>
            <p>체험시간: {start_time} - {end_time}</p>
            <p>인원: {reserve.personnel}명</p>
          </div>
           </ReservationWrap>
         )
       })}
     </>
    )
}

export {Container, ReviewReservation};