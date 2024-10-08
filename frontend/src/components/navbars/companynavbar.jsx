import { useNavigate, Link, useLocation } from "react-router-dom";
import MakeApiRequest from "../../Functions/AxiosApi";
import config from "../../Functions/config";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState, useRef } from "react";
import ProfileContext from "../../context/ProfileContext";
import { FiLayout } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";


function CompanyNavbar() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [notifications, setNotifications] = useState({
    notification: [],
    unreadnotificationcount: 0,
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userdetails = JSON.parse(localStorage.getItem("user"));
  const navigatee = useNavigate();
  const path = useLocation().pathname;
  const token = Cookies.get("token");
  const dropdownRef = useRef(null);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigatee("/");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  const fetchNotifications = () => {
    const params = {
      user_id: userdetails.id,
    };

    MakeApiRequest(
      "get",
      `${config.baseUrl}company/getallcompanynotification/`,
      {},
      params,
      {}
    )
      .then((response) => {
        console.log("companynotification", response);
        setNotifications({
            notification: response.notification,
            unreadnotificationcount: response.unreadnotificationcount,
          });
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

  useEffect(() => {
    const params = {
      user_id: userdetails.id,
    };

    MakeApiRequest(
      "get",
      `${config.baseUrl}company/companyprofileview/`,
      headers,
      params,
      {}
    )
      .then((response) => {
        console.log("Comapnydetails", response);
        setProfile(response);
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

    fetchNotifications();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const readed = (notificationId) => {
    const params = {
      notificationid: notificationId,
    };

    MakeApiRequest(
      "put",
      `${config.baseUrl}adminn/notificationn_readed/`,
      headers,
      params,
      {}
    )
      .then((response) => {
        console.log(response);
        fetchNotifications()
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

  const deletenotification = (notificationId) => {
    const params = {
      notificationid: notificationId,
    };

    MakeApiRequest(
      "delete",
      `${config.baseUrl}adminn/deletenotification/`,
      headers,
      params,
      {}
    )
      .then((response) => {
        console.log(response);
        fetchNotifications();
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

  return (
    <>
      <div>
        <header
          className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full  border-b border-gray-700 text-sm py-2.5 sm:py-4 dark:bg-neutral-950 dark:border-neutral-700"
          style={{ backgroundColor: "#A91D3A" }}
        >
          <nav
            className="max-w-7xl flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8"
            aria-label="Global"
          >
            <div className="me-5 md:me-8 flex">
              <Link
                to="/employer/employersearch"
                className="flex-none text-xl font-semibold text-white"
                href="#"
                aria-label="Brand"
              >
                Job Portal
              </Link>
            </div>

            <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
              <div className="hidden mx-auto sm:block"></div>

              <div className="flex flex-row items-center justify-end gap-2">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full text-white hover:bg-white/20 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </button>
                  <div className="absolute left-5 bottom-5 w-4 h-4 flex justify-center items-center bg-red-500 rounded-full">
                    <span className="text-sm text-white p-1">
                      {notifications.unreadnotificationcount}
                    </span>
                  </div>
                  {dropdownVisible && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 text-gray-700 font-semibold">
                        Notifications
                      </div>
                      <div className="max-h-60 p-3 overflow-y-auto">
                        {notifications.notification.length > 0 ? (
                          notifications.notification.map((notification, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                readed(notification.id);
                              }}
                              className={`px-4 py-4 mb-2 rounded-md border-b last:border-b-0 text-black flex  justify-between items-center ${
                                notification.isread ? "bg-white" : "bg-blue-200"
                              }`}
                            >
                              {notification.message}
                              <div className="focus:outline-none cursor-pointer flex  justify-end" onClick={() => {
                                    deletenotification(notification.id);
                                  }}>
                                    
                                <svg
                                  onClick={() => {
                                    deletenotification(notification.id);
                                  }}
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.5 3.5L3.5 10.5"
                                    stroke="#4B5563"
                                    strokeWidth="1.25"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.5 3.5L10.5 10.5"
                                    stroke="#4B5563"
                                    strokeWidth="1.25"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-600">
                            No notifications
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="hs-dropdown relative inline-flex"
                  data-hs-dropdown-placement="bottom-right"
                >
                  <button
                    id="hs-dropdown-with-header"
                    type="button"
                    className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full text-white hover:bg-white/20 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600"
                  >
                    <img
                      className="inline-block size-[38px] rounded-full"
                      src={`${config.imagebaseurl}${profile.profile_image}`}
                      alt={profile.companyname}
                    />
                  </button>

                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 z-10 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                    aria-labelledby="hs-dropdown-with-header"
                  >
                    <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
                      <p className="text-sm text-gray-500 dark:text-neutral-400">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">
                        {userdetails.email}
                      </p>
                    </div>
                    <div className="mt-2 py-2 first:pt-0 last:pb-0">
                      <Link
                        to="/employer/employerprofile"
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Profile
                      </Link>
                      <Link
                        to="/employer/departments_sectors"
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                        href="#"
                      >
                        <FiLayout />
                        Depts&Sectors
                      </Link>
                      <a
                        onClick={handleLogout}
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                          <path d="M12 12v9" />
                          <path d="m8 17 4 4 4-4" />
                        </svg>
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main id="content">
          <nav
            className="sticky -top-px bg-white text-sm font-medium text-black ring-1 ring-gray-900 ring-opacity-5 border-t shadow-sm shadow-gray-100 pt-6 md:pb-6 -mt-px dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70"
            aria-label="Jump links"
          >
            <div className="max-w-7xl snap-x w-full flex items-center overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 md:pb-0 mx-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900">
              <div className="snap-center shrink-0 pe-5 sm:pe-8 sm:last-pe-0">
                <Link
                  to="/employer/employersearch"
                  //   onClick={()=>{setActiveComponent('companysearch')}}
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-neutral-400 dark:hover:text-neutral-500"
                  href="#"
                >
                  Home
                </Link>
              </div>
              <div className="snap-center shrink-0 pe-5 sm:pe-8 sm:last:pe-0">
                <Link
                  to="/employer/postjob"
                  // onClick={()=>{setActiveComponent('postjob')}}
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-neutral-400 dark:hover:text-neutral-500"
                  href="#"
                >
                  Post Jobs
                </Link>
              </div>
              <div className="snap-center shrink-0 pe-5 sm:pe-8 sm:last:pe-0">
                <Link
                  to="/employer/myjobs"
                  //   onClick={()=>{setActiveComponent('myjobs')}}
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-neutral-400 dark:hover:text-neutral-500"
                  href="#"
                >
                  My Job
                </Link>
              </div>
            </div>
          </nav>
        </main>
      </div>
    </>
  );
}

export default CompanyNavbar;
