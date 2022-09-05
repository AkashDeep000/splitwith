const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length > 50) {
    errors.title = "Must be less than 50 character";
  }
  if (!values.amount) {
    errors.amount = "Required";
  }

  return errors;
};

export default validate;
