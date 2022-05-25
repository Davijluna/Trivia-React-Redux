export const actionGetQuestions = (data) => ({
  type: 'GET_QUESTIONS',
  payload: data,
});

// export const actionChangeName2 = {
//   type: 'CHANGE_NAME',
//   payload: 'novo nome',
// };

export const getToken = async () => {
  const apiToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const apiTokenJson = await apiToken.json();
  localStorage.setItem('token', apiTokenJson.token);
  return apiTokenJson.token;
};

export const getQuestions = async () => {
  const ERROR_RESPONSE_TOKEN = 3;
  let tokenLocalStorage = {};
  try {
    tokenLocalStorage = localStorage.getItem();
  } catch (error) {
    getToken();
  }

  let apiQuestions = '';
  let apiQuestionsJson = {};

  apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`);
  apiQuestionsJson = await apiQuestions.json();
  if (apiQuestionsJson.response_code === ERROR_RESPONSE_TOKEN) {
    apiQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${await getToken()}`);
    apiQuestionsJson = await apiQuestions.json();
  }
  console.log(apiQuestionsJson);
  // return apiQuestionsJson;
  return (dispatch) => {
    dispatch(actionGetQuestions(apiQuestionsJson.results));
  };
};
