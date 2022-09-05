import { ContactsOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './StudentList.scss';

function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [studentListCp, setStudentListCp] = useState([]);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [gender, setGender] = useState('');
  const hdlSearchNameChange = (event) => {
    let nameSearch = event.target.value;
    setName(nameSearch);
    if (nameSearch == '') setStudentListCp(studentList);

    let rslist = studentList.filter(
      (v, i) => v.name.trim().indexOf(nameSearch.trim()) !== -1
    );
    console.log(rslist);
    console.log('----' + studentListCp);
    setStudentListCp(rslist);
  };
  const hdlSearchMailChange = (event) => {
    let emailSearch = event.target.value;
    setMail(emailSearch);
    let rslist = [];

    rslist = studentList.filter(
      (v, i) => v.email.trim().indexOf(emailSearch.trim()) !== -1
    );
    if (studentListCp.length < studentList.length) {
      rslist= rslist.filter((v, i) => studentListCp.includes(v));
    }

    setStudentListCp(rslist);
  };
  const hdlSearchGenderChange = (event) => {
    setGender(event.target.value);
  };

  const hdlDeleteStudent = (id) => {
    async function del() {
      let rs = await axios.delete('http://localhost:8989/student/delete/' + id);
      return rs.data;
    }
    del().then((res) => {
      setStudentListCp(studentList.filter((v, i) => v.id !== id));
    });
  };

  useEffect(() => {
    async function getData() {
      let rs = await axios.get('http://localhost:8989/student');
      return rs.data;
    }
    getData().then((res) => {
      setStudentList(res);
      setStudentListCp(res);
    });
  }, []);
  useEffect(() => {}, [name, mail, gender]);
  return (
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
          <input type="text" value={mail} onChange={hdlSearchMailChange} />
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
          {studentListCp &&
            studentListCp.length > 0 &&
            studentListCp.map((item, index) => {
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
  );
}
export default StudentList;
