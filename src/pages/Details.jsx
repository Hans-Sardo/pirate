import { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const Details = () => {

    const {pirate_id} = useParams()
    const navigate= useNavigate();

    // STATE
    const [onePirate, setOnePirate] = useState(null)

    useEffect(() => {
        console.log(pirate_id)
        axios.get(`http://localhost:8000/api/pirates/${pirate_id}`)
            .then(res => setOnePirate(res.data))
            .catch(errors => console.log(errors))
    }, [])


    return (
        <fieldset>
            <legend>Details.jsx</legend>
            <button onClick={()=>navigate("/pirates")}>Home</button>
            {/* TERNARY OPERATOR */}
            {
                (onePirate) ? 
                <>
                    <h1>Name: {onePirate.name}</h1>
                    <img src={onePirate.profilePicture} alt="pirate picture" />
                    <h3>Treasures: {onePirate.treasureChests}</h3>
                    <h3>Position: {onePirate.crewPosition}</h3>
                    <h3>Peg Leg: {(onePirate.pegLeg) ? "Yes" : "No"}</h3>
                    <h3>Eye Patch: {(onePirate.eyePatch)? "Yes": "No"}</h3>
                    <h3>Hook Hand: {(onePirate.hookHand)? "Yes": "No"}</h3>
                </> : <h1>Loading....</h1>
            }

        </fieldset>
    )
}

export default Details

