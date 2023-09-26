import React, {useState,useEffect} from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Table,Button} from 'react-bootstrap';
import axios from 'axios';
import image2 from '../assets/image2.jpg'

const NewApplication = () =>{
    
    const [utilities,setUtilities]=useState([]);

    const myStyle={
        backgroundImage: `url(${image2})` ,
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const [application, setApplication]=useState({
        name:"",
        phone:"",
        emailid:"",
        address:"",
        powerdemand:"",
    });

    
    const [validationMessage,setValidationMessage]=useState({
        phoneError:"",
        emailIdError:"",
    });

    
    const[utilError,setUtilError]=useState("");

    const[successMessage,setSuccessMessage]=useState("");

    const[errorMessage,setErrorMessage]=useState("");

    const[messages]=useState({
        GET_ERROR:"Something went wrong",
        PHNUM_ERROR:"Enter 10 digit number",
        EMAIL_ERROR:"Invalid Email Id",
        FAILURE_MESSAGE:"Failed to Register Application",
    });
    
    //const Utilities_URL="http://localhost:4050/utilities"
    //const Application_URL="http://localhost:4050/applications/"
    
    const Utilities_URL="https://electraq-data.onrender.com/utilities"
    const Application_URL="https://electraq-data.onrender.com/applications"
    
    useEffect(()=>{
        axios.get(Utilities_URL)
        .then((response)=>{
            setUtilities(response.data)
            setUtilError("")
        })
        .catch((error)=>{
            console.log(error)
            setUtilError("unable to get Utilities data")
        })
    },[])     

    const handleQuantityChange = (index,value) =>{
        const utilitieslist=[...utilities]
        utilitieslist[index].quantity=value;
        setUtilities(utilitieslist);
    };
    
    const handlePower=()=>{
        let power=0;
        utilities.map((data)=>{
            return (power += data.quantity*Number(data.powerConsumption))
        })
        setApplication({...application,powerdemand:power})
     };

    const handleChange = (event)=>{
        validation(event.target.name,event.target.value)
        setApplication({...application,[event.target.name]:event.target.value})
    };

    const validation = (name,value) => {
        let error=validationMessage;
        let regex=/^([\w.]+)@([\w]+)+\.(com||in)$/i;

        switch (name){
            case "phnum":
             if(value.length===10)
             {
                error.phoneError="";
             }
             else{
                error.phoneError=messages.PHNUM_ERROR;
             }
            break;
            case "emailid":
            if(regex.test(value)===true){
               error.emailIdError="";
            }else{
                error.emailIdError=messages.EMAIL_ERROR;
            }
            break;
            default:
                break;
        }
          setValidationMessage(error)
          console.log(error.phoneError)
          console.log(error.emailIdError)
    };


    const handleSubmit = (event) =>{
        event.preventDefault();
        let value1 = Object.values(validationMessage).every((value)=>{return value===""})
        if(value1){
            axios.post(Application_URL,application)
            .then((response)=>{
                setSuccessMessage(`Data Submitted Successfully with ID : ${response.data.id}`)
                setErrorMessage("")
                setApplication({name:"",phnum:"",emailid:"",address:"",powerdemand:0})
                utilities.map((data)=>{
                    return data.quantity=0;
                })
            })
            .catch(()=>{
                setSuccessMessage("")
                setErrorMessage(messages.FAILURE_MESSAGE)
            })
        }
        else{
            setErrorMessage(messages.GET_ERROR)
        }
    };   

    return(
        <>
        <div className="app" style={myStyle}>
            <div className="row m-3">
                <div className="container col-7 bg-white rounded border m-2 p-2 opacity-75">
                  <h3>Domestic Electrical Appliances</h3>
                  <Table>
                    <thead className="table-dark">
                    <tr>
                        <th>Item code</th>
                        <th>Item Name</th>
                        <th>Watt's/Unit</th>
                        <th>Quantity</th>
                        <th>Total Consumption</th>
                    </tr>
                    </thead>
                    <tbody>
                        {utilities.map((data,index)=>{
                            return(
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.itemName}</td>
                                    <td>{data.powerConsumption}</td>

                                    <td>
                                        <input
                                        type="number"
                                        min="0"
                                        value={data.quantity} 
                                        onChange={(event)=>handleQuantityChange(index,event.target.value)}
                                       />
                                    </td>
                                    <td>{data.quantity*Number(data.powerConsumption)} watts</td>
                                </tr>
                            );
                        })}
                    </tbody>
                  </Table>
                  <Button
                     type="button"
                     className="btn btn-warning m-1"
                     onClick={(event) => {handlePower(event)}} 
                    >
                        Calculate Power
                    </Button>
                    <span className="text-warning h5 bold">
                        {(application.powerdemand!=0)? `Total Power Applied For : ${application.powerdemand / 1000 }kilowatt`:null
                        }
                    </span>
                </div>
                <div className="container col">
                
                 <Form
                 className="border rounded bg-white p-3 mt-2 opacity-75"
                 onSubmit={(event)=>{handleSubmit(event)}} 
                 >
                    <h3>Applicants Information</h3>
                    <label className="form-label">Enter Name</label>
                    <input
                    required
                    className="form-control form-control-sm"
                    placeholder="Enter Full Name"
                    type="text"
                    name="name"
                    value={application.name} 
                    onChange={(event)=>handleChange(event)}
                    />
                    <label className="form-label">Contact Number</label>
                    <input
                    required
                    className="form-control form-control-sm"
                    placeholder="Enter 10 digit contact number"
                    type="number"
                    name="phnum"
                    value={application.phnum}
                    onChange={(event)=>handleChange(event)}
                    />
            
                       <div className="text-danger">
                        {(validationMessage.phoneError!=="")?<div>{validationMessage.phoneError}</div>:null}
                       </div>
                       <label className="form-label">Email Id</label>
                       <input
                       required
                       className="form-control form-control-sm"
                       type="email"
                       name="emailid"
                       value={application.emailid} 
                       onChange={(event)=>handleChange(event)}
                       />
                    
                        <div className="text-danger">
                            {(validationMessage.emailIdError!=="")?<div>{validationMessage.emailIdError}</div>:null}
                        </div>

                        <div className="row">
                            <div className="col">
                               <label className="form-label">House Address</label>
                               <textarea
                               required
                               className="form-control form-control-sm"
                               placeholder="Enter Full Address"
                               type="text"
                               name="address"
                               value={application.address} 
                               onChange={(event)=>handleChange(event)}
                               />
                            </div>
                        </div>
                         <span className="text-warning">
                            {(application.powerdemand!=0)? `Total Power Applied for : ${application.powerdemand/1000}kilowatt`:null}
                         </span>
                         <br/>
                         <span className="text-dark h5 bold">
                           {(successMessage!="")?successMessage:null}
                         </span>

                         <span className="text-danger h5 bold" >
                            {(errorMessage!="")?errorMessage:null}
                         </span>
                         <div>
                            <Button
                            type="submit"
                            className="btn btn-success mt-4"
                            >
                                Register Request
                            </Button>
                         </div>
                 </Form>
                </div>
            </div>
        </div>
        </>
    );
};

export default NewApplication;
