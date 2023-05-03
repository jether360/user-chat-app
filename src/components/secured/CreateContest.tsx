import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Layout, message, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Form, Input, SubmitButton } from "formik-antd";
import { Formik, FieldArray, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../../app/stores/commonStore";
import { updateDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useParams, useHistory } from "react-router-dom";
import ContestList from "./ContestList";

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  //maxNumber: Yup.number().min(1,"Min value 1"),
  //contestant: Yup.string().required("Required"),
  contestant: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string().required("Required"),
    })
  ),
});
const { Option } = Select;

//const target = event.target as HTMLInputElement;

//const files = target.files;
//const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
// e.preventDefault();
// const target = e.currentTarget as HTMLInputElement;
// const file = target.files?.[0];
// console.log(file)
//};

const CreateContest = () => {
  let history = useHistory();

  const [isMainModel, setMainModel] = useState(false); // First Model
  const [isSubModel, setSubModel] = useState(false); // Second Model
  // const [file, setFile] = useState<File | any | null>(null); // Second Model
  // const [data, setData] = useState({});
  //const [progress, setProgress] = useState('');
  const [maxNumber, setMaxNumber] = useState(false);
  const [checkerData, setCheckerData] = useState(false);
  const [type, setType] = useState("");
  const { id }: any = useParams();

  useEffect(
    () =>
      onSnapshot(doc(db, "contest", `${id}`), (doc) => {
        try {
          const data = doc.data();
          let orgId = data?.id;
          let orgPost = data?.posts.length;
          console.log(orgPost);
          // if (orgId !== id) {
          //   history.replace("/create/election");
          // }
          if (orgPost !== 0) {
            let stateTrue = true;
            setCheckerData(stateTrue);
          }
        } catch (error) {
          console.log(error);
        }
      }),
    []
  );

  const onSubModel = (e: any, stateSub = true, stateMain = false) => {
    setMainModel(stateMain);
    setSubModel(stateSub);
  };

  function handleChange(value: any) {
    console.log(`selected ${value}`);
    if (value === "one-to-one") {
      setType(value);
      let stateFalse = false;
      setMaxNumber(stateFalse);
    }
    if (value === "one-to-many") {
      setType(value);
      let stateTrue = true;
      setMaxNumber(stateTrue);
      //showModal(<ReferralCertificateLetterReport />);
    }
  }

  //const hey = async ()=>{
  //  try {
  //    const docRef = doc(db, "contest", `${id}`);
  //  const docSnap = await getDoc(docRef);

  // if(docSnap.exists()){
  //  console.log("Document Data: ", docSnap.data());
  //  const myPostData = docSnap.data();
  //  let tempPosts = myPostData.posts;
  //   console.log(myPostData?.contestName)
  // }
  // else{
  //   console.log("no such document")
  //  }
  //  } catch (error) {
  //   console.log(error)
  // }
  // }

  //{
  /*
  useEffect(() => {
    const uploadFile = () => {
   const name = new Date().getTime + file.name
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress:any = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         // console.log('Upload is ' + progress + '% done');
          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
           //let data = downloadURL
            //  setFile(downloadURL);
            setData(downloadURL)
          });
        }
      );
    }
    file && uploadFile();
  }, [file])
  */
  //}

  return (
    <>
      <h1>Contest </h1>
      <Layout style={{ height: "80vh", backgroundColor: "#fff" }}>
        <Content>
          <Row
            justify="center"
            align="middle"
            style={{ backgroundColor: "#fff", height: "30%" }}
          >
            <Col>
              <Button type="primary" onClick={() => setMainModel(true)}>
                Add Contest
              </Button>
            </Col>
          </Row>
          {checkerData ? (
            <Row
              justify="center"
              //align="middle"
              style={{ backgroundColor: "#fff", height: "30%" }}
            >
              <Col>
                <ContestList id={id} />
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Content>
      </Layout>
      <Modal
        title="Add Contest"
        visible={isMainModel}
        onOk={() => setMainModel(false)}
        onCancel={() => setMainModel(false)}
        footer={null}
        maskClosable={false}
      >
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={{
            role: "",
            type: type,
            maxNumber: 0,
            contestant: [{ fullName: "", votes: [] }],
          }}
          onSubmit={async (value, { resetForm }) => {
            try {
              const docRef = doc(db, "contest", `${id}`);
              const docSnap = await getDoc(docRef);
              const myPostData = docSnap.data();
              let tempPosts = myPostData?.posts;
              tempPosts.push({
                role: value.role,
                type: value.type,
                maxNumber: value.maxNumber,
                contestant: value.contestant,
              });
              await updateDoc(docRef, {
                posts: tempPosts,
              });
              //  let stateSub = true,
              //   stateMain = false;
              console.log(value);
              resetForm();
              message.success("Successfully Created", 5);
              // setMainModel(false);
              // let stateFalse = false;
              //setMaxNumber(stateFalse);
              //setMainModel(stateMain);
              //  setSubModel(stateSub);
            } catch (error) {
              //console.log(error);
              message.error(`${error}`);
            }
          }}
        >
          {(formik) => (
            <Form layout="horizontal">
              <Form.Item name="type" label="Type">
                <Select
                  //defaultValue="Default"
                  //style={{ width: 500 }}
                  onChange={handleChange}
                  className="mb-3"
                  // fieldNames={"type"}
                >
                  <Option value="one-to-one">
                    One to One (One role one winner)
                  </Option>
                  <Option value="one-to-many">
                    One to Many (One role many winner)
                  </Option>
                </Select>
              </Form.Item>
              {maxNumber ? (
                <Form.Item name="maxNumber" label="Enter Max Number of Winner">
                  <Input
                    name="maxNumber"
                    placeholder="Enter Number"
                    size="large"
                    type="number"
                    suffix
                  />
                </Form.Item>
              ) : (
                ""
              )}
              <Form.Item name="role" label="Role">
                <Input name="role" placeholder="Role" size="large" suffix />
              </Form.Item>
              <FieldArray
                name="contestant"
                render={(arrayHelpers) => {
                  return (
                    <>
                      {formik.values.contestant.map((contestant, index) => (
                        <div key={index}>
                          <>
                            <Row justify="end">
                              <Col>
                                <Button
                                  // type="primary"
                                  danger
                                  ghost
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  X
                                </Button>
                              </Col>
                            </Row>
                            <br />
                          </>
                          <>
                            {
                              <>
                                <Form.Item label={"Contestant"} name="fullName">
                                  <Input
                                    name={`contestant.${index}.fullName`}
                                    id={`contestant.${index}.fullName`}
                                    suffix
                                  />
                                  {/*
                                     <br/>
                                     <br/>
                                     <label>Upload Picture (Optional)</label>
                                     <br/>
                                       <input
                                       style={{marginTop:"5px"}}
                                       name={`contestant.${index}.file`}
                                        id={`contestant.${index}.file`}
                                       type="file"
                                       //suffix
                                       onChange={(event) => {
                                         setFile(event.target.files?.[0])
                                       }}
                                     />
                                     */}
                                  <div style={{ color: "red" }}>
                                    <ErrorMessage
                                      name={`contestant.${index}.fullName`}
                                      component="span"
                                    />
                                  </div>
                                </Form.Item>
                                {/*<Form.Item name="file">
                                  <input
                                    name={`contestant.${index}.file`}
                                    // id={`contestant.${index}.file`}
                                    type="file"
                                    //suffix
                                    onChange={(event) => setFile(event.target.files?.[0])}
                                  />
                            </Form.Item>*/}
                              </>
                            }
                          </>
                        </div>
                      ))}
                      <>
                        {/*
                      progress? <h4>{`Upload is  ${progress}% done`}</h4> : <h4>{""}</h4>
                      */}
                        <Button
                          type="primary"
                          onClick={() =>
                            arrayHelpers.insert(
                              formik.values.contestant.length + 1,
                              { fullName: "", votes: [] }
                            )
                          }
                        >
                          + Add More Contestant
                        </Button>
                      </>
                    </>
                  );
                }}
              />
              <Row justify="end">
                <Col>
                  <SubmitButton type="primary">Submit</SubmitButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        title="Sub Modal"
        visible={isSubModel}
        onOk={(e) => onSubModel(e, false)}
        onCancel={(e) => onSubModel(e, false)}
        footer={null}
        maskClosable={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default CreateContest;
