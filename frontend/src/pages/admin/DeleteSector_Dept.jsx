import React, { useEffect, useState } from "react";
import MakeApiRequest from "../../Functions/AxiosApi";
import config from "../../Functions/config";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import Cookies from "js-cookie";
import BeatLoader from "react-spinners/BeatLoader";
import { useParams } from "react-router-dom";
import Adminsidebar from "../../components/navbars/Adminsidebar";
import AdminNav from "../../components/navbars/Adminnav";
import { BiCategory } from "react-icons/bi";

function DeleteSector_Dept() {
  const token = Cookies.get("token");
  const { id } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [companySector, setCompanySector] = useState([]);
  const [companyDepartments, setCompanyDepartments] = useState([]);
  const [selectedSectorToDelete, setSelectedSectorToDelete] = useState([]);
  const [selectedDeptToDelete, setSelectedDeptToDelete] = useState([]);
  const [message, setMessage] = useState("");
  const [sectorMessage, setSectorMessage] = useState("");
  const [deptMessage, setDeptMessage] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    Getdepartment();
    Getsector();
  }, []);

  const Getsector = () => {
    MakeApiRequest(
      "get",
      `${config.baseUrl}company/getcompanysector/`,
      {},
      {},
      {}
    )
      .then((response) => {
        console.log("Sectorall", response);
        setCompanySector(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          console.log(
            "Unauthorized access. Token might be expired or invalid."
          );
        } else {
          console.error("Unexpected error occurred:", error);
        }
      });
  };

  const Getdepartment = () => {
    MakeApiRequest(
      "get",
      `${config.baseUrl}company/getdepartments/`,
      {},
      {},
      {}
    )
      .then((response) => {
        console.log("departmentsall", response);
        setCompanyDepartments(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          console.log(
            "Unauthorized access. Token might be expired or invalid."
          );
        } else {
          console.error("Unexpected error occurred:", error);
        }
      });
  };

  const handleCheckboxChangesector = (sector) => {
    setSelectedSectorToDelete((prevSelected) => {
      if (prevSelected.includes(sector)) {
        return prevSelected.filter((d) => d !== sector);
      } else {
        return [...prevSelected, sector];
      }
    });
  };

  const handleDeletesector = (e) => {
    e.preventDefault();

    if (selectedSectorToDelete.length === 0) {
      setSectorMessage("No changes detected in sector");
      setTimeout(() => {
        setSectorMessage("");
      }, 2000);
      return;
    }

    selectedSectorToDelete.forEach((sector) => {
      const data = {
        sector: sector.sector_name,
      };

      MakeApiRequest(
        "delete",
        `${config.baseUrl}company/getcompanysector/`,
        headers,
        {},
        data
      )
        .then((response) => {
            setSectorMessage("Sector Deleted successfully");
          setSelectedSectorToDelete([]);
          Getsector();
          setTimeout(() => {
            setSectorMessage("");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response && error.response.status === 401) {
            console.log(
              "Unauthorized access. Token might be expired or invalid."
            );
          } else {
            console.error("Unexpected error occurred:", error);
          }
        });
    });
  };

  const handleCheckboxChangedept = (dept) => {
    setSelectedDeptToDelete((prevSelected) => {
      if (prevSelected.includes(dept)) {
        return prevSelected.filter((d) => d !== dept);
      } else {
        return [...prevSelected, dept];
      }
    });
  };

  const handleDeletedepartment = (e) => {
    e.preventDefault();

    if (selectedDeptToDelete.length === 0) {
      setDeptMessage("No changes detected in dept");
      setTimeout(() => {
        setDeptMessage("");
      }, 2000);
      return;
    }

    selectedDeptToDelete.forEach((dept) => {
      const data = {
        department: dept.name,
      };

      MakeApiRequest(
        "delete",
        `${config.baseUrl}company/getdepartments/`,
        headers,
        {},
        data
      )
        .then((response) => {
            setDeptMessage("Department Deleted successfully");
          setSelectedDeptToDelete([]);
          Getdepartment();
          setTimeout(() => {
            setDeptMessage("");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response && error.response.status === 401) {
            console.log(
              "Unauthorized access. Token might be expired or invalid."
            );
          } else {
            console.error("Unexpected error occurred:", error);
          }
        });
    });
  };

  return (
    <>
      <AdminNav />
      <div className="flex min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
        <div className="md:64">
          <Adminsidebar />
        </div>
        {isloading ? (
          <div
            className="h-screen flex justify-center items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
            style={{ backgroundColor: "#EEEEEE" }}
          >
            <BeatLoader color="#6b7280" margin={1} size={50} />
          </div>
        ) : (
          <div className="flex-grow w-full min-h-screen px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">Delete Sector</h3>
                <form onSubmit={handleDeletesector}>
                  <div className="mb-4">
                    <label className="flex flex-col gap-1 text-xs mt-4">
                      Company Sectors
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {companySector.map((sector, index) => (
                          <li key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`sector-${index}`}
                              className="mr-2"
                              checked={selectedSectorToDelete.includes(sector)}
                              onChange={() =>
                                handleCheckboxChangesector(sector)
                              }
                            />
                            <label
                              htmlFor={`sector-${index}`}
                              className="text-sm font-bold"
                            >
                              {sector.sector_name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </form>
                 {sectorMessage && (
                  <div
                    className={`mt-2 ${
                      sectorMessage.includes("No changes")
                        ? "bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
                        : "bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
                    }`}
                    role="alert"
                  >
                    <span className="font-bold">
                      {sectorMessage.includes("No changes")
                        ? "Warning"
                        : "Success"}
                      :
                    </span>{" "}
                    {sectorMessage}
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">
                  Delete Department
                </h3>
                <form onSubmit={handleDeletedepartment}>
                  <div className="mb-4">
                    <label className="flex flex-col gap-1 text-xs mt-4">
                      Company Departments
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {companyDepartments.map((dept, index) => (
                          <li key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`dept-${index}`}
                              className="mr-2"
                              checked={selectedDeptToDelete.includes(dept)}
                              onChange={() => handleCheckboxChangedept(dept)}
                            />
                            <label
                              htmlFor={`dept-${index}`}
                              className="text-sm font-bold"
                            >
                              {dept.name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </form>
                {deptMessage && (
                  <div
                    className={`mt-2 ${
                      deptMessage.includes("No changes")
                        ? "bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
                        : "bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
                    }`}
                    role="alert"
                  >
                    <span className="font-bold">
                      {deptMessage.includes("No changes")
                        ? "Warning"
                        : "Success"}
                      :
                    </span>{" "}
                    {deptMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DeleteSector_Dept;
