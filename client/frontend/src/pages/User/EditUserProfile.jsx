import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserData } from "../../redux/actions/authActions";

const EditUserProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  // const [email, setEmail] = useState(""); future integration
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(""); // For existing base64

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const { user, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setGender(user?.gender || "");
      setDob(user?.dob || "");
      // setEmail(user?.email); future integration
      setPhone(user?.phone || "");
      setAddress(user?.address || "");
      setImage(null);
      setExistingImage(user?.image || "");
    }
  }, [user]);

  if (!isOpen) return null;
  return (
    <>
      <div className="modal d-block " tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered user-profile-modal">
          <div className="modal-content user-profile-card">
            <div className="modal-header">
              <h2 className="modal-title">Update Profile</h2>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mod-details d-flex flex-column gap-3">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image) // Preview new upload
                      : existingImage
                      ? `data:image/jpeg;base64,${existingImage}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
                  }
                  alt="userPic"
                  width={100}
                  height={80}
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="d-flex flex-row">
                  <select
                    className="m-1"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value={"male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
