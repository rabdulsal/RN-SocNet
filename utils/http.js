import axios from "axios";
import * as Private from "../private/keys";

const BASE_URL = "https://mockend.com/learningmachine00/testAPI/Device";
const DUMMY_URL = "https://dummyapi.io/data/v1";
let instance = axios.create({
  headers: {
    common: {
      // can be common or any other method
      header: { "app-id": Private.App_ID },
    },
  },
});

axios.defaults.headers.common["app-id"] = Private.App_ID; // for all requests

export async function fetchDevices() {
  const response = await instance.get(BASE_URL);
  return response.data;
}

export async function getUsers(page) {
  const response = await axios.get(DUMMY_URL + `/user?page=${page}`);
  const userData = response.data.data;
  return userData;
}

export async function getUserProfile(id) {
  const url = DUMMY_URL + `/user/${id}`;
  const response = await axios.get(url);
  const data = await response.data;
  return data;
}

export async function getPosts() {
  const response = await axios.get(DUMMY_URL + "/post");
  return await response.data.data;
}

export async function getUserPosts(id) {
  const response = await axios.get(DUMMY_URL + `/user/${id}/post`);
  const data = await response.data;
  return data;
}

export async function getPostComments(id) {
  const response = await axios.get(DUMMY_URL + `/post/${id}/comment`);
  return response.data;
}

export async function fetchDevice(id) {
  const response = await axios.get(BASE_URL + `/${id}`);
  return response.data;
}

export async function createDevice(deviceData) {
  const response = await axios.post(BASE_URL, deviceData);
  return response.data;
}

export async function deleteDevice(id) {
  const response = await axios.delete(BASE_URL + `/${id}`);
  return response.data;
}
