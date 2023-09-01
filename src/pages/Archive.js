import axios from 'axios'
import React, { useEffect, useState } from 'react';

function Archive(){
    const [phones, setPhones] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        axios
          .get('http://127.0.0.1:8000/api/phones/archive')
          .then(res => {
            console.log(res);
            setPhones(res.data.data); 
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

      const retrievePhone = (e, id) => {
        e.preventDefault();

        const isClicked = e.currentTarget;
        axios
          .patch(`http://127.0.0.1:8000/api/phones/${id}/retrieve`)
          .then((res) => {
            alert(res.data.message);
            isClicked.closest("tr").remove();
          })
          .catch(function (error) {
            console.error(error);
          });
      };
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
      const filteredPhones = phones.filter((phone) => {
        const phoneName = phone.name.toLowerCase();
        const phoneNumber = phone.number.toLowerCase();
        const query = searchQuery.toLowerCase();
        return phoneName.includes(query) || phoneNumber.includes(query);
      });

     var phoneArchives = '';
    if (filteredPhones.length > 0) {
    phoneArchives = filteredPhones.map((item, index) => (
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
          <button
            type="button"
            onClick={(e) => retrievePhone(e, item.id)}
            className="btn btn-sm btn-danger ms-3"
          >
            Retrieve
          </button>
        </td>
      </tr>
    ));
  } else {
    phoneArchives = (
      <tr>
        <td colSpan="5" className="text-center">
          No matching data available
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 col-sm-12 ">
              <div className="card">
                <div className="card-header">
                  <h4>Archive Management</h4>
                </div>
                <div className="card-body">
                  <div className="col-md-12">
                    <label>Search:</label>
                    <input
                      type="text"
                      name="search"
                      placeholder="Type here ..."
                      className="form-control"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact No.</th>
                        <th className="text-center" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>{phoneArchives}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archive;