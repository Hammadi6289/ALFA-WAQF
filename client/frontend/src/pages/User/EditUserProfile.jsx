import React from "react";
import "./UserProfile.css";

const EditUserProfile = ({ isOpen, onClose }) => {
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
                  alt="userPic"
                  width={100}
                  height={80}
                />
                <input type="file" />
                <input type="text" placeholder="Name" />
                <div className="d-flex flex-row">
                  <select className="m-1">
                    <option value={"male"} selected>
                      Male
                    </option>
                    <option value={"Female"}>Female</option>
                  </select>
                  <input type="date" placeholder="Date of Birth" />
                </div>
                <input type="text" placeholder="Contact Number" />
                <input type="text" placeholder="Address" />
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
