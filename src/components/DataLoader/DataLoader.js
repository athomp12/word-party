import axios from "axios";
import { useEffect } from "react";
import "./DataLoader.scss";

function checkTypes(arr) {
    if(Array.isArray(arr)) {
        return arr.every(i => (typeof i === "string"));
    }
}

const DataLoader = ({word, setWord, definitions, setDefinitions, dictUrl, eventClicked, setEventClicked, handleEventClick}) => {

    function handleWordClick(event) {
        setWord(event.target.innerText);
        handleEventClick(event.target.innerText);
    }

    useEffect(() => {
        const dictApiCall = async () => {
            try {
              const data = await axios.get(dictUrl);
              setDefinitions(data.data);
            } catch(err) {
              console.log(err);
            } 
        }
        if(eventClicked){
            setEventClicked(false);
            dictApiCall();
        }
    }, [dictUrl, eventClicked, setEventClicked, setDefinitions]);

    return (
        <div className="data-wrapper">
            { definitions && !!definitions.length && !checkTypes(definitions) && word && (
                <div className="data-container">
                    { definitions[0].fl && (
                        <span className="data-pos">{definitions[0].fl}</span>
                    )}
                    { definitions[0].hwi.prs && (
                        <span className="data-pronunciation">{definitions[0].hwi.prs[0].mw}</span>
                    )}
                    { definitions[0].shortdef && (
                        <span className="data-definition">{definitions[0].shortdef[0]}</span>
                    )}
                </div>
            )}
            { definitions && !!definitions.length && checkTypes(definitions) && word && (
                <div className="data-container">
                    <span className='data-helper-text'>Did you mean...</span>
                    { definitions.map((element, index) => (
                        <span className="data-suggestion" key={index} onClick={handleWordClick} >{element}</span>
                    ))}  
                </div>
            )}
        </div>
    );
};

export default DataLoader;