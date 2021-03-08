import React, {useState, useEffect, useReducer } from 'react';
import '../index.css'


/* CSS OF THE COMPONENTS */
const containerStyle = {
    border: '1px solid silver',
    background: '#ededed',
    borderRadius: '10px',
    width: '80%',
    margin: 'auto',
    marginTop: '40px'

};

const contentStyle = {
    background: '#00cc00',
    height: '24px',
    textAlign: 'center',
    lineHeight: '24px',
    fontFamily: 'sans-serif',
    transition: '0.5s',
    borderRadius: '10px'
};

const pageInfoSection = {
    marginTop: '80px',
    fontSize: '30px',
    textAlign: 'center',
}

const mapSection = {
    marginTop: '10px',
    textAlign: 'center',
}

const buttonsSection = {
    marginLeft: '130px',
    marginTop: '5px'
}

const btn = {
  width: '150px',
  marginLeft: '20px',
  height: '36px'
}

const inputField = {
  width: '600px',
  marginTop: '50px'
}

/* CHILD COMPONENTS */

//Progress Bar that show how along we are from the finishing filling the forms
const ProgressBar = ({progress}) => {
    const state = `${progress}%`;
    return (
      <div style={containerStyle}>
        <div style={{...contentStyle, width: state}}>
          {progress > 5 ? state : ''}
        </div>
      </div>
    );
};

// Forms and buttons
const InsertData = ({page, nextPage, previousPage, setFormData}) => {
    return (
      <>
          <div style={buttonsSection}>
            <button style={btn} onClick={previousPage}>Previous Page</button>
            <button style={btn} onClick={nextPage}>Next Page</button>
          </div>
          <div style={pageInfoSection}>
            <div >
              You are in page: {page+1}/6.
            </div>
            <div>
              <input placeholder="Put data here" 
                style={inputField}
                onChange={ e => setFormData(e.target.value) }
              />
            </div>
          </div>
        </>
    );
}

// List of everything written when filling the forms
const FinishedResults = ({finalResultMap}) => {
    return (
      <div>
          <div style={pageInfoSection}>
            You finished!
          </div>
          <div style={mapSection}>
            {finalResultMap}
          </div>
      </div>
    );
};

/* REDUCER */
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        finalResult: [...state.finalResult, action.payload]
      }

    default:
      return state
  }
}

/* APP - PARENT*/
const App = () => {

  const [state, dispatch] = useReducer(reducer, {finalResult: []});

  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setProgress(Math.round((100*page)/6));
    console.log(state);
  }, [page, state])

  const finalResultMap = state.finalResult.map(result => <p>{result.data}</p>);

  const nextPage = () => {
    
    if(progress !== 100 && progress < 100 && page !== 6) {
      setPage(page+1);
      
      dispatch({
        type: 'ADD_DATA',
        payload: {
          data: formData,
          page: page
        }
      })    
    }
  }

  const previousPage = () => {
    if(progress !== 0 && page !== 0){
      setPage(page-1);
    }
  }

  return (
    <div>
      <ProgressBar progress={progress} />
      <br />   
      {page !== 6 ? 
        <InsertData page={page} nextPage={nextPage} previousPage={previousPage} setFormData={setFormData}  />
        :
        <FinishedResults finalResultMap={finalResultMap} />
      }
      
    </div>
  );
};

export default App;
