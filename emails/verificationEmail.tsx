import React from 'react';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <title>Verification Code</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Roboto', sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }

            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 24px;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 400px;
              width: 100%;
            }

            h1 {
              color: #333333;
              font-size: 24px;
              margin-bottom: 16px;
            }

            p {
              color: #666666;
              font-size: 16px;
              margin-bottom: 8px;
            }

            .code {
              font-size: 32px;
              font-weight: bold;
              color: #007bff;
              margin-bottom: 24px;
            }

            .note {
              font-size: 14px;
              color: #999999;
              margin-top: 16px;
            }

            a {
              color: #007bff;
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1>Verification Code</h1>
          <p>Here's your verification code:</p>
          <p className="code">{otp}</p>
          <h2>Hello {username},</h2>
          <p>
            Thank you for registering. Please use the following verification code to complete
            your registration:
          </p>
          <p className="code">{otp}</p>
          <p>If you did not request this code, please ignore this email.</p>
          {/* Uncomment this section if you want to include a verification link */}
          <div>
            <a
              href={`https://www.starbionet.com/verify/${username}`}
            >
              <span>Verify here</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
