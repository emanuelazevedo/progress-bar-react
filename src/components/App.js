import React, {useState, useEffect} from 'react';

const containerStyle = {
    border: '1px solid silver',
    background: '#ededed'
};

const contentStyle = {
    background: '#00cc00',
    height: '24px',
    textAlign: 'center',
    lineHeight: '24px',
    fontFamily: 'sans-serif',
    transition: '0.5s'
};

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

  useEffect(() => {
    setProgress(Math.round((100*page)/6));
  }, [page])

  const nextPage = () => {
    
    if(progress !== 100 && progress < 100 && page !== 6) {
      setPage(page+1);
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
      {page}
    </div>
  );
};

export default App;
