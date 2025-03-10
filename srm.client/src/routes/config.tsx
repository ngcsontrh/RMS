import { Routes, Route } from 'react-router-dom';
import { DeTaiHome, DeTaiEdit } from '../components/DeTai';
import { DanhMucHome } from '../components/DanhMuc';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/de-tai" element={ <DeTaiHome /> } />
            <Route path="/de-tai/tao-moi" element={ <DeTaiEdit />} />
            <Route path="/de-tai/:id" element={<DeTaiEdit />} />
            <Route path="/danh-muc" element={<DanhMucHome />} />
        </Routes>
    )
}

export default AppRoutes;