import axios from 'axios';

const axiosWithCookie = axios.create({
  withCredentials: true, // Include cookies automatically
});

export const fetchSession = (sessionID) => {
  return axiosWithCookie
    .get('http://localhost:8080/api/session', {
      headers: {
        Cookie: sessionID,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('세션 정보 요청 실패', error.response.data);
      throw error;
    });
};