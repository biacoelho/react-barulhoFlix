import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const FormFieldWrapper = styled.div`
  position: relative;
  textarea {
    min-height: 150px;
  }
  input[type="color"] {
    padding-left: 56px;
  }
`;

const Label = styled.label`

`;

Label.Text = styled.span`
  color: #E5E5E5;
  height: 57px;
  position: absolute; 
  top: 0;
  left: 16px;
  
  display: flex;
  align-items: center;
  
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  
  transition: .1s ease-in-out;
`;

const Input = styled.input`
  background: #53585D;
  color: #F5F5F5;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 1rem;

  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585D;


  padding: 16px 16px;
  margin-bottom: 45px;

  resize: none;
  border-radius: 4px;
  transition: border-color .3s;

  &:focus {
    border-bottom-color: var(--primary);
  }

  &:focus:not([type='color']) + ${Label.Text} {
    transform: scale(.6) translateY(-10px);
  }
  ${({ value }) => {
    const hasValue = value.length > 0;
    return hasValue && css`
        &:not([type='color']) + ${Label.Text} {
          transform: scale(.6) translateY(-10px);
        }
      `;
  }
} 
`;

function FormField({
  label, type, name, value, onChange, suggestions,
}) {
  const fieldID = `id_${name}`;
  const isTextarea = type === 'textarea';
  const tag = isTextarea ? 'textarea' : 'input';

  const hasValue = Boolean(value.length);
  const hasSuggestion = Boolean(suggestions.length);

  return (
    <FormFieldWrapper>
      <Label htmlFor={fieldID}>
        <Input
          as={tag}
          id={fieldID}
          type={type}
          name={name}
          hasValue={hasValue}
          value={value}
          onChange={onChange}
          autoComplete={hasSuggestion ? 'off' : 'on'}
          list={hasSuggestion ? `suggestionFor_${fieldID}` : undefined}
        />
        <Label.Text>
          {label}
          :
        </Label.Text>
        {
          hasSuggestion && (
            <datalist id={`suggestionFor_${fieldID}`}>
              {
              suggestions.map((suggestion) => <option key={`suggestionFor_${fieldID}_option${suggestion}`} value={suggestion}>{suggestion}</option>)
              }
            </datalist>
          )
        }

      </Label>
    </FormFieldWrapper>
  );
}

FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
  suggestions: [],
};

FormField.prototype = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default FormField;
