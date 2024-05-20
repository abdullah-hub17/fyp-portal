import React, { useEffect } from 'react';

import '../coordinatorstylings/Students.css';
import Loader from "../../Loader";
import toast from "react-hot-toast";
import {
 
  Coordinator_Student_Fyp,

  clearErrors,

} from "../../../redux/actions/coordinatorAction";
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';


const Students= () => {

  const dispatch = useDispatch();
  const { error, loading, fyp } = useSelector(
    (state) => state.COORDINATOR_STUDENTS
  );

  useEffect(() => {
 
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }

  dispatch(Coordinator_Student_Fyp())


}, [error, dispatch]);


// TABLE COLUMNS -
const columns = [
  {
      name: 'Project Title',
      selector: row => row.title,
  },
  {
      name: 'Team Lead',
      selector: row => row.lead,
  },
  {
    name: 'ID',
    selector: row => row.leadRoll,
  },
  {
    name: 'Member 1',
    selector: row => row.member1,
  },

  {
    name: 'Member 1 ID',
    selector: row => row.member1Roll,
  },

  {
    name: 'Member 2',
    selector: row => row.member2,
  },

  {
    name: 'Member 2 ID',
    selector: row => row.member2Roll,
  },

  {
    name: 'Supervisor',
    selector: row => row.supervisor,
  },


];

  // TABLE DATA -
  const tableData = [];

  console.log(fyp)

  fyp && fyp.forEach((data) => {

    console.log(data)

    tableData.push({
      title: data?.projecttitle,
      lead: data?.teamleader1name,
      leadRoll: data?.regid1,
      member1: data?.member2name,
      member1Roll: data?.regid2,
      member2: data?.member3name,
      member2Roll: data?.regid3,
      supervisor: data?.supervisorname

    })


  });

  


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <> 
        <div className='coordiantor_studentlist_container'>
        <div className="student-container">
          <h4>Final Year Project Management and Tracking System</h4>
          <h1>Students List</h1>
          
          <div className='student-table'>
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

export default Students;
