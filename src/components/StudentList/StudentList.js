import { ContactsOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Drawler from '../Drawler/Drawler';
import './StudentList.scss';
import Login from '../Auth/Login';
import { Navigate } from 'react-router-dom';

function StudentList() {
  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  
  const [studentList, setStudentList] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const hdlSearchNameChange = (event) => {
    let nameSearch = event.target.value;
    setName(nameSearch);

    // let rslist = studentList.filter(
    //   (v, i) => v.name.trim().indexOf(nameSearch.trim()) !== -1
    // );
  };
  const hdlSearchMailChange = (event) => {
    let emailSearch = event.target.value;
    setEmail(emailSearch);
  };
  const hdlSearchGenderChange = (event) => {
    setGender(event.target.value);
  };

  const hdlDeleteStudent = (id) => {
    async function del() {
      let rs = await axios.delete(
        'http://localhost:8989/student/delete/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + getToken(),
          },
        }
      );
      return rs.data;
    }
    del().then((res) => {
      setStudentList(studentList.filter((v, i) => v.id !== id));
    });
  };

  // method:'GET',
  // url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/userinfo`,
  // headers:{
  //     'Authorization':'Bearer '+getToken()
  // }

  useEffect(() => {
    console.log('-------------', getToken());
    async function getData() {
      let rs = await axios.get('http://localhost:8989/student', {
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
      });
      return rs.data;
    }
    getData().then((res) => {
      setStudentList(res);
    });
  }, []);


  let token = getToken();
  if (token) {
    return (
      <>
        <div className="wrapper">
          <Drawler></Drawler>
          <div id="studentListWrapper">
            <h1 className="title">Student List</h1>
            <div className="search-box">
              <div className="search-item name">
                <p>Search by Name</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => hdlSearchNameChange(e)}
                />
              </div>
              <div className="search-item mail">
                <p>Search by Email</p>
                <input
                  type="text"
                  value={email}
                  onChange={hdlSearchMailChange}
                />
              </div>
              <div className="search-item gender">
                <p>Gender</p>
                <div className="gender-ratio-container">
                  <p>Male</p>
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    onChange={hdlSearchGenderChange}
                  />
                  <p>FeMale</p>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    onChange={hdlSearchGenderChange}
                  />
                  <p>All</p>
                  <input
                    type="radio"
                    name="gender"
                    value=""
                    onChange={hdlSearchGenderChange}
                  />
                </div>
              </div>
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>email</th>
                  <th>gender</th>
                  <th>team</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {studentList &&
                  studentList.length > 0 &&
                  studentList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>

                        <td>{item.teams}</td>
                        <td>
                          <span
                            className="del-student-btn"
                            onClick={() => hdlDeleteStudent(item.id)}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" replace />;
    // return(<Login/>)
  }
}
export default StudentList;
