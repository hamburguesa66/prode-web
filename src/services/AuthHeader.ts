export default function authHeader() {
    const userStr = sessionStorage.getItem("token");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return { Authorization: '' };
    }
  }
  