import React, { useEffect, useState } from "react";
import { AllApis } from "../../Utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import Contacts from "../../Components/Contacts";
import Welcome from "../../Components/Welcome";
import ChatContainer from "../../Components/ChatContainer";

const Chat = () => {
  const { allContacts } = AllApis;
  const [contactData, setContactData] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("e-chat-data")) {
          navigate("/login");
        } else {
          setCurrentUser(JSON.parse(localStorage.getItem("e-chat-data")));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        if (currentUser) {
          const response = await fetch(`${allContacts}/${currentUser._id}`);
          console.log(`${allContacts}/${currentUser._id}`, "url");
          if (response.status === 200) {
            const responseData = await response.json();
            setContactData(responseData);
            console.log("success 200 allcontact", responseData);
          } else if (response.status === 400) {
            console.log(`error 400 get contact`);
          } else if (response.status === 500) {
            console.log("error 500 contact");
          }
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div
      className="container-fluid text-black"
      style={{ backgroundColor: "white" }}
    >
      <div
        className="row"
        style={{ height: "94vh", backgroundColor: "white" ,borderTop:"1px solid #F2F2F2" , borderRadius:"10px"}}
      >
        <div
          className="col-lg-3 p-0"
          style={{ maxHeight: "94vh", overflowY: "auto", borderRight:"1px solid #F2F2F2" }}
        >
          <Contacts
            contacts={contactData}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>
        <div
          className="col-lg-9 p-0 "
          style={{
            maxHeight: "94vh",
            overflowY: "auto",
            backgroundColor: "white",
            
          }}
        >
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer  currentChat={currentChat} currentUser={currentUser}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
