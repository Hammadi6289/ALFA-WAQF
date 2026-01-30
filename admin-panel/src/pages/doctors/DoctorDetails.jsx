import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails } from "../../redux/actions/doctorActions";
import { FaAngleLeft } from "react-icons/fa";
import InputForm from "../../components/Forms/InputForm";
import InputSelect from "../../components/Forms/InputSelect";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor } = useSelector((state) => state.doctor);
  const [edit, setEdit] = useState(true);

  const [name, setName] = useState(doctor?.name);
  const [email, setEmail] = useState(doctor?.email);
  const [image, setImage] = useState(doctor?.image);
  const [speciality, setSpeciality] = useState(doctor?.speciality);
  const [experience, setExperience] = useState(doctor?.experience);
  const [degree, setDegree] = useState(doctor?.degree);
  const [about, setAbout] = useState(doctor?.about);
  const [fees, setFees] = useState(doctor?.fees);
  const [address, setAddress] = useState(doctor?.address);
  const [phone, setPhone] = useState(doctor?.phone);
  const [gender, setGender] = useState(doctor?.gender);

  useEffect(() => {
    if (doctor) {
      setName(doctor?.name);
      setEmail(doctor?.email);
      setImage(doctor?.image);
      setSpeciality(doctor?.speciality);
      setExperience(doctor?.experience);
      setDegree(doctor?.degree);
      setAbout(doctor?.about);
      setFees(doctor?.fees);
      setAddress(doctor?.address);
      setPhone(doctor?.phone);
      setGender(doctor?.gender);
    }
  }, [doctor]);

  const handleDelete = () => {};
  const handleUpdate = () => {};

  return (
    <Layout>
      <div className="add-new-doctors-page">
        <div className="doctors-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Doctor Details</h2>
            <p>Alfalah General Hospital Admin Panel</p>
            <div className="ms-auto">
              <button
                className="btn btn-warning ms-3"
                onClick={() => setEdit(!edit)}
              >
                {edit ? "Edit" : "cancel"}
              </button>
              <button
                className="btn btn-danger ms-3"
                onClick={() => handleDelete(id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="add-doctor-form-card">
          {doctor.image ? (
            <img
              src={`data:image/jpeg;base64,${doctor.image}`}
              alt={doctor.name}
              className="edit-doctor-detail-profile-img"
              height={200}
              width={200}
            />
          ) : (
            "N/A"
          )}
          <InputForm
            label={"Name"}
            value={name}
            setValue={setName}
            disabled={edit}
          />
          <InputForm
            label={"Email"}
            value={email}
            setValue={setEmail}
            disabled={edit}
            type="email"
          />
          <InputForm
            label={"Fees"}
            value={fees}
            setValue={setFees}
            disabled={edit}
            type="number"
          />
          <InputForm
            label={"Address"}
            value={address}
            setValue={setAddress}
            disabled={edit}
          />
          <InputForm
            label={"Phone"}
            value={phone}
            setValue={setPhone}
            disabled={edit}
            type="tel"
          />
          <InputForm
            label={"Experience"}
            value={experience}
            setValue={setExperience}
            disabled={edit}
            type="number"
          />
          <InputForm
            label={"Degree"}
            value={degree}
            setValue={setDegree}
            disabled={edit}
          />

          <InputForm
            label={"About"}
            value={about}
            setValue={setAbout}
            disabled={edit}
          />
          <InputSelect
            label={"Gender"}
            value={gender}
            setValue={setGender}
            options={["Select Gender", "Male", "Female", "Other"]}
          />
          <InputSelect
            label={"Speciality"}
            value={speciality}
            setValue={setSpeciality}
            disabled={edit}
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
              "Peads",
            ]}
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
          {/* <button className="btn btn-primary" onClick={handleAddDoctor}>
            Submit
          </button> */}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDetails;
