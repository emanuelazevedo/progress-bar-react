import React, {useState, useEffect} from 'react';

const containerStyle = {
    border: '1px solid silver',
    background: '#ededed',
    borderRadius: '10px'
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
  marginTop: '30px',
  fontSize: '30px'
}

const mapSection = {
    marginTop: '10px'
}

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


const App = () => {
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState([]);
  const [finalResult, setFinalResult] = useState([]);

  useEffect(() => {
    setProgress(Math.round((100*page)/6));
  }, [page])

  const finalResultMap = finalResult.map(result => result + ' ');
  

  const nextPage = () => {
    
    if(progress !== 100 && progress < 100 && page !== 6) {
      setPage(page+1);
      
      // mudar isto para o useeffect para inserir e remover por filter
      setFinalResult(finalResult => [...finalResult, formData]);
      
    }
    console.log(finalResult);
    
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
      <div>
        {/* <button onClick={() => setProgress(0)}>0%</button>
        <button onClick={() => setProgress(5)}>5%</button>
        <button onClick={() => setProgress(15)}>15%</button>
        <button onClick={() => setProgress(50)}>50%</button>
        <button onClick={() => setProgress(75)}>75%</button>
        <button onClick={() => setProgress(100)}>100%</button> */}
        <button onClick={previousPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
      {page !== 6 ? 
        <div style={pageInfoSection}>
          <div >
            You are in page: {page+1}/6.
          </div>
          <div>
            <input placeholder="Put data here" 
            onChange={ e => setFormData(e.target.value) }
            />
          </div>
        </div>
        :
        <div>
          <div style={pageInfoSection}>
            You finished!
          </div>
          <div style={mapSection}>
            {finalResultMap}
          </div>
        </div>
      }
      
    </div>
  );
};

export default App;
