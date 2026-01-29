import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addNewDoctor } from "../../redux/actions/doctorActions";
import toast from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import InputForm from "../../components/Forms/InputForm";
import InputSelect from "../../components/Forms/InputSelect";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddDoctor = () => {
    if (
      !name ||
      !email ||
      !image ||
      !speciality ||
      !experience ||
      !degree ||
      !about ||
      !fees ||
      !address ||
      !gender ||
      !phone
    ) {
      return toast.error("Please Provide all the fields to add a Doctor");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image);
      formData.append("speciality", speciality);
      formData.append("experience", experience);
      formData.append("degree", degree);
      formData.append("about", about);
      formData.append("fees", fees);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("gender", gender);

      dispatch(addNewDoctor(formData));
      if (success) {
        toast.success("Doctor added successfully");
        navigate("/all-doctors");
      }
      if (error) {
        toast.error(error);
      }
    }
  };
  const { success, error } = useSelector((state) => state.doctor);
  return (
    <Layout>
      <div className="doctors-page">
        <div className="doctors-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Doctor Details</h2>
            <p>Alfalah General Hospital Admin Panel</p>
          </div>

          <button
            onClick={() => navigate("/all-doctors")}
            className="add-doctor-btn"
          >
            <FaAngleLeft className="FaAngleRight-btn-icon" size={16} />
            Previous Page
          </button>
        </div>
        <div className="w-75">
          <InputForm label={"Name"} value={name} setValue={setName} />
          <InputForm
            label={"Email"}
            value={email}
            setValue={setEmail}
            type="email"
          />
          <InputForm
            label={"Fees"}
            value={fees}
            setValue={setFees}
            type="number"
          />
          <InputForm label={"Address"} value={address} setValue={setAddress} />
          <InputForm
            label={"Phone"}
            value={phone}
            setValue={setPhone}
            type="tel"
          />
          <InputForm
            label={"Experience"}
            value={experience}
            setValue={setExperience}
            type="number"
          />
          <InputForm label={"Degree"} value={degree} setValue={setDegree} />
          <InputSelect
            label={"Speciality"}
            value={speciality}
            setValue={setSpeciality}
            options={[
              "Select Speciality",
              "Eyes",
              "General Physician ",
              "Cardiologist",
              "Dentist",
              "Gynecologist",
              "Orthopedist",
              "Pediatrician",
              "Psychiatrist",
              "Surgeon",
              "Neurologist",
              "Urologist",
              "Laparoscopic Surgeon",
              "Ophthalmologist",
              "Otolaryngologist",
            ]}
          />
          <InputSelect
            label={"Gender"}
            value={gender}
            setValue={setGender}
            options={["Select Gender", "Male", "Female", "Other"]}
          />
          <InputForm label={"About"} value={about} setValue={setAbout} />
          <div className="mb-3">
            <label htmlFor="form-label" className="form-label">
              Profile Image
            </label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddDoctor}>
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddDoctor;
