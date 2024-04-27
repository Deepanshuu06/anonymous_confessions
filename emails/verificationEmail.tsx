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
          href="https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2"
          rel="stylesheet"
        />
        <style>
          {`
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 400;
              src: url('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
            }
          `}
        </style>
      </head>
      <body>
        <div>
          <p>Here's your verification code: {otp}</p>
        </div>
        <div>
          <h2>Hello {username},</h2>
        </div>
        <div>
          <p>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </p>
        </div>
        <div>
          <p>{otp}</p>
        </div>
        <div>
          <p>If you did not request this code, please ignore this email.</p>
        </div>
        {/* <div>
          <a
            href={`http://localhost:3000/verify/${username}`}
            style={{ color: '#61dafb' }}
          >
            Verify here
          </a>
        </div> */}
      </body>
    </html>
  );
}
