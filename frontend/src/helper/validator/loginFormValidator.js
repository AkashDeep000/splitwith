const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  
  if (!values.password) {
    errors.password = "Required";
  } 
  /*else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/i.test(values.password)
  ) {
    errors.password =
      "Weak Password (need more than 8 charecter and mix of lowercase and uppercase letters, nunbers and special charecters)";
  }
  */
  return errors;
};

export default validate;
