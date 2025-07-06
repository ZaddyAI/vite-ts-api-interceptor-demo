import { useState, useEffect } from "react";
import type { Doctor, Doctors } from "../types/doctors";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Home() {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get<Doctor>("/api/doctor/getAll");
        setDoctors(response.data.data);
      } catch (error: any) {
        if (
          error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "message" in error.response
        ) {
          setError(error.response.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchDoctor();
  }, []);

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome, User ID {userId}!
      </h1>
      <p className="text-gray-600 mb-8">Your role is: {role}</p>

      {error && (
        <p className="text-red-600 mb-6">Error fetching doctors: {error}</p>
      )}

      <h2 className="text-2xl font-semibold mb-6">Doctors List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.length === 0 && !error && (
          <p className="text-gray-500 col-span-full">No doctors found.</p>
        )}

        {doctors.map((doctor) => {
          // Get first image URL or fallback
          const imageUrl =
            doctor.Images && doctor.Images.length > 0
              ?'http://103.140.0.164:7080'+ doctor.Images[0].Url
              : "https://via.placeholder.com/150";

          return (
            <div
              key={doctor.Id}
              onClick={() => navigate(`/doctor/${doctor.Id}`)}
              className="cursor-pointer rounded-lg border border-gray-400 shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center bg-white"
              title={`${doctor.FirstName} ${doctor.LastName}`}
            >
              <img
                src={imageUrl}
                alt={`${doctor.FirstName} ${doctor.LastName}`}
                className="w-32 h-32 rounded-xl object-cover mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-bold text-center mb-1">
                {doctor.FirstName} {doctor.LastName}
              </h3>
              <p className="text-gray-600 text-center">{doctor.Specialty}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
