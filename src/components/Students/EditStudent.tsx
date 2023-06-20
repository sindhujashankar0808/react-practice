import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { StudentProps } from "../../types/Student/student.type";
import { StudentForm } from "../Shared/Students/StudentForm";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/helpers/common.helpers";
import { STU_LOCAL_STORAGE_KEY } from "../../utils/constants/students/common.constants";
import { useNavigate, useParams } from "react-router-dom";
import {
  STU_INIT_STATE,
  SUBJECTS_HIGHER_CLASS,
  SUBJECTS_MIDDLE_CLASS,
} from "../../utils/constants/students/students.constants";

export const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentStu, setCurrentStu] = useState<StudentProps | null>(null);
  const [selectedSub, setSelectedSub] = useState<string[]>([]);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  useEffect(() => {
    const studentsList: StudentProps[] | null = getLocalStorage(
      STU_LOCAL_STORAGE_KEY
    );

    if (studentsList && id) {
      const filteredStu = studentsList.filter(
        (student) => student.id === Number(id)
      );
      if (filteredStu.length > 0) {
        setCurrentStu(filteredStu[0]);
        setSelectedSub(
          filteredStu[0].class === "12"
            ? SUBJECTS_HIGHER_CLASS
            : SUBJECTS_MIDDLE_CLASS
        );
        setProfilePhotoFile(filteredStu[0].profilePhoto);
      }
    }
  }, [id]);
  const handleFileChange = (file?: File) => {
    if (file) {
      const selectedImage = file;
      const reader = new FileReader();
      reader.onload = (event) => {
        const profileImage = event.target?.result;
        setCurrentStu((prevStu: any) => ({
          ...prevStu,
          profilePhoto: {
            name: selectedImage.name,
            dataUrl: profileImage,
          },
        }));
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      handleFileChange(file);
    } else if (
      type === "checkbox" &&
      event.target instanceof HTMLInputElement
    ) {
      const checked = event.target.checked;
      const selectedSubjects = [...currentStu!.subjects];

      if (checked) {
        selectedSubjects.push(value);
      } else {
        const index = selectedSubjects.indexOf(value);
        if (index !== -1) {
          selectedSubjects.splice(index, 1);
        }
      }

      setCurrentStu((prevStu: any) => ({
        ...prevStu,
        subjects: selectedSubjects,
      }));
    } else if (name === "class") {
      const selectedClass = value;
      let defaultSubjects: React.SetStateAction<string[]> = [];

      if (selectedClass === "11" || selectedClass === "12") {
        defaultSubjects = SUBJECTS_HIGHER_CLASS;
      } else {
        defaultSubjects = SUBJECTS_MIDDLE_CLASS;
      }

      setSelectedSub(defaultSubjects);

      setCurrentStu((prevStu: any) => ({
        ...prevStu,
        [name]: value,
        subjects: defaultSubjects,
      }));
    } else {
      setCurrentStu((prevStu: any) => ({
        ...prevStu,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();

    const students = getLocalStorage(STU_LOCAL_STORAGE_KEY);
    if (students) {
      const updatedStudents = [...students];
      const studentIndex = updatedStudents.findIndex(
        (student) => student.id === Number(id)
      );
      if (studentIndex !== -1) {
        updatedStudents[studentIndex] = {
          ...currentStu,
          profilePhotoFile: profilePhotoFile,
        };
        setLocalStorage(STU_LOCAL_STORAGE_KEY, updatedStudents);
        navigate("/");
      }
    }
  };
  const resetForm = () => {
    setCurrentStu({ ...STU_INIT_STATE });
  };
  return (
    <div>
      {currentStu && (
        <StudentForm
          formData={currentStu}
          updatedFormData={(
            updatedValue: React.SetStateAction<StudentProps | null>
          ) => setCurrentStu(updatedValue)}
          selSubject={selectedSub}
          onSubmit={handleUpdate}
          onChange={handleInputChange}
          handleFileChange={handleFileChange}
          resetForm={resetForm}
          // isCreatePage={false}
        />
      )}
    </div>
  );
};
