import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCW9uW8ydr1OaZZOmjzszCnMuOfSnH9F5w",
  authDomain: "excel-analytics-platform-38649.firebaseapp.com",
  projectId: "excel-analytics-platform-38649",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
