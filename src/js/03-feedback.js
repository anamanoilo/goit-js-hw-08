import throttle from 'lodash.throttle';
import * as storage from '../services/localStorage';

const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(handleInput, 500));

function handleInput(e) {
  const { name, value } = e.target;
  const parsedData = storage.get(STORAGE_KEY) || {};
  const formData = {
    ...parsedData,
    [name]: value,
  };

  storage.save(STORAGE_KEY, formData);
}

function rehydrateData() {
  const parsedData = storage.get(STORAGE_KEY);
  const {
    elements: { email, message },
  } = formRef;
  email.value = parsedData?.email || '';
  message.value = parsedData?.message || '';
}
rehydrateData();

function submitHandler(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const finalData = {};
  for (const [key, value] of formData.entries()) {
    if (!value) {
      alert('Please fill in all the fields!');
      return;
    }
    finalData[key] = value;
  }
  console.log(finalData);
  form.reset();
  storage.remove(STORAGE_KEY);
}
formRef.addEventListener('submit', submitHandler);
