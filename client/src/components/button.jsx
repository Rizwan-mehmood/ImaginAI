import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: fit-content;

  padding: 10px 16px;
  border: none;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled || '#ccc'};
    color: ${({ theme }) => theme.disabledText || '#666'};
    cursor: not-allowed;
    transform: none;
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid black;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({ text, leftIcon, onClick, isLoading, isDisabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={isDisabled || isLoading}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {isLoading && <Spinner />}
        {leftIcon}
      </span>
      <span>{text}</span>
    </StyledButton>
  );
};

export default Button;
