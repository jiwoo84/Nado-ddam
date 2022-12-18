import React, { Children, useState, useEffect, useRef } from "react";
import styled from "styled-components";
// 아이콘 추가
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";

// const ModalContainer = styled.div`
//   position: fixed;
//   z-index: 60;
//   top: 50%;
//   left: 50%;
//   width: 50%;
//   height: 70%;
//   transform: translate(-50%, -50%);
//   background-color: #f9d762;
//   border: solid 1px;
//   padding: 3% 5%;
//   box-sizing: border-box;
//   overflow: hidden;
// `;

const DialogBox = styled.div``;

const FormContainer = styled.div``;

const CloseButton = styled.button`
  position: absolute;
  right: 3%;
  top: 5%;
  border: none;
  background-color: inherit;
  font-size: 1rem;
  cursor: pointer;
`;

function ModalContainer({ children, isOpen }) {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  return (
    <Modal isOpen={modalIsOpen}>
      <DialogBox>
        <CloseButton
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          <IoClose size={25} />
        </CloseButton>
        <FormContainer>{children}</FormContainer>
      </DialogBox>
    </Modal>
  );
}

export default ModalContainer;
