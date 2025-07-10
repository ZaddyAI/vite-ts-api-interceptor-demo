import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import type { DoctorDetailsData } from "../types/doctorbyid";
import ContactForm from "./ContactForm";

const DoctorDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [doctor, setDoctor] = useState<DoctorDetailsData | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await api.get<DoctorDetailsData>(`/api/doctor/${id}`);
                setDoctor(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to fetch doctor details");
            }
        };

        fetchDoctorDetails();
    }, [id]);

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    if (!doctor) {
        return <div className="p-4 text-gray-600">Loading doctor details...</div>;
    }

    const imageUrl =
        doctor.Images && doctor.Images.length > 0
            ? 'http://103.140.0.164:7080' + doctor.Images[0].Url
            : "https://via.placeholder.com/150";

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
                <div className="flex gap-6">
                    <img
                        src={imageUrl}
                        alt={`${doctor.FirstName} ${doctor.LastName}`}
                        className="w-40 h-40 object-cover rounded-lg shadow"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-blue-700">
                            Dr. {doctor.FirstName} {doctor.LastName}
                        </h1>
                        <p className="text-gray-700 mb-1">{doctor.Specialty}</p>
                        <p className="text-gray-600 text-sm italic mb-2">{doctor.Bio}</p>
                        <p className="flex gap-2 flex-wrap">
                            {doctor.AvailableDays.map((day, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                                >
                                    {day}
                                </span>
                            ))}
                        </p>

                    </div>
                </div>

            </div>

            <ContactForm />
        </>
    );
};

export default DoctorDetails;
