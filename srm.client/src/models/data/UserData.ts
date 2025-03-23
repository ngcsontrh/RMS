import { Gender } from "../../enums";

export interface UserData {
    id?: number | null;
    userName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    fullName?: string | null;
    code?: string | null;
    gender?: Gender | null;
    createdDate?: Date | null;
    updatedDate?: Date | null;
    donViId?: number | null;
    tenDonVi?: string | null;
    lyLichKhoaHocId?: number | null;
    quaTrinhCongTacId?: number | null;
} 