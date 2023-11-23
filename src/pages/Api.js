import axios from "axios"

export const getUser = async (id) => {
  axios
  .get(`/api/user/${id}`)
  .then((res) => {
    console.log(res.data);
    console.log(res.data.data);
    return res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 유저 불러오기 실패`);
    return null;
  });
}