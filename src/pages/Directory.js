
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
function Directory(){

    
    const [phones, setPhones] = useState([]);
   
    useEffect(() => {
        axios
          .get('http://127.0.0.1:8000/api/phones')
          .then(res => {
            console.log(res);
            setPhones(res.data.data); 
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    
      const deletePhone = (e, id) => {
        e.preventDefault();

        const isClicked = e.currentTarget;
        axios
        .delete(`http://127.0.0.1:8000/api/phones/${id}`)
        .then((res) => {
          alert(res.data.message);
          isClicked.closest("tr").remove();
        })
        .catch(function (error) {
        
        });
      }

      var phoneDetails = "";
      if (phones.length > 0) {
        phoneDetails = phones.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <img
                  src={item.image}
                  alt="phone"
                  width="70"
                  height="50"
                  style={{ float: 'left' }}
              />
            </td>
            <td style={{ width: '45%' }}>{item.name}</td>
            <td style={{ width: '15%' }}>{item.number}</td>
            <td style={{ width: '15%' }} className="ms-auto">
              <Link to={`/phones/${item.id}/edit`} className="btn btn-sm btn-success ms-3">
                Edit
              </Link>
              <button type="button" onClick={(e) => deletePhone(e, item.id)} className="btn btn-sm btn-danger ms-3">
                Delete
              </button>
            </td>
          </tr>
        ));
      } else {
        phoneDetails = (
          <tr>
            <td colSpan="5" className="text-center">
              No data available
            </td>
          </tr>
        );
      }
    
    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="card"> 
                            <div className="card-header">
                                <h4> Directory Management 
                                    <Link to="/phones/store" className="btn btn-primary float-end" >
                                        Create
                                    </Link> 
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Contact No.</th>
                                            <th className="text-center" scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {phoneDetails}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Directory;