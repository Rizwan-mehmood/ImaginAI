import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 14px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.text_secondary || '#333'};
`;

const InputBase = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #5e5e5e;
  font-size: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.inputText || '#aaa'};
  outline: none
`;

const TextArea = styled(InputBase).attrs({ as: 'textarea' })`
  min-height: ${({ rows }) => rows ? `${rows * 1.5}rem` : '120px'};
`;

const TextInput = ({ label, textarea, rows, handleChange, ...props }) => {
  return (
    <Wrapper>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      {textarea ? (
        <TextArea rows={rows} onChange={handleChange} {...props} />
      ) : (
        <InputBase onChange={handleChange} {...props} />
      )}
    </Wrapper>
  );
};

export default TextInput;
