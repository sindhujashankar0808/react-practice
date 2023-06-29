import React, { ChangeEvent, useEffect, useState } from "react";
import { StudentProps } from "../../types/Student/student.type";

import {
  getLocalStorage,
  setLocalStorage,
  validateForm,
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const students = getLocalStorage(STU_LOCAL_STORAGE_KEY) || [];
    if (students) {
      setStudentsList(students);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateForm(formData);
    setTimeout(() => {
      if (isValid) {
        try {
          const updatedFormData = [formData, ...studentsList];
          setLocalStorage(STU_LOCAL_STORAGE_KEY, updatedFormData);
          setStudentsList(updatedFormData);
          navigate(ROUTERS.home);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }, 1000);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    actionFrom: string
  ) => {
    console.log(actionFrom);

    const { target } = event;
    const { type } = target;
    if (type === "select-one") {
      handelClassChange(target as HTMLSelectElement);
    } else if (type === "file") {
      handleFileChange(target as HTMLInputElement);
    } else if (type === "checkbox") {
      handleCheckbox(target as HTMLInputElement);
    } else {
      handleInputChange(target as HTMLInputElement);
    }
  };
  const handleInputChange = (target: HTMLInputElement) => {
    const { name, value } = target as HTMLInputElement;
    if (name === "age") {
      let ageValue = parseInt(value, 10);
      ageValue = Math.max(3, Math.min(ageValue, 20));
      setFormData({ ...formData, [name]: ageValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleCheckbox = (target: HTMLInputElement) => {
    const { checked, value } = target;
    let updatedSubjects: string[];

    if (checked) {
      updatedSubjects = [...formData.subjects, value];
    } else {
      updatedSubjects = formData.subjects.filter(
        (subject) => subject !== value
      );
    }

    setFormData({ ...formData, subjects: updatedSubjects });
  };
  const handelClassChange = (target: HTMLSelectElement) => {
    const { name, value } = target;
    const subject =
      value === "11" || value === "12"
        ? SUBJECTS_HIGHER_CLASS
        : SUBJECTS_MIDDLE_CLASS;
    setFormData({ ...formData, [name]: value, subjects: subject });
    setSelSubject(subject);
  };

  const handleFileChange = (target: HTMLInputElement) => {
    if (target.files && target.files.length > 0) {
      const selectedImage = target.files[0];
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
  if (isLoading) {
    return <div className="loader"></div>;
  }
  return (
    <div>
      {formData && (
        <StudentForm
          formData={formData}
          // updatedFormData={(updatedValue: React.SetStateAction<StudentProps>) =>
          //   setFormData(updatedValue)
          // }
          selSubject={selSubject}
          onClick={handleSubmit}
          resetForm={resetForm}
          handleChange={(e, actionFrom: string) => handleChange(e, actionFrom)}
          isCreatePage={true}
        />
      )}
    </div>
  );
};
