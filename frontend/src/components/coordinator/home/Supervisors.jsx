import React, { useEffect } from 'react';
//import '../studentstylings/Supervisorlist.css';
import '../coordinatorstylings/Supervisors.css';
import Loader from "../../Loader";
import toast from "react-hot-toast";
import {
  STUDENT_CURRENT_SUPERVISORS,
  clearErrors,
  clearMessages,
} from "../../../redux/actions/studentAction";
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';






const Supervisors = () => {



  const dispatch = useDispatch();
  const { error, loading, message, success, supervisors } = useSelector(
    (state) => state.STUDENT_FYP_REGISTRATION
  );

  useEffect(() => {
  if (message) {
    toast.success(message);
    dispatch(clearMessages());
  }
  if (success === "null" && message) {
    toast.error(message);
    dispatch(clearMessages());
  }
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }

  dispatch(STUDENT_CURRENT_SUPERVISORS())


}, [success, message, error]);


// TABLE COLUMNS -
const columns = [
  {
      name: 'Name',
      selector: row => row.name,
  },
  {
      name: 'Email',
      selector: row => row.email,
  }];

  // TABLE DATA -
  const tableData = [];

  supervisors && supervisors.forEach((data) => {

    tableData.push({
      name: data?.name,
      email: data?.email
    })


  });

  console.log(tableData)


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <> 
        <div className='coordinator_supervisor_list_container'>
        <div className="supervisor-container">
          <h4>Final Year Project Management and Tracking System</h4>
          <h1>Supervisors List</h1>
          
          {/* TABLE COMPONENT - */}
          <div className='supervisor-table'>
          <DataTable
            columns={columns}
            data={tableData}
        />
        </div>


        </div>
  
      </div>
     
  </>
      )}
   </>
  );
};

export default Supervisors;
