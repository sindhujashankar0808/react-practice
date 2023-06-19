import React, { ChangeEvent, useEffect, useState } from "react";
import { StudentProps } from "../../types/Student/student.type";

import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/helpers/common.helpers";
import {
  STU_INIT_STATE,
  SUBJECTS_HIGHER_CLASS,
  SUBJECTS_MIDDLE_CLASS,
} from "../../utils/constants/students/students.constants";
import { StudentForm } from "../Shared/Students/StudentForm";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../utils/constants/students/router.constants";
import { STU_LOCAL_STORAGE_KEY } from "../../utils/constants/students/common.constants";

export const CreateStudents = () => {
  const navigate = useNavigate();
  const students = getLocalStorage(STU_LOCAL_STORAGE_KEY);
  const [selSubject, setSelSubject] = useState<string[]>([]);
  const [formData, setFormData] = useState<StudentProps>({
    ...STU_INIT_STATE,
    id: students !== null ? students.length + 1 : 1,
  });
  const [studentsList, setStudentsList] = useState<StudentProps[]>([]);
  useEffect(() => {
    const students = getLocalStorage(STU_LOCAL_STORAGE_KEY);
    if (students) {
      setStudentsList(students);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("come");
    try {
      const updatedFormData = [formData, ...studentsList];
      setLocalStorage("studentsList", updatedFormData);
      setStudentsList(updatedFormData);
      navigate(ROUTERS.home);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (name === "age") {
      let ageValue = parseInt(value, 10);
      ageValue = Math.max(3, Math.min(ageValue, 20));
      setFormData({ ...formData, [name]: ageValue });
    } else if (type === "checkbox") {
      let updatedSubjects: string[];

      if (checked) {
        updatedSubjects = [...formData.subjects, value];
      } else {
        updatedSubjects = formData.subjects.filter(
          (subject) => subject !== value
        );
      }

      setFormData({ ...formData, subjects: updatedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handelClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const subject =
      value === "11" || value === "12"
        ? SUBJECTS_HIGHER_CLASS
        : SUBJECTS_MIDDLE_CLASS;
    setFormData({ ...formData, [name]: value, subjects: subject });
    setSelSubject(subject);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const profileImage = event.target?.result;
        setFormData({
          ...formData,
          profilePhoto: {
            name: selectedImage.name,
            dataUrl: profileImage,
          },
        });
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const resetForm = () => {
    setFormData({ ...STU_INIT_STATE });
  };

  return (
    <div>
      <StudentForm
        formData={formData}
        setFormData={setFormData}
        selSubject={selSubject}
        onSubmit={handleSubmit}
        resetForm={resetForm}
        onChange={handleChange}
        handelClassChange={handelClassChange}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};
