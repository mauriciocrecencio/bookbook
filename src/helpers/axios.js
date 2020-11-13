import axios from "axios";

const userApi = (path, method, data, auth) => {
  let params = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  };

  if (method !== "GET") {
    params.data = JSON.stringify(data);
  }

  return axios(`https://ka-users-api.herokuapp.com${path}`, params).then((res) => {
    return res;
  });
};

export default userApi;
