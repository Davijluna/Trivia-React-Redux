export const actionGetQuestions = (data) => ({
  type: 'GET_QUESTIONS',
  payload: data,
});

export const actionSetUser = (data) => ({
  type: 'SET_USER',
  payload: data,
});

const getToken = async () => {
  const apiToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const apiTokenJson = await apiToken.json();
  localStorage.setItem('token', apiTokenJson.token);
  return apiTokenJson.token;
};

export const getQuestions = async () => {
  const ERROR_RESPONSE_TOKEN = 3;
  const ERROR_RESPONSE_NOTFOUND = 4;

  const tokenLocalStorage = localStorage.getItem('token');
  if (!localStorage.getItem('token') || localStorage.getItem('token') === '') {
    await getToken();
  }
  let apiQuestions = '';
  let apiQuestionsJson = {};

  apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`);
  apiQuestionsJson = await apiQuestions.json();
  if (
    apiQuestionsJson.response_code === ERROR_RESPONSE_TOKEN
    || apiQuestionsJson.response_code === ERROR_RESPONSE_NOTFOUND
  ) {
    apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${await getToken()}`);
    apiQuestionsJson = await apiQuestions.json();
  }
  // console.log(apiQuestionsJson);
  // return apiQuestionsJson;
  return (dispatch) => {
    dispatch(actionGetQuestions(apiQuestionsJson.results));
  };
};
