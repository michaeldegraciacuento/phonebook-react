import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function PhoneEdit() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});
  const [phone, setPhone] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/phones/${id}`)
      .then((res) => {
        setPhone(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const handleImageChange = (e) => {
    getBase64(e.target.files[0])
      .then((result) => {
        setSelectedImage(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePhone = (e) => {
    e.preventDefault();

   
    const data = {
        name: phone.name,
        number: phone.number,
        image: selectedImage,
    }
    axios
      .put(`http://127.0.0.1:8000/api/phones/${id}`, data)
      .then((res) => {
        alert(res.data.message);
        navigate('/directory');
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
          if (error.response.status === 500) {
            alert(error.response.data.data);
          }
        }
      });
  };

  const handleInput = (e) => {
    e.persist();
    setPhone({ ...phone, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Edit Directory
                  <Link to="/directory" className="btn btn-primary float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={updatePhone}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleInput}
                        value={phone.name}
                        className="form-control"
                      />
                      <span className="text-danger">{inputErrorList.name}</span>
                    </div>
                    <div className="col-md-6">
                      <label>Contact Number</label>
                      <input
                        type="number"
                        name="number"
                        onChange={handleInput}
                        value={phone.number}
                        className="form-control"
                      />
                      <span className="text-danger">{inputErrorList.number}</span>
                    </div>
                  </div>
                  <label>Image:</label>
                  <div className="mb-3">
                    <img
                      src={phone.image}
                      alt="phone"
                      width="120"
                      height="100"
                      style={{ float: 'left' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneEdit;
