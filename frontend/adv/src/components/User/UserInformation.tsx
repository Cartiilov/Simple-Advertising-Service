import { useState, useEffect } from "react";
import { Button } from "../Buttons/Button";
import { useAuth } from "../../context/AuthContext";
import styles from "./UserInformation.module.css";
import { useGetData, useGetYourData } from "../../hooks/LoginHooks";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUserData } from "../../hooks/UserHooks";
import { useLogout } from "../../hooks/LoginHooks";

interface User {
  id: number;
  username: string;
  email: string;
}

const UserInformation = () => {
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<User[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<number | null>(null);
  const { setIsLogged, isLogged } = useAuth();
  const navigateTo = useNavigate();
  const { userPageId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await useGetYourData();
        const userId = userData.id;
        setCurrentUser(userId);
      } catch (error) {
        console.error(error);
      }
    };
    if (isLogged) {
      fetchUser();
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await useGetData(id);
      setUser(userData);
      if (currentUser) {
        setEditUsername(userData.username);
        setEditEmail(userData.email);
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleUpdate = async () => {
    if (editUsername.trim() === "" || editEmail.trim() === "") {
      alert("Username and email cannot be empty.");
      return;
    }

    const confirmLogout = window.confirm(
      "You will be logged out on email or username change. Do you want to proceed?",
    );
    if (!confirmLogout) {
      return;
    }
    try {
      await useUpdateUserData(editEmail, editUsername);
      setSuccessMessage("Update successful!");
      user.username = editUsername;
      user.email = editEmail;
      setTimeout(() => setSuccessMessage(""), 3000);
      setTimeout(() => {
        setIsLogged(false);
        useLogout();
        navigateTo("/");
      }, 3000);
      setEditMode(false);
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to update user information!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (isLogged && editMode) {
    return (
      <div className={styles.UserInformation}>
        <>
          Username
          <input
            type="text"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          Email
          <input
            type="text"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <div>
            <div style={{ display: "inline-block", marginRight: "10px" }}>
              <Button buttonStyle="btn--outline2" onClick={handleUpdate}>
                Confirm
              </Button>
            </div>
            <div style={{ display: "inline-block", marginRight: "10px" }}>
              <Button
                buttonStyle="btn--outline2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
          {successMessage && <span>{successMessage}</span>}
        </>
      </div>
    );
  } else {
    return (
      <div className={styles.UserInformation}>
        <>
          <h1>Username: {user.username}</h1>
          {isLogged && currentUser === user.id && (
            <>
              <p>Email: {user.email}</p>
              <div style={{ display: "inline-block", marginRight: "10px" }}>
                <Button
                  buttonStyle="btn--outline2"
                  onClick={() => setEditMode(true)}
                >
                  Edit Information
                </Button>
              </div>
            </>
          )}
        </>
      </div>
    );
  }
};

export default UserInformation;
