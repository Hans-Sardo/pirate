import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Create = () => {

    const navigate = useNavigate()

    // STATE
    const [name, setName] = useState("")
    const [profilePicture, setProfilePicture]= useState("")
    const [treasureChests, setTreasureChests]= useState("")
    const [catchPhrase, setCatchPhrase]= useState("")
    const [crewPosition, setCrewPosition]= useState("")
    const [pegLeg, setPegLeg]= useState(true)
    const [eyePatch, setEyePatch]= useState(true)
    const [hookHand, setHookHand]= useState(true)
    const [errors, setErrors] = useState([]); 

    
    const createPirate = (e) => {
        e.preventDefault()
        // CREATE BODY TO SENT OVER TO API
        let body = {
            "name" : name, 
            "profilePicture": profilePicture,
            "treasureChests": treasureChests,
            "catchPhrase": catchPhrase,
            "crewPosition": crewPosition,
            "pegLeg": pegLeg,
            "eyePatch": eyePatch,
            "hookHand": hookHand,
        }
        console.log(body)
        // MAKE A AXIOS REQUEST TO MY API
        axios.post("http://localhost:8000/api/pirates", body)
            .then(res => {
                console.log(res.data)
                setName("")
                setProfilePicture("")
                setTreasureChests("")
                setCatchPhrase("")
                setCrewPosition("")
                setPegLeg("")
                setEyePatch("")
                setHookHand("")
                navigate("/pirates")
            })
            .catch(err =>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
        console.log("ASYNC")
            // .catch(errors => console.log(errors.response.data.errors))
    }
    const dropdown= (e)=>{
        setCrewPosition(e.target.value)
    }
    const checkPeg = (e)=>{
        setPegLeg(e.target.checked)
    }
    const checkPatch = (e)=>{
        setEyePatch(e.target.checked)
    }
    const checkHand = (e)=> {
        setHookHand(e.target.checked)
    }

    return (
        <fieldset>
            <legend>Create.jsx</legend>
            <button onClick={()=>navigate("/pirates")}>Crew Board </button>
            <form onSubmit={createPirate}>
                <p>
                    PirateName:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </p>
                <p>
                    Profile Picture Url:
                    <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
                </p>
                <p>
                    # of Treasure Chests:
                    <input type="number" value={treasureChests} onChange={(e) => setTreasureChests(e.target.value)} />
                </p>
                <p>
                    Catch Phrase:
                    <input type="text" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} />
                </p>
                <p>
                    Crew Position:
                    <select value={crewPosition} onChange={ (e) => setCrewPosition(e.target.value)}>
                        <option>Choose One</option>
                        <option value="Captian">Captain</option>
                        <option value="First Mate">First Mate</option>
                        <option value="Boatswain">Boatswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>
                    </select>
                </p>
                <p>
                    Peg Leg:
                    <input type="checkbox" checked={pegLeg} onChange={checkPeg} />
                </p>
                <p>
                    Eye Patch:
                    <input type="checkbox" checked={eyePatch} onChange={checkPatch} />
                </p>
                <p>
                    Hook Hand:
                    <input type="checkbox" checked={hookHand} onChange={checkHand} />
                </p>
                <button>Add Pirate</button>
            </form>
            {
                errors.map((error)=> <p>{error}</p>)
            }
        </fieldset>
    )
}

export default Create


