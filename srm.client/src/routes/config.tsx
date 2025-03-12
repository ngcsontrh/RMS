import { Routes, Route } from 'react-router-dom';
import { DeTaiHome, DeTaiEdit } from '../components/DeTai';
import { DanhMucHome } from '../components/DanhMuc';
import {ThongTinCaNhanHome} from "../components/ThongTinCaNhan";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/toan-truong/de-tai" element={<DeTaiHome />} />
            <Route path="/toan-truong/cong-bo" element={<DeTaiHome />} />
            <Route path="/toan-truong/hoat-dong" element={<DeTaiHome />} />
            <Route path="/ca-nhan/de-tai" element={<DeTaiHome />} />
            <Route path="/de-tai/tao-moi" element={ <DeTaiEdit />} />
            <Route path="/de-tai/:id" element={<DeTaiEdit />} />
            <Route path="/danh-muc" element={<DanhMucHome />} />
            <Route path="/thong-tin-ca-nhan" element={<ThongTinCaNhanHome />} />
        </Routes>
    )
}

export default AppRoutes;