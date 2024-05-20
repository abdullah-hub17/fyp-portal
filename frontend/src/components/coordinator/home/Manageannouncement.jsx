import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../coordinatorstylings/Manageannouncement.css";
import Loader from "../../Loader";
import toast from "react-hot-toast";
import {
  Coordinator_Create_Announcement,
  clearErrors,
  clearMessages,
} from "../../../redux/actions/coordinatorAction";

const AnnouncementPage = () => {
  const initialFormData = [{
    date: "",
    title: "",
  }];

  const [formData, setFormData] = useState(initialFormData);
  // const [announcements, setAnnouncements] = useState([]);
  const [view, setView] = useState(false)
  const dispatch = useDispatch();
  const { error, loading, message, success } = useSelector(
    (state) => state.COORDINATOR_CREATE_ANNOUNCEMENT
  );

  const { date, title } = formData;

  

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    

    setView(true)
  };

  

  useEffect(() => {
    

    if (message) {
      toast.success(message);
      dispatch(clearMessages());
    }
    if (success === null && message) {
      toast.error(message);
      dispatch(clearMessages());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, message, error, date, title]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container-four">
            <h1 className="title-four">ANNOUNCEMENTS</h1>
            <div className="inner-four">
            <form className="form-four" onSubmit={handleAnnouncementSubmit}>
  <label className="label-four">
    Select Date:
    <input
      type="date"
      value={date}
      onChange={(e) => setFormData((prevData) => ({ ...prevData, date: e.target.value }))}
      required
    />
  </label>
  <br />
  <label className="label-four">
    Title:
    <input
      className="input-four"
      type="text"
      value={title}
      onChange={(e) => setFormData((prevData) => ({ ...prevData, title: e.target.value }))}
      required
    />
  </label>
  <br />
  <button className="btn" type="submit">
    Display
  </button>
</form>

              
      <div>
        <h2 className="newtitle-four">Preview</h2>
        <ul className="unorder">
         

{
  formData.length > 0 && formData?.map ((data, indx) =>
    <li className="list-four" key={indx}>
      <strong>{data?.date}</strong>: {data?.title}
      <button>
        Delete
      </button>
    </li>
  )
}

        </ul>
      </div>
   
  
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AnnouncementPage;
