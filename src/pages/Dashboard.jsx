import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";


const Dashboard = () => {
  // STATE
  const [allPirates, setAllPirate] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const handleOnClick = useCallback((_id) => navigate(`/pirates/${_id}`));
  

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pirates")
      .then((res) => setAllPirate(res.data))
      .catch((errors) => console.log(errors));
  }, [refresh]);

  const deletePirate = (pirate_id) => {
    axios
      .delete(`http://localhost:8000/api/pirates/${pirate_id}`)
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((errors) => console.log(errors));
  };

  // HANDLER
  return (
    <fieldset>
      <legend>Dashboard.jsx</legend>
      <button onClick={()=> navigate("/pirates/new")}>Add Pirate</button>
      {allPirates &&
        allPirates.map((pirate) => {
          const { _id, name, profilePicture } = pirate;
          return (
            <div>
              <img src={profilePicture} alt="pirate pic" />
              <p>{name}</p>
              <button onClick={() => handleOnClick(_id)}>View Pirate</button>
              <button onClick={() => deletePirate(_id)}>Walk The Plank</button>
            </div>
          );
        })}
    </fieldset>
  );
};

export default Dashboard;
