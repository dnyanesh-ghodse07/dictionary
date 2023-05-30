import { useEffect, useState } from 'react';
import './App.css';
// https://api.dictionaryapi.dev/api/v2/entries/en/hello
function App() {

  const [text, setText] = useState('hello');
  const [searchResult, setSearchResult] = useState([]);  
  const fetchData = async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
    const data = await res.json();
    setSearchResult(data);
  }
  
  
  useEffect(() => {
    fetchData()
  }, [text])
  
  console.log(searchResult?.[0]);
  
  // const {word,meanings,phonetics} = searchResult?.[0];
  
  const handleSearch = () => {
    
  }
  
  
  const MeaningText = ({meaning}) => {
    return (
      <>
    <h4>{meaning?.partOfSpeech}</h4>
    <ul>
      {meaning?.definitions?.map(def => {
        return <li>{def?.definition}</li>
      })}
    </ul>
    <p style={{color: 'orange'}}>Antonym</p>
    {
      meaning?.antonyms?.map(ant => {
        return <span style={{color: 'purple'}}>{ant} </span>
      })
    }
    <hr style={{margin: '15px 0'}}/>
    </>

)
}


const AudioPlay = ({url}) => {
  const audio = new Audio(url);
  return (
    <>
    <button onClick={() => audio.play()}>play</button>
    </>
  )
}

  return (
    <div className="App">
      <div className='dictionary-container'>
        <div className='top'>
          <div className='logo'>
            D
          </div>
          <div className='font-theme'>
            <select>
              <option>serif</option>
            </select>
            <div className='toggle' />
          </div>
        </div>
        <div className='search-input'>
          <input onChange={(e) => setText(e.target.value)} placeholder='search'  />
        </div>
        <div className='result'>
          <div className='result-top'>
            <div>
            <h1>{searchResult?.[0]?.word}</h1>
            <span>{searchResult?.[0]?.phonetics[1]?.text}</span>
            </div>
            <div>
                <AudioPlay url={searchResult?.[0]?.phonetics[0]?.audio}/>
            </div>
          </div>
          <div className='part-of-speech'>
            {searchResult?.[0]?.meanings[0]?.partOfSpeech}
          </div>
          <div className='meanings'>
            <h5>meanings: </h5>
            {searchResult?.[0]?.meanings?.map(meaning => {
              return <MeaningText meaning={meaning} />
            })}
          </div>
          {/* <div className='synonym'>Synonym: {searchResult}</div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
