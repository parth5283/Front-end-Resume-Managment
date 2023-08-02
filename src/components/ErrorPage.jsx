import React from 'react';
import { Button } from '@mui/material';
import { Replay, ArrowBack } from '@mui/icons-material';
import '../CSS/ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="error-page-content">
              <h1 className="error-title">Oops! Something went wrong.</h1>
              <p className="error-description">
                There was an error while submitting the data. Please try again later or contact
                support for assistance.
              </p>
              <div className="error-actions">
                <Button variant="contained" color="secondary" onClick={() => window.history.back()}>
                  <ArrowBack sx={{ marginRight: '8px' }} /> Go Back
                </Button>
                <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                  <Replay  sx={{ marginRight: '8px' }} /> Retry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
