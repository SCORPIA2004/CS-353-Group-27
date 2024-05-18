import { Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(1.5px);
`;

const ModalWrapper = styled.div`
  background: linear-gradient(145deg, #6a3093, #a044ff);
  color: white;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 50px;
  cursor: pointer;
`;

const ContentArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 5px;
`;

const Subtitle = styled.h5`
  margin-bottom: 15px;
  font-weight: normal;
  font-size: 18px;
`;

const Details = styled.p`
  font-size: 21px;
  line-height: 1.5;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  width: 100%;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #3f51b5;
  color: white;
  font-size: 21px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #303f9f;
  }
`;

const Modal = ({ workoutDetails, onClose, updateWorkout, deleteWorkout }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(workoutDetails);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWorkout(formData.id, formData);
    setEditMode(false);
  };

  if (!workoutDetails) {
    console.error("workoutDetails is undefined");
    return null; // or handle this scenario appropriately
  }

  return (
    <Background>
      <ModalWrapper>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ContentArea>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Input
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
              />
              <Input
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              />
              <Input
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
              />
              <Flex gap="10px" justify="center">
                <Button type="submit">Save</Button>
                <Button type="button" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Flex>
            </form>
          ) : (
            <>
              <Title>{workoutDetails.title}</Title>
              <Subtitle>
                ⏰{workoutDetails.duration} mins, 💪{workoutDetails.difficulty}
              </Subtitle>
              <Details>{workoutDetails.description}</Details>
              <Flex gap="10px" justify="center">
                <Button onClick={() => setEditMode(true)}>✏️</Button>
                <Button onClick={() => deleteWorkout(workoutDetails.id)}>
                  🗑️
                </Button>
              </Flex>
            </>
          )}
        </ContentArea>
      </ModalWrapper>
    </Background>
  );
};

export default Modal;
