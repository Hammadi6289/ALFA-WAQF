import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDoctor,
  getDoctorDetails,
  updateDoctor,
  updateStatus,
} from "../../redux/actions/doctorActions";
import { FaAngleLeft } from "react-icons/fa";
import InputForm from "../../components/Forms/InputForm";
import InputSelect from "../../components/Forms/InputSelect";
import toast from "react-hot-toast";
import { reset } from "../../redux/slice/doctorSlice";

const DoctorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load doctor data
  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor, success, error } = useSelector((state) => state.doctor);
  const [edit, setEdit] = useState(true);
  // Track which action was performed
  const [actionType, setActionType] = useState(null);

  const [name, setName] = useState(doctor?.name);
  const [email, setEmail] = useState(doctor?.email);
  const [image, setImage] = useState(null); // Store File object or null
  const [preview, setPreview] = useState(""); // For image preview
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
      setName(doctor?.name || "");
      setEmail(doctor?.email || "");
      setPreview("");
      setImage(null);
      // setImage(doctor?.image || ""); //Don't set image here - keep it null -->The existing image is already displayed from doctor?.image
      setSpeciality(doctor?.speciality || "");
      setExperience(doctor?.experience || "");
      setDegree(doctor?.degree || "");
      setAbout(doctor?.about || "");
      setFees(doctor?.fees || "");
      setAddress(doctor?.address || "");
      setPhone(doctor?.phone || "");
      setGender(doctor?.gender || "");
    }
  }, [doctor]);

  // Handle ALL success/error in one place
  useEffect(() => {
    if (success && actionType === "update") {
      toast.success("Doctor updated successfully");
      navigate("/all-doctors");
    }

    if (success && actionType === "delete") {
      toast.success("Doctor deleted successfully");
      navigate("/all-doctors");
    }

    if (success && actionType === "status") {
      toast.success("Status updated");
      // Don't navigate, just refresh or update local state
      dispatch(getDoctorDetails(id)); // Refetch updated doctor
    }

    if (error) {
      toast.error(error);
    }

    // Reset after handling
    if (success || error) {
      setTimeout(() => {
        dispatch(reset());
        setActionType(null);
      }, 1000);
    }
  }, [success, error, actionType, navigate, dispatch, id]);

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    setActionType("delete");
    dispatch(deleteDoctor({ id }));
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    // formData.append("image", image);
    // Only append image if a new file was selected
    if (image instanceof File) {
      formData.append("image", image);
    }
    formData.append("speciality", speciality);
    formData.append("experience", experience);
    formData.append("degree", degree);
    formData.append("about", about);
    formData.append("fees", fees);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("gender", gender.toLowerCase());

    setActionType("update");
    dispatch(updateDoctor({ id, formData }));
  };

  const handleAvailability = (id, availableStatus) => {
    setActionType("status");
    dispatch(updateStatus({ id, availableStatus }));
  };

  // Handle cancel edit - reset to original values
  const handleCancelEdit = () => {
    setEdit(true);
    if (doctor) {
      setName(doctor.name || "");
      setEmail(doctor.email || "");
      setSpeciality(doctor.speciality || "");
      setExperience(doctor.experience || "");
      setDegree(doctor.degree || "");
      setAbout(doctor.about || "");
      setFees(doctor.fees || "");
      setAddress(doctor.address || "");
      setPhone(doctor.phone || "");
      setGender(doctor.gender || "");
    }
    setPreview("");
    setImage(null);
  };

  if (!doctor) {
    return (
      <Layout>
        <div className="text-center py-5">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

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
                onClick={() => {
                  if (edit) {
                    setEdit(false); // Enter edit mode
                  } else {
                    handleCancelEdit(); // Cancel and reset
                  }
                }}
              >
                {edit ? "Edit" : "Cancel"}
              </button>
              <button
                className="btn btn-danger ms-3"
                onClick={() => handleDelete(doctor?._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="add-doctor-form-card">
          {doctor?.image ? (
            <img
              src={`data:image/jpeg;base64,${doctor.image}`}
              alt={doctor.name}
              className="edit-doctor-detail-profile-img"
              height={200}
              width={200}
            />
          ) : (
            <div className="edit-doctor-detail-profile-img-placeholder">
              No Image
            </div>
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
            min="0"
            max="70"
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
          {/*  image display */}
          {/* File input - only show when in edit mode */}
          {!edit && (
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">
                Change Profile Image
              </label>
              <input
                id="profileImage"
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file); // Store File object, not base64
                    setPreview(URL.createObjectURL(file)); // For preview
                  }
                }}
                disabled={edit}
              />
              {/* Show preview of new image */}
              {preview && (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="New Preview"
                    className="edit-doctor-detail-profile-img"
                    height={200}
                    width={200}
                  />
                  <small className="text-muted d-block">
                    New image (preview)
                  </small>
                </div>
              )}
            </div>
          )}

          <div className="flex" style={{ marginBottom: "50px" }}>
            <button
              className="btn btn-primary"
              onClick={() => handleUpdate(doctor?._id)}
            >
              Update
            </button>
            {doctor?.available ? (
              <button
                className="btn btn-danger ms-3"
                onClick={() =>
                  handleAvailability(doctor?._id, { availableStatus: "false" })
                }
              >
                Mark Unavailable
              </button>
            ) : (
              <button
                className="btn btn-success ms-3"
                onClick={() =>
                  handleAvailability(doctor?._id, { availableStatus: "true" })
                }
              >
                Mark Available
              </button>
            )}
          </div>

          {/* <button
            className="btn btn-primary"
            onClick={() => handleUpdate(doctor?._id)}
          >
            Update
          </button> */}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDetails;
