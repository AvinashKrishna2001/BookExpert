// Validates employee form fields
 
export const validateEmployee = (employee) => {
  const errors = {};

  if (!employee.fullName?.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!employee.gender) {
    errors.gender = "Gender is required";
  }

  if (!employee.dob) {
    errors.dob = "Date of birth is required";
  }

  if (!employee.state) {
    errors.state = "State is required";
  }

  return errors;
};
