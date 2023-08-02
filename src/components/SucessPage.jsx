import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/SuccessPage.css'
import { CheckCircle, ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

const SuccessPage = () => {
  return (
    <div className="success-page-container">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="success-page-content text-center">
              <h1 className="success-title">
                <CheckCircle fontSize="large" className="success-icon" />
                Success!
              </h1>
              <p className="success-description">
                Employee record added successfully and saved to the database.
              </p>
              <div className="success-actions">
                
                <Button
                  variant="contained"
                  color="secondary"
                  className="back-button"
                  onClick={() => window.history.back()}
                  startIcon={<ArrowBack />}
                >
                  Go Back
                </Button>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                  className="success-button"
                  startIcon={<CheckCircle />}
                >
                  New Entry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
