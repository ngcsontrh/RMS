import { Routes, Route } from 'react-router-dom';
import { DeTaiHome, DeTaiEdit } from '../components/DeTai';
import { DanhMucHome } from '../components/DanhMuc';
import { CongBoHome, CongBoEdit } from '../components/CongBo';
import LienHe from "../components/LienHe/LienHe"
import QuyChe from "../components/QuyChe/QuyChe";
import HuongDanSuDung from '../components/HuongDanSuDung/HuongDanSuDung';
import { ThongTinCaNhanHome } from '../components/ThongTinCaNhan';
import { Unauthorized } from '../components/commons';
import { Login } from '../components/Auth';
import TrangChuHome from '../components/TrangChu/Home';
import KetQuaHome from '../components/KetQua/Home';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<TrangChuHome />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/toan-truong/de-tai" element={<DeTaiHome />} />
            <Route path="/toan-truong/de-tai/:id" element={<DeTaiEdit />} />
            <Route path="/toan-truong/cong-bo" element={<CongBoHome />} />
            {/*<Route path="/toan-truong/hoat-dong" element={<DeTaiHome />} />*/}
            <Route path="/lien-he" element={<LienHe />} />
            <Route path="/quy-che" element={<QuyChe />} />
            <Route path="/huong-dan-su-dung" element={<HuongDanSuDung />} />
            <Route path="/ca-nhan/de-tai" element={<DeTaiHome />} />
            <Route path="/ca-nhan/de-tai/:id" element={<DeTaiEdit />} />
            <Route path="/ca-nhan/cong-bo" element={<CongBoHome />} />
            <Route path="/cong-bo/tao-moi" element={<CongBoEdit />} />
            <Route path="/de-tai/tao-moi" element={<DeTaiEdit />} />
            <Route path="/danh-muc" element={<DanhMucHome />} />
            <Route path="/ket-qua" element={<KetQuaHome />} />
            <Route path="/thong-tin-ca-nhan" element={<ThongTinCaNhanHome />} />
            <Route path="/unauthorized" element={<Unauthorized />} />            
        </Routes>
    )
}

export default AppRoutes;