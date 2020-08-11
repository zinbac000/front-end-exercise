export const validate = (value, rules) => {
  let errors = [];
  if (!rules) {
    return errors;
  }

  if (rules.required && value.trim() === "") {
    errors.push("This field is required.");
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (rules.isEmail && !emailRegex.test(value)) {
    errors.push("Invalid email format.");
  }

  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Value should have minimum length ${rules.minLength}`);
  }

  return errors;
};
