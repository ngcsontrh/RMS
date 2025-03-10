import { Routes, Route } from 'react-router-dom';
import { DeTaiHome, DeTaiEdit } from '../components/DeTai';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/de-tai" element={ <DeTaiHome /> } />
            <Route path="/de-tai/tao-moi" element={ <DeTaiEdit />} />
            <Route path="/de-tai/:id" element={ <DeTaiEdit />} />
        </Routes>
    )
}

export default AppRoutes;