import React, { useState, useEffect } from "react";
import "../superstylings/superfyprequests.css";
import Loader from "../../Loader";
import toast from "react-hot-toast";
import {
  SUPERVISOR_FYP_PROPOSAL,
  clearErrors,
  
} from "../../../redux/actions/supervisorAction";
import { useDispatch, useSelector } from 'react-redux';


import DataTable from 'react-data-table-component';



const FypRequests = () => {
  

  
  const dispatch = useDispatch()
  const { error, loading, fyps } = useSelector(
    (state) => state.SUPERVISOR
  );

  const [visible, setVisible] = useState(false);
  
  // console.log(fyps)

  const toggleVisibility = () => {
    setVisible(!visible);
  };



useEffect(() => {
  
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }

  dispatch(SUPERVISOR_FYP_PROPOSAL())


}, [dispatch]);

const columns = [
  {
      name: 'Project Title',
      selector: row => row.title,
  },
  {
      name: 'Team lead',
      selector: row => row.lead,
  },

  {
    name: 'Project Document',
    selector: row => row.doc,
  },

  {
    name: 'Status',
    selector: row => row.status,
  },

  {
    name: 'Actions',
    selector: row => row.actions,
  },
];

const handleDocumentClick = (docUrl) => {
 
  window.open(docUrl, '_blank'); // Opens the document in a new tab/window
};
const tableData = [];

  
  fyps && fyps.forEach((data) => {

    const backendDocumentLink = data?.fileUrl;

    tableData.push({
      title: data?.projecttitle,
      lead: data?.teamleader1name,
      doc: (
        <button
          onClick={() => handleDocumentClick(backendDocumentLink)}
          style={{ cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'transparent', color: 'blue' }}
        >
          View Document
        </button>
      ),
      status: data?.status,
      
      actions: <div className="actions__styles">
        <button>
          Accept
        </button>
        <button>
          Reject
        </button>
      </div>

    });

  });


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
    <div className="container">
      <h2 className="title">FYP Request Information</h2>
      <div className="inner-container">
       
      <DataTable
            columns={columns}
            data={tableData}
        />
      </div>
    </div>
    </>
     )}
     </>
  );
};
  

export default FypRequests;
