/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  const pageProtocol = window.location.protocol; // Will be "http:" or "https:"
  const domain = window.location.hostname; // Will be the domain name of the current page
  const port = window.location.port;
  let url;
  if (port) url = `${pageProtocol}//${domain}:${port}/api/v1/users/signup`;
  else url = `${pageProtocol}//${domain}/api/v1/users/signup`;
  try {
    const res = await axios({
      method: 'POST',
      url,
      data: {
        name,
        email,
        password,
        passwordConfirm
      },
      withCredentials: true
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Check an email and activate the account');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
