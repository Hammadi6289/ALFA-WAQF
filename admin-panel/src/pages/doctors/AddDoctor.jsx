import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addNewDoctor } from "../../redux/actions/doctorActions";
import toast from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import InputForm from "../../components/Forms/InputForm";
import InputSelect from "../../components/Forms/InputSelect";
import "./AddDoctor.css";

const AddDoctor = () => {
  const [name, setName] = useState("Dr. ");
  const [email, setEmail] = useState("@email.com");
  const [image, setImage] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("1000");
  const [address, setAddress] = useState("Islamabad");
  const [phone, setPhone] = useState("+92");
  const [gender, setGender] = useState("Female");

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
    }
    const expNumber = parseInt(experience);
    if (isNaN(expNumber)) {
      return toast.error("Experience must be a number (e.g., 5, 10)");
    }
    if (expNumber < 0) {
      return toast.error("Experience cannot be negative");
    }
    if (expNumber > 70) {
      return toast.error("Experience cannot exceed 70 years");
    }
    const feesNumber = parseFloat(fees);
    if (isNaN(feesNumber)) {
      return toast.error("Fees must be a number");
    }
    if (feesNumber < 0) {
      return toast.error("Fees cannot be negative");
    }
    if (feesNumber > 50000) {
      return toast.error(
        "Fees cannot exceed 50,000, Think about patients Damn!"
      );
    }
    const phoneRegex = /^[\+]?[1-9][0-9]{7,14}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return toast.error(
        "Please enter a valid phone number (e.g., +923001234567)"
      );
    }
    // All validations passed - proceed with submission
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
    formData.append("gender", gender.toLowerCase());

    dispatch(addNewDoctor(formData));
    if (success) {
      toast.success("Doctor added successfully");
      navigate("/all-doctors");
    }
    if (error) {
      toast.error(error);
    }
  };
  const { success, error } = useSelector((state) => state.doctor);
  return (
    <Layout>
      <div className="add-new-doctors-page">
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
        <div className="add-doctor-form-card">
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
            label={"Experience (years)"}
            value={experience}
            setValue={setExperience}
            type="number"
            min="0"
            max="80"
            placeholder="e.g., 5"
          />
          <InputForm label={"Degree"} value={degree} setValue={setDegree} />
          <InputSelect
            label={"Speciality"}
            value={speciality}
            setValue={setSpeciality}
            options={[
              "Select Speciality",
              "Eyes",
              "PEADS",
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
              "Peads",
            ]}
          />
          <InputSelect
            label={"Gender"}
            value={gender}
            setValue={setGender}
            options={["Select Gender", "Male", "Female", "Other"]}
          />
          <InputForm
            label={"About"}
            value={about}
            setValue={setAbout}
            placeholder="e.g., Ex Registrar Department of General Surgery PIMS, Islamabad"
          />
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
