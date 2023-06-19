import { useEffect, useState } from "react";
import { StudentProps } from "../../types/Student/student.type";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/helpers/common.helpers";
import { STU_LOCAL_STORAGE_KEY } from "../../utils/constants/students/common.constants";
import "../../style/style.css";
const StudentsList = () => {
  const [studentslist, setStudentsList] = useState<StudentProps[]>([]);
  useEffect(() => {
    const student = getLocalStorage(STU_LOCAL_STORAGE_KEY);
    if (student) {
      setStudentsList(student);
    }
  }, []);
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this data?"
    );

    if (confirmed) {
      const updatedStudentList = [...studentslist];
      updatedStudentList.splice(id, 1);
      setStudentsList(updatedStudentList);
      setLocalStorage(STU_LOCAL_STORAGE_KEY, updatedStudentList);
    }
  };
  return (
    <>
      <h2> Submited Student list</h2>
      <ul>
        {studentslist.map((data: StudentProps, index: number) => (
          <div className="card" key={index}>
            <li>
              {data.profilePhoto ? (
                <div>
                  <h4>Profile Photo:</h4>
                  <img
                    src={
                      data.profilePhoto?.dataUrl ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="ProfilePhoto"
                    style={{ width: "200px" }}
                  />
                </div>
              ) : null}
              <h3>Name: {`${data.firstName} ${data.lastName}`}</h3>
              <p>Email: {data.email}</p>
              <p>Age: {data.age}</p>
              <p>Class: {data.class}</p>
              <p>Subjects: {data.subjects.join(", ")}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <a href={`edit/${data.id}`}>
                <button>Edit</button>
              </a>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};
export default StudentsList;
