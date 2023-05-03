import React, { useState } from "react";
import { db } from "../../app/stores/commonStore";
import { collection, query, where, getDocs,DocumentData, setDoc, doc, updateDoc,serverTimestamp, getDoc } from "firebase/firestore";
import { authentication } from '../../app/stores/commonStore';
import { useAuthState } from "react-firebase-hooks/auth";

const Search = () => {
  const [user, loading, error] = useAuthState(authentication);
  const [username, setUsername] = useState<any | null>("");
  const [users, setUser] = useState<DocumentData | null>(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [err, setErr] = useState(false);

  const user_uid:any = user?.uid;
  const contact_id:any = userId;
  const contact_name:any = userName;
  const contact_image:any = userImage;

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("name", "==", username)
    )
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        setUserId(doc.data().id)
        setUserName(doc.data().name)
        setUserImage(doc.data().image)
    })
    } catch (error) {
      setErr(true)
    }
  }

  const handleKey = (e:any) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () =>{

    const combinedId = 
    user_uid  > contact_id 
    ? user_uid + contact_id  : 
    contact_id  + user_uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId))
     //console.log(combinedId)
    if(!res.exists()){
      const docRef = doc(db, "chats", combinedId);
      await setDoc(docRef, {messages: []});

      await updateDoc(doc(db, "userChats", user_uid),{
        [combinedId+".userInfo"]:{
          uid:contact_id,
          name: contact_name,
          image: contact_image
        },
        [combinedId+".date"]: serverTimestamp()
      });

      await updateDoc(doc(db, "userChats", contact_id),{
        [combinedId+".userInfo"]:{
          uid:user?.uid,
          name: user?.displayName,
          image: user?.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });
    }
    } catch (error) {
    }
    setUser(null);
    setUsername("");
  }
  
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          value={username}
          placeholder="Find a user (full name)"
          onChange={(e: any) => {
            setUsername(e.target.value);
          }}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found!</span>}
      {users && (
        <div className="userChat" onClick={handleSelect}>
          <img alt="" src={users?.image} />
          <div className="userChatInfo">
            <span>{users?.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;