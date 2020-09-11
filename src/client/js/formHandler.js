import { is_url } from './urlValidator';

const postData = async (url = '', data = {}) => {
  console.log('log from postData', data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

export function handleSubmit(event) {
  event.preventDefault();
  const formText = document.getElementById('url').value;
  // ignore is_url... only just added and haven't got working
  // doesn't block rest of functionality
  if (is_url(formText)) {
    console.log('::: Form submitted successfully :::');

    postData('http://localhost:8081/create-report', { url: formText }).then(
      function (res) {
        document.getElementById('url').innerHTML = `Analysed URL: ${formText}`;
        document.getElementById(
          'sentiment-score'
        ).innerHTML = `Sentiment score: ${res.sentimentScore}`;
        document.getElementById(
          'agreement'
        ).innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById(
          'confidence'
        ).innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById('irony').innerHTML = `Irony: ${res.irony}`;
        document.getElementById(
          'subjectivity'
        ).innerHTML = `Subjectivity: ${res.subjectivity}`;
      }
    );
  } else {
    document.getElementById('url').innerHTML = `Please enter a valid URL`;
  }
}
