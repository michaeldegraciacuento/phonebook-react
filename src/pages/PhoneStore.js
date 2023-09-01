import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PhoneStore() { 
    
    const navigate = useNavigate();
    const [inputErrorList, setInputErrorList] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
      };
    const handleImageChange = (e) => {
                getBase64(e.target.files[0])
            .then(result => {
                setSelectedImage(result);
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    
    const [phone, setPhone] = useState({
        name: '',
        number: '',
        image: ''
    });
    
    const storePhone = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', phone.name);
        formData.append('number', phone.number);
        formData.append('image', selectedImage); 
        
        axios.post('http://127.0.0.1:8000/api/phones', formData)
            .then(res => {
                alert(res.data.message);
                navigate('/directory');
            })
            .catch(function (error) {
                if(error.response){
                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors)
                    }
                    if(error.response.status === 500){
                        alert(error.response.data.data)
                    }
                }
            });
    }
    const handleInput = (e) => {
        e.persist();
        setPhone({...phone, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="card"> 
                            <div className="card-header">
                                <h4> Add Directory
                                    <Link to="/directory" className="btn btn-primary float-end" >
                                        Back
                                    </Link> 
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storePhone}>
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
                                        <div className="mb-3">
                                            <label>Image</label>
                                            <input 
                                              type="file" 
                                              accept="image/*" 
                                              name="image" 
                                              onChange={handleImageChange} 
                                              className="form-control" 
                                            />
                                            <span className="text-danger">{inputErrorList.image}</span>
                                        </div>
                                    <div className="mb-3">
                                       <button type="submit" className="btn btn-primary"> Save </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default PhoneStore;