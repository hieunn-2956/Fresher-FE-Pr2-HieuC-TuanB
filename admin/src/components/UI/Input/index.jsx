import React from "react";
import { Form } from "react-bootstrap";

/**
 * @author
 * @function Input
 **/

export const Input = (props) => {
  let input = null;
  switch (props.type) {
    case "text":
      input = (
        <Form.Group>
          {props.label && <Form.Label>{props.label}</Form.Label>}

          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
        </Form.Group>
      );
      break;
    case "select":
      input = (
        <Form.Group>
          {props.label && <Form.Label>{props.label}</Form.Label>}

          <select
            className='form-control form-control-sm'
            value={props.value}
            onChange={props.onChange}
          >
            {props.options.length > 0
              ? props.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))
              : null}
          </select>
        </Form.Group>
      );
      break;
    default:
      input = (
        <Form.Group>
          {props.label && <Form.Label>{props.label}</Form.Label>}

          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
        </Form.Group>
      );
  }
  return input;
};

export default Input;
