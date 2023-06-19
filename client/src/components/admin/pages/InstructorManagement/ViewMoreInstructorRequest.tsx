import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIndividualInstructors } from "../../../../api/endpoints/admin/instructorManagement";
import { formatDate } from "../../../../utils/helpers";
import { acceptInstructorRequest } from "../../../../api/endpoints/admin/instructorManagement";
import {toast} from 'react-toastify'
import Modal from "../../../common/Modal";
import { Button } from "@material-tailwind/react";

interface Certificate {
  name: string;
  url: string;
}

interface InstructorInfo {
  _id:string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  mobile: string;
  qualifications: string;
  subjects: string[];
  experience: string;
  skills: string[];
  about: string;
  dateJoined: string;
  certificates: Certificate[];
}

const ViewMoreInstructorRequest: React.FC = () => {
  const profilePic =
    "https://res.cloudinary.com/dwucedjmy/image/upload/v1679288002/cld-sample-3.jpg";
  const certificates = [
    {
      name: "Certificate 1",
      url: "https://res.cloudinary.com/dwucedjmy/image/upload/v1679288002/cld-sample-3.jpg",
    },
    {
      name: "Certificate 2",
      url: "https://res.cloudinary.com/dwucedjmy/image/upload/v1679288002/cld-sample-3.jpg",
    },
  ];

  const { id } = useParams();
  const [instructor, setInstructor] = useState<InstructorInfo>();
  const [open, setOpen] = useState<boolean>(false)
  const fetchInfo = async () => {
    try {
      const response = id && await getIndividualInstructors(id);
      response && setInstructor(response.data.data);
    } catch (error) {
      // Handle error
    }
  };
  
  useEffect(() => {
    fetchInfo();
  }, [id]);

  if (!instructor) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    firstName,
    lastName,
    email,
    // profilePic,
    mobile,
    qualifications,
    subjects,
    experience,
    skills,
    about,
    dateJoined,
    // certificates,
  } = instructor;
  const acceptRequest = async () => {
    try {
      const response = await acceptInstructorRequest(_id);
      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error: any) {
      toast.error(error.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const handleReject = () => {
    setOpen(true);
  };


  return (
    <div className="bg-white rounded-md mt-2 px-4 py-6">
      {open && <Modal open={open} setOpen={setOpen} id={_id} />}
      <div className="bg-white mx-auto">
        <div className="px-4 py-6 sm:px-6">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={profilePic}
              alt="Profile"
            />
            <h3 className="text-lg leading-6 font-medium text-gray-900 ml-4">
              {firstName} {lastName}
            </h3>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {certificates.length > 0 && (
            <div className="px-4 py-4 sm:py-6">
              <h4 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                Certificates
              </h4>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.name}
                    className="flex flex-col items-center"
                  >
                    <img
                      className="h-20 w-20 text-gray-400 mb-2"
                      src={certificate.url}
                      alt={certificate.name}
                    />
                    <span className="text-sm font-medium text-indigo-600">
                      {certificate.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="px-4 py-4 sm:py-6">
            <dl className="divide-y divide-gray-200">
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mobile}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Qualification
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{qualifications}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Subjects</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {subjects.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Experience
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{experience}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900">{skills}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">About</dt>
                  <dd className="mt-1 text-sm text-gray-900">{about}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(dateJoined)}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 flex justify-end">
        <Button size="sm"className="mr-2" color="green" onClick={acceptRequest}>
          Approve
        </Button>
        <Button size="sm" color="red" onClick={handleReject} >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default ViewMoreInstructorRequest;
