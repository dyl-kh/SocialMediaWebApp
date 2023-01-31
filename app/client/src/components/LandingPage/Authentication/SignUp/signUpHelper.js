export const validateFullName = fullNameInput => {
    // check if the full name only contains letters and spaces of unlimited length
    const fullNameRegex = /^[a-zA-Z ]+$/;
    if (fullNameRegex.test(fullNameInput)) {
        return true;
    }
    return false;
};

// function to validate email
export const validateEmail = emailInput => {
    const trimmedEmailInput = emailInput.trim();
    const atIndex = trimmedEmailInput.indexOf('@');
    const dotIndex = trimmedEmailInput.lastIndexOf('.');
    return (
        trimmedEmailInput.length > 0 &&
        atIndex > 0 &&
        dotIndex > atIndex + 1 &&
        dotIndex < trimmedEmailInput.length - 1 &&
        trimmedEmailInput[atIndex + 1] !== '.' &&
        !trimmedEmailInput.includes(' ') &&
        !trimmedEmailInput.includes('..') &&
        (trimmedEmailInput.match(/@/g) || []).length === 1
    );
};

// helper function to check validateEmail function is working
export const testValidateEmailFunction = () => {
    // assert these emails should pass validation
    console.assert(validateEmail('thomas@thomas.com'));
    console.assert(validateEmail('thomas@thomas.co.au'));
    console.assert(validateEmail('a@a.au'));
    console.assert(validateEmail('thomas.yao.j@google.co'));
    console.assert(validateEmail('thomas.yao.j@google.co.au.com'));
    console.assert(validateEmail('thOmaS@gOOgLe.com'));

    // assert these emails should fail validation
    console.assert(!validateEmail('thomas@.com'));
    console.assert(!validateEmail('thomas@gmail@.com'));
    console.assert(!validateEmail('thomas@aaa.com.'));
    console.assert(!validateEmail('thomas@thomas'));
    console.assert(!validateEmail('@thomas.com'));
    console.assert(!validateEmail('thomas@'));
    console.assert(!validateEmail('thomas'));
    console.assert(!validateEmail('thomas.'));
    console.assert(!validateEmail('thomas@gmail.'));
    console.assert(!validateEmail('thomas@thomas..com'));
    console.assert(!validateEmail('thomas@.thomas.com'));
    console.assert(!validateEmail('thomas@thomas..com'));
};

// No stripping of white space before and after - should be allowed https://security.stackexchange.com/questions/32691/why-not-allow-spaces-in-a-password
// check that the password is at least 12 characters long
// and contains at least one uppercase letter, one number and one special character
export const validatePassword = passwordInput => {
    let containsUppercase = false;
    for (let i = 0; i < passwordInput.length; i += 1) {
        const character = passwordInput.charAt(i);
        if (
            character === character.toUpperCase() &&
            character.match(/[a-z]/i)
        ) {
            containsUppercase = true;
        }
    }

    const containsNumbers = /\d/.test(passwordInput);

    const symbols = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    const containsSymbols = symbols.test(passwordInput);

    const sufficientLength = passwordInput.length >= 12;

    return (
        containsUppercase &&
        containsNumbers &&
        containsSymbols &&
        sufficientLength
    );
};
