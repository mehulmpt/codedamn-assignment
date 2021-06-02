import axios from "axios";
export const API = "https://codedamn.herokuapp.com/";

export const Header = {
  "Content-Type": "Application/json",
  Accept: "Application/json",
};

export const LoginApi = (email: string, password: string) => {
  return axios.post(
    API + "/auth/login",
    {
      email,
      password,
    },
    {
      headers: Header,
    }
  );
};

export const RegisterApi = (email: string, password: string) => {
  return axios.post(
    API + "/auth/register",
    {
      email,
      password,
    },
    {
      headers: Header,
    }
  );
};
export const CreateFileApi = (fileName: string, token: string) => {
  return axios.post(
    API + "/file/create",
    {
      fileName,
    },
    {
      headers: {
        ...Header,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const GetFilesApi = (token: string) => {
  return axios.get(API + "/file", {
    headers: {
      ...Header,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const RunCode = (token: string) => {
  return axios.get(API + "/file/start", {
    headers: {
      ...Header,
      Authorization: `Bearer ${token}`,
    },
  });
};
