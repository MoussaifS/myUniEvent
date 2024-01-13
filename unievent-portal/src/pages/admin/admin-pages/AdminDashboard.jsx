import { useState, useRef , useEffect } from "react";
import Nav from "../../../components/Nav";
import { db ,auth } from "../../../FireBase"
import {doc, getDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import AdminCardContainer from "../components/AdminCardContainer";
import CreateEventForm from "../components/CreateEventForm";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

import "@material/web/dialog/dialog.js";
import "@material/web/button/outlined-button.js";
import "@material/web/fab/fab.js";
import "@material/web/fab/branded-fab.js";
import "@material/web/icon/icon.js";
import "@material/web/ripple/ripple.js";
const AdminDashboard = () => {
  const inputRef = useRef(null);
  const cookies = new Cookies();
  const aid = cookies.get("a_id");
  const [admin , setAdmin] = useState(null) 

  const navigate = useNavigate();
  const location = useLocation();

  function handleOpenFormClick() {
    inputRef.current.show();
  }

  function handleCloseFormClick() {
    inputRef.current.close();
  }

  const fetchOrginizerData = async () => {
    const docRef = doc(db, 'organizer', aid);
    await getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists) {
            setAdmin(docSnapshot.data());            
        }else{
          console.log('work harder')
        }
    });

  }
 
  useEffect(()=> {
    fetchOrginizerData()
  } , [])

  
    
 


  return (
    <div className="df-c">
      <Nav admin />
      <md-branded-fab
        label="Add New Event"
        id="createNewEvent-btn"
        onClick={handleOpenFormClick}
      >
        <svg slot="icon" viewBox="0 0 35 35">
          <path fill="#6750a4" d="M16 16v14h4V20z"></path>
          <path fill="#6750a4" d="M30 16H20l-4 4h14z"></path>
          <path fill="#6750a4" d="M6 16v4h10l4-4z"></path>
          <path fill="#6750a4" d="M20 16V6h-4v14z"></path>
          <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
      </md-branded-fab>
      <md-dialog className="zi-99" ref={inputRef}>
        <div className="df-c" slot="content" method="dialog">
          <CreateEventForm  admin={admin} />
          <md-outlined-button onClick={handleCloseFormClick}>
            close
          </md-outlined-button>
        </div>
      </md-dialog>

      <AdminCardContainer admin={admin} />
    </div>
  );
};

export default AdminDashboard;
