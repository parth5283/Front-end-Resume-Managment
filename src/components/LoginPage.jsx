import React, { useState } from 'react';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [validInputs, setValidInputs] = useState({});
  const [loginError, setLoginError] = useState(false);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    // Update the errors state
    setErrors(newErrors);

    // If there are no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      // Hardcoded username and password for temporary login
      const hardcodedUsername = 'admin';
      const hardcodedPassword = 'password';

      if (username === hardcodedUsername && password === hardcodedPassword) {
        handleLogin(username, password);
      } else {
        setLoginError(true);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Update the input value
    if (id === 'username') {
      setUsername(value);
    } else if (id === 'password') {
      setPassword(value);
    }

    // Validate the input value and update the validInputs state
    const newValidInputs = { ...validInputs };
    if (value.trim()) {
      newValidInputs[id] = true;
      // Remove error for the field if it becomes valid
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    } else {
      delete newValidInputs[id];
    }
    setValidInputs(newValidInputs);
  };

  return (
    <div className="container">
      <section className="emp_details_form LoginPage">
        <div className="form-heading-block">
          <h2 className="my-3 form-heading">HR Login</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleLoginFormSubmit} className="p-5 form_block">
            <div
              className={`form-group row my-5 d-flex align-items-center justify-content-center ${
                errors.username ? 'has-error' : ''
              } ${validInputs.username ? 'has-success' : ''}`}
            >
              <label htmlFor="username" className="col-md-4 col-form-label text-start">
                Username <i className="fas fa-user ml-2"></i>
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  id="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''} ${
                    validInputs.username ? 'is-valid' : ''
                  }`}
                  value={username}
                  placeholder="Enter Username"
                  onChange={handleInputChange}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>
            <div
              className={`form-group row my-5 d-flex align-items-center justify-content-center ${
                errors.password ? 'has-error' : ''
              } ${validInputs.password ? 'has-success' : ''}`}
            >
              <label htmlFor="password" className="col-md-4 col-form-label text-start">
                Password <i className="fas fa-lock ml-2"></i>
              </label>
              <div className="col-md-8">
                <input
                  type="password"
                  id="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''} ${
                    validInputs.password ? 'is-valid' : ''
                  }`}
                  value={password}
                  placeholder="Enter Password"
                  onChange={handleInputChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
            {loginError && (
              <div className="alert alert-danger">
                Username and password do not match. Please try again.
              </div>
            )}
            <div className="form-group row my-5 d-flex align-items-center justify-content-center text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;














// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginPage = ({ handleLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [validInputs, setValidInputs] = useState({});
//   const [loginError, setLoginError] = useState(false);

//   const handleLoginFormSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     const newErrors = {};

//     if (!username.trim()) {
//       newErrors.username = 'Username is required';
//     }

//     if (!password.trim()) {
//       newErrors.password = 'Password is required';
//     }

//     // Update the errors state
//     setErrors(newErrors);

//     // If there are no errors, proceed with login
//     if (Object.keys(newErrors).length === 0) {
//       try {
//         const response = await axios.get('http://localhost:8080/api/v1/employees/get-users', { username, password });
//         // Assuming the server response contains a success flag
//         if (response.data.success) {
//           handleLogin(username, password);
//         } else {
//           setLoginError(true);
//         }
//       } catch (error) {
//         console.log('Login error:', error);
//         setLoginError(true);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;

//     // Update the input value
//     if (id === 'username') {
//       setUsername(value);
//     } else if (id === 'password') {
//       setPassword(value);
//     }

//     // Validate the input value and update the validInputs state
//     const newValidInputs = { ...validInputs };
//     if (value.trim()) {
//       newValidInputs[id] = true;
//       // Remove error for the field if it becomes valid
//       const newErrors = { ...errors };
//       delete newErrors[id];
//       setErrors(newErrors);
//     } else {
//       delete newValidInputs[id];
//     }
//     setValidInputs(newValidInputs);
//   };

//   return (
//     <div className="container">
//       <section className="emp_details_form LoginPage">
//         <div className="form-heading-block">
//           <h2 className="my-3 form-heading">HR Login</h2>
//         </div>
//         <div className="form-container">
//           <form onSubmit={handleLoginFormSubmit} className="p-5 form_block">
//             <div
//               className={`form-group row my-5 d-flex align-items-center justify-content-center ${
//                 errors.username ? 'has-error' : ''
//               } ${validInputs.username ? 'has-success' : ''}`}
//             >
//               <label htmlFor="username" className="col-md-4 col-form-label text-start">
//                 Username <i className="fas fa-user ml-2"></i>
//               </label>
//               <div className="col-md-8">
//                 <input
//                   type="text"
//                   id="username"
//                   className={`form-control ${errors.username ? 'is-invalid' : ''} ${
//                     validInputs.username ? 'is-valid' : ''
//                   }`}
//                   value={username}
//                   placeholder="Enter Username"
//                   onChange={handleInputChange}
//                 />
//                 {errors.username && <div className="invalid-feedback">{errors.username}</div>}
//               </div>
//             </div>
//             <div
//               className={`form-group row my-5 d-flex align-items-center justify-content-center ${
//                 errors.password ? 'has-error' : ''
//               } ${validInputs.password ? 'has-success' : ''}`}
//             >
//               <label htmlFor="password" className="col-md-4 col-form-label text-start">
//                 Password <i className="fas fa-lock ml-2"></i>
//               </label>
//               <div className="col-md-8">
//                 <input
//                   type="password"
//                   id="password"
//                   className={`form-control ${errors.password ? 'is-invalid' : ''} ${
//                     validInputs.password ? 'is-valid' : ''
//                   }`}
//                   value={password}
//                   placeholder="Enter Password"
//                   onChange={handleInputChange}
//                 />
//                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//               </div>
//             </div>
//             {loginError && (
//               <div className="alert alert-danger">
//                 Username and password do not match. Please try again.
//               </div>
//             )}
//             <div className="form-group row my-5 d-flex align-items-center justify-content-center text-center">
//               <button type="submit" className="btn btn-primary">
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LoginPage;






