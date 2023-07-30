import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button} from "react-bootstrap";
import axios from 'axios';
import image1 from '../assets/image1.jpg'


const ViewApplication = () =>{
    
    const [applid,setApplid]=useState(0);
    
    const[data,setData]=useState({});
    
    const[dataFailureMsg,setDataFailureMsg]=useState("");

    const[deleteSuccess,setDeleteSuccess]=useState("");
    
    const [deleteError,setDeleteError]=useState("");

    const myStyle={
        backgroundImage: `url(${image1})` ,
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    
    const Application_URL="http://localhost:4050/applications/"

    const [appmessages]=useState({
        GETDATA_ERROR: "Could Not Find Any Application with the ID number",
        DELETE_SUCCESS:"Application Withdraw",
        DELETE_FAILURE:"Application Withdraw Failed",
    });


    const getApplicantData = (event) =>{
        event.preventDefault();
        setData({})
          axios.get(Application_URL+applid)
          .then((response)=>{
            setData(response.data)
            console.log(response.data)
            setDataFailureMsg("")
            setDeleteError("")
            setDeleteSuccess("")

          })
          .catch((error)=>{
            console.log(error);
            setDataFailureMsg(appmessages.GETDATA_ERROR)
            console.log(dataFailureMsg);
          })

    };
    
    const withdrawApplication=()=>{
         axios.delete(Application_URL+applid)
         .then((response)=>{
            setDeleteError("")
            setDeleteSuccess(appmessages.DELETE_SUCCESS)
         })
         .catch((error)=>{
            setDeleteError(appmessages.DELETE_FAILURE)
            setDeleteSuccess("")
         })
    };

    return(
        <div style={myStyle}>
        <div className="row">
            <div className="col-4">
                <Form
                className="form bg-warning rounded p-3 m-3"
                onSubmit={(event)=>{getApplicantData(event)}} 
                >
                    <label htmlFor="applid">Enter Application Number</label>
                    <br/>
                    <br/>
                    <input
                    required
                    name="applid"
                    id="applid"
                    type="number"
                    placeholder="Enter Application Number"
                    value={applid} 
                    onChange={(event)=>{setApplid(event.target.value)}} 
                    />
                    <br/>
                    <br/>
                    <Button type="submit">
                        Show Application
                    </Button>
                </Form>
            </div>
            <div className="col-6">
             {(Object.keys(data).length!=0) ?
             <div className="card opacity-75 ">
                <div className="card-body">
                <ul className="list-group mt-3 font-weight-bold">
                     <li className="list-group-item">
                        Application Id : {data.id}
                     </li>
                     <li className="list-group-item">
                        Applicant's Name:{data.name}
                     </li>
                     <li className="list-group-item">
                        Applicants's Address:{data.address}
                     </li>
                     <li className="list-group-item">
                        Mobile Number: {data.phnum}
                     </li>
                     <li className="list-group-item">
                        Email Id: {data.emailid}
                     </li>
                     <li className="list-group-item">
                        Power Demand: {data.powerdemand/1000} kilowatt
                     </li>
                </ul>
                </div>
                <Button
                className="btn-danger m-3"
                onClick={(event)=>{withdrawApplication(event)}}
                >
                    Withdraw Application
                </Button>
             </div> : null}
            </div>
            
            <div className="text-white p-3 h3">
                {(dataFailureMsg!=="")? <div className="bg-primary">{dataFailureMsg}</div>  : ""}
            </div>
            
            <div className="text-white p-3 h3">
                {( deleteSuccess !=="") ? <div className="bg-primary">{deleteSuccess}</div> : null}
            </div>

             <div 
             className="text-white p-3 h3"
             data-testid="deleteFailureMsg"
             >
                { (deleteError!=="") ?<div className="bg-primary"> {deleteError}</div> : null}
             </div>
        </div>
        </div>
    );
};

export default ViewApplication;
