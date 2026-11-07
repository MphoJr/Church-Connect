import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>ChurchConnect</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
