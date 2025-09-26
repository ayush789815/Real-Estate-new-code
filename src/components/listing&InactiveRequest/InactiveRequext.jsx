import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteProject,
  updateProjectStatus,
  setProjectList,
} from "../../utils/PropertyManagementSlice";

const InactiveRequest = () => {
  const dispatch = useDispatch();

  const {
    projectList = [],
    loading,
    error,
  } = useSelector((state) => state.PropertyInfo || {});

  const fetchProjects = async () => {
    try {
      const res = await fetch(
        "https://realstate-2.onrender.com/api/v1/project?page=1&limit=100000"
      );
      const data = await res.json();
      dispatch(setProjectList(data?.data || []));
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const inactiveProjects = projectList.filter(
    (project) => project?.status === false
  );

  const handleAccept = async (projectId) => {
    await dispatch(updateProjectStatus({ projectId, status: true }));
    fetchProjects();
    toast.success("Approved and shining! This property is ready to be listed.");
  };

  const handleReject = async (projectId) => {
    await dispatch(deleteProject(projectId));
    fetchProjects();
    toast.success("Request swept away! The property is now out of the system.");
  };

  return (
    <div className="w-full min-h-screen bg-[#EEF6FB] dark:bg-[#001118]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Title */}
       <div className="text-center sm:text-left">

         <h1 className="text-xl sm:text-3xl font-bold text-[#283655] dark:text-[#597695]">
          Listing Request Management
        </h1>
        </div>
        {/* <div className="mt-3 h-px w-full bg-[#DDE9F6] dark:bg-gray-700" /> */}
 <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />

        {/* Content */}
        {loading ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-white/80 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <p className="mt-6 text-red-500">Error: {error}</p>
        ) : inactiveProjects.length === 0 ? (
          <p className="mt-6 text-gray-700 dark:text-gray-200">
            No inactive requests found.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveProjects.map((project) => (
              <div
                key={project._id}
                className="group relative rounded-2xl bg-white dark:bg-gray-800 border border-[#E6EEF8] dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all focus-within:ring-2"
              >
                <h2 className="text-base font-semibold text-[#1E1F26] dark:text-gray-100 mb-1">
                  {project.projectname || "Untitled Project"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Builder:{" "}
                  <span className="font-medium">{project.builder || "NA"}</span>
                </p>

                <p className="mt-1 text-sm">
                  <span className="font-semibold text-[#283655] dark:text-gray-100">
                    Price:
                  </span>{" "}
                  <span className="font-bold text-[#283655] dark:text-gray-100">
                    ₹
                    {typeof project.price === "number"
                      ? project.price.toLocaleString("en-IN")
                      : "0"}
                  </span>
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  BHK: {project.bhk || "-"}
                </p>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-[#283655] dark:bg-[#597695] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1F2F4F] transition "
                    onClick={() => handleAccept(project._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="inline-flex items-center justify-center text-red-500 rounded-full px-5 py-2 text-sm font-semibold bg-white dark:bg-gray-800 transition shadow-[0px_0px_1px_0px_#000000] hover:shadow-[0px_2px_3px_0px_#0000008A]   dark:hover:shadow[0px_4x_7px_0px_#0000008A]  dark:shadow-[0px_0px_1px_0px_#000000]"
                    onClick={() => handleReject(project._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InactiveRequest;
