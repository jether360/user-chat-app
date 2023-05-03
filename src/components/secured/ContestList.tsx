import React, { useState, useEffect } from "react";
import { db } from "../../app/stores/commonStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
//import { useParams } from "react-router-dom";
import { Card, List,Row, Col, Radio } from "antd";

const ContestList = ({ id }: any) => {
  const [role, setRole] = useState("");
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');

  const onChange = (e:any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  
  useEffect(
    () =>
      onSnapshot(doc(db, "contest", `${id}`), (doc) => {
        //console.log((doc.data()));
        const data = doc.data();
        const posts = data?.posts;
        setPosts(posts);
      //  console.log(posts);
       //  console.log(posts.map((value:any)=>{
       //   console.log(value.role);
        //  setRole(value.role);
       //    console.log(value.contestant.map((values:any | undefined)=>{
       //      console.log(values.findIndex());
       //     }));
      //   }));
      }),
    []
  );

  return (
    <>
      {posts.map((value: any, index) => {
        return (
          //  console.log(value);
          <List
            key={index}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
          >   
            <List.Item>
              <Card title={value.role}></Card>
            </List.Item>
          </List>
        );
      })}
    </>
  );
};

export default ContestList;
