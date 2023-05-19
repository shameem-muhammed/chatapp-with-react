import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../includes/FireBase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [err, setErr] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const signUp = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      createUserWithEmailAndPassword(auth, email, password).then((user) => {
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask
          .then(() => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                await updateProfile(user.user, {
                  displayName: name,
                  photoURL: downloadURL,
                });
                console.log("next section");
                await setDoc(doc(db, "users", user.user.uid), {
                  uid: user.user.uid,
                  name: name,
                  email: email,
                  profilePic: downloadURL,
                  incomingcount: 0,
                  ispinned: false,
                });

                await setDoc(doc(db, "userchats", user.user.uid), {})
              }
            );
            navigate("/signin");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  let onFileChange = () => {
    let file = fileInputRef.current.files[0]
    if(file) {
      setImage(URL.createObjectURL(file))

    } else {
      setImage(null)
    }
  }

  return (
    <div id="signup-page-maincontainer">
      <div className="signup-secondcontainer">
        <div className="signup-titlediv">
          <h2>Create a Space in Myspace🚀</h2>
          <h3>CREATE ACCOUNT</h3>
        </div>
        <div className="signup-formdiv">
          <form id="signup-form" onSubmit={signUp}>
            <h1></h1>
            <input type="text" placeholder="enter your name" />
            <input type="email" placeholder="enter your email" />
            <input type="password" placeholder="enter your password" />
            <div className="file-choose-div">
              <label>Select a profile picture</label>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={() => onFileChange()}
              />
              <button type="button" className="file-choosen-button" onClick={() => fileInputRef.current.click()}>
                <img src={!image ? require('../../assets/icons/add-folder.png') : image} alt="" />
              </button>
            </div>
            <div className="submit-button">
              <button form="signup-form" className="signup-button" type="submit">Register</button>
            </div>
          </form>
        </div>
        {err && <p>something went wrong</p>}
        <div className="login-to-signup-div">
          <p>or</p>
          <Link to='/signin'>Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
