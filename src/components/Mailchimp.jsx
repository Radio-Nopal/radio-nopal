import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const url = process.env.REACT_APP_MAILCHIMP_URL;

// a basic form
function CustomForm({ status, message, onValidated }) {
  let email; let
    name;
  const submit = () => email
    && name
    && email.value.indexOf('@') > -1
    && onValidated({
      EMAIL: email.value,
      NAME: name.value,
    });

  return (
    <div>
      {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
      {status === 'error' && (
        <div
          style={{ color: 'red' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          style={{ color: 'green' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        ref={(node) => { name = node; }}
        type="text"
        placeholder="nombre"
      />
      <br />
      <input
        ref={(node) => { email = node; }}
        type="email"
        placeholder="email"
      />
      <br />
      <button type="button" onClick={submit}>
        subscribir
      </button>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
}

export default Demo;
