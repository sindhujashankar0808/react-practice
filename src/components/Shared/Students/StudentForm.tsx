import { ChangeEvent } from "react";
import { StudentProps } from "../../../types/Student/student.type";

export const StudentForm = (props: {
  onClick: (e: React.FormEvent) => void;
  resetForm: () => void;
  formData: StudentProps;
  selSubject: string[];
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    actionFrom: string
  ) => void;
  isCreatePage: boolean;
}) => {
  const {
    onClick,
    resetForm,
    formData,
    selSubject,
    handleChange,
    isCreatePage,
  } = props;
  return (
    <div>
      <form onSubmit={onClick}>
        <div style={{ textAlign: "center" }}>
          {isCreatePage ? <h2>Create Students List</h2> : <h2>Edit Student</h2>}
        </div>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange(e, "firstName")}
          />
        </div>
        <br />
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange(e, "lastName")}
          />
        </div>
        <br />
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={(e) => handleChange(e, "age")}
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email: &nbsp;&nbsp;</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
        <br />
        <div>
          <label htmlFor="class">Class:</label>
          <select
            name="class"
            id="class"
            value={formData.class}
            onChange={(e) => handleChange(e, "class")}
          >
            <option value="">--Select Class--</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={String(index + 1)}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <br />
        {selSubject && selSubject.length > 0 && (
          <>
            {selSubject.map((subject: string) => (
              <div key={subject}>
                <label>
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject}
                    checked={formData.subjects.includes(subject)}
                    onChange={(e) => handleChange(e, "subjects")}
                  />
                  {subject}
                </label>
              </div>
            ))}
          </>
        )}
        <div>
          <label htmlFor="profilePhoto">Profile Photo:</label>
          <input
            type="file"
            name="profilePhoto"
            onChange={(e) => handleChange(e, "file")}
          />
        </div>
        <br />
        {isCreatePage ? (
          <button type="submit">Submit</button>
        ) : (
          <button type="submit">Update</button>
        )}
        &nbsp;&nbsp;
        <button type="reset" onClick={resetForm}>
          Reset
        </button>
      </form>
    </div>
  );
};
