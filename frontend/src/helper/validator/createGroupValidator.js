const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 50) {
    errors.name = "Must be less than 50 character";
  }
  if (!values.category) {
    errors.category = "Please select a category";
  }

  return errors;
};

export default validate;
