import { useState } from 'react';

// This is a custom hook that we can use to manage the state of an input field.
const useInput = validateValue => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = e => {
        setEnteredValue(e.target.value);
    };

    // set touched to true when the input field is blurred
    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    // function to reset the input field
    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    // return an object with the state values and the functions to interact with them
    return {
        value: enteredValue,
        isValid: valueIsValid,
        isTouched,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
