import type { AvailableTime, Image } from "./shared";

export interface DoctorDetailsData {
    Id:             number;
    FirstName:      string;
    LastName:       string;
    Gender:         string;
    PhoneNumber:    string;
    Email:          string;
    Password:       null;
    Bio:            string;
    Specialty:      string;
    Experience:     string;
    IsFeatured:     boolean;
    Images:         Image[];
    AvailableDays:  string[];
    AvailableTimes: AvailableTime[];
    DateOfBirth:    Date;
}
