import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Todos from "./Todos";
import { db } from "./firebase";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

function SignIn() {
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");

    const addUser = async () => {
        try {
            await addDoc(collection(db, email), {
                text: "",
                completed: "",
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleSignInClick = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                setValue(data.user.email);
                localStorage.setItem("email", data.user.email);
                addUser();
                setEmail(data.user.email);
            })
            .catch((error) => console.error(error));
    };

    const handleSignOutClick = () => {
        signOut(auth)
            .then(() => {
                setValue("");
                localStorage.removeItem("email");
            })
            .catch((error) => console.error(error));
    };
    return (
        <div>
            {value ? (
                <div>
                    <button onClick={handleSignOutClick} className="log-out-btn">
                        Çıkış yap
                    </button>
                    <Todos email={email} />
                </div>
            ) : (
                <div className="log-in-container">
                    <button onClick={handleSignInClick} className="log-in-btn">
                        Google ile giriş yap
                    </button>
                </div>
            )}
        </div>
    )
}

export default SignIn