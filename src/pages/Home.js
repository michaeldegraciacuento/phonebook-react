import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
 
  const [dataCount, setDataCount] = useState(0);
  const [dataArchive, setDataArchive] = useState(0);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/phones')
      .then(res => {
        console.log(res);
        setDataCount(res.data.data.length); 
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/api/phones/archive')
      .then(res => {
        console.log(res);
        setDataArchive(res.data.data.length); 
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="col-md-12">
          <div className="d-flex justify-content-evenly">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-header text-center">
                <h5>Directory</h5>
              </div>
              <div className="card-body text-center">
                {dataCount} 
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-header text-center">
                <h5>Archive</h5>
              </div>
              <div className="card-body text-center">
                {dataArchive} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
