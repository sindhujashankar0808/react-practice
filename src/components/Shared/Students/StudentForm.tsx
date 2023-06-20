import { useLocation } from "react-router-dom";

export const StudentForm = (props: any) => {
  // const location = useLocation();
  // const isCreatePage = location.pathname.includes("create");
  const {
    handleSubmit,
    resetForm,
    formData,
    selSubject,
    handleChange,
    handelClassChange,
    handleFileChange,
    isCreatePage,
  } = props;
  const { handleInputChange, handleUpdate, selectedSub } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="class">Class:</label>
          <select
            name="class"
            id="class"
            value={formData.class}
            onChange={handelClassChange}
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
                    onChange={handleChange}
                  />
                  {subject}
                </label>
              </div>
            ))}
          </>
        )}
        <div>
          <label htmlFor="profilePhoto">Profile Photo:</label>
          <input type="file" name="profilePhoto" onChange={handleFileChange} />
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
