import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataDetail from './DataDetail';
import congBoService from '../services/congBoService';
import noiDangBaoService from '../services/noiDangBaoService';
import thanhQuaService from '../services/thanhQuaService';

const PublicationDetail = () => {
  const { scope } = useParams(); // personal or school
  const [noiDangBaoOptions, setNoiDangBaoOptions] = useState([]);
  const [thanhQuaOptions, setThanhQuaOptions] = useState([]);
  
  // Fetch dropdown options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch publication venues
        const noiDangBaoResponse = await noiDangBaoService.getList();
        const noiDangBaoData = noiDangBaoResponse.data.map(item => ({
          value: item.id,
          label: item.ten
        }));
        setNoiDangBaoOptions(noiDangBaoData);
        
        // Fetch achievement types
        const thanhQuaResponse = await thanhQuaService.getList();
        const thanhQuaData = thanhQuaResponse.data.map(item => ({
          value: item.id,
          label: item.ten
        }));
        setThanhQuaOptions(thanhQuaData);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    
    fetchOptions();
  }, []);
  
  // Define the form fields for the publication
  const formFields = [
    {
      name: 'ten',
      label: 'Tên công bố',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên công bố!' }]
    },
    {
      name: 'noiDangBaoId',
      label: 'Loại công bố/Nơi đăng báo',
      type: 'select',
      options: noiDangBaoOptions,
      rules: [{ required: true, message: 'Vui lòng chọn loại công bố!' }]
    },
    {
      name: 'tenTapChi',
      label: 'Tên tạp chí',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên tạp chí!' }]
    },
    {
      name: 'tacGiaChinh',
      label: 'Tác giả chính',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên tác giả chính!' }]
    },
    {
      name: 'tacGiaLienHe',
      label: 'Tác giả liên hệ',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên tác giả liên hệ!' }]
    },
    {
      name: 'dongTacGias',
      label: 'Đồng tác giả',
      type: 'textarea',
      rules: []
    },
    {
      name: 'ngayGuiDang',
      label: 'Ngày gửi đăng',
      type: 'date',
      rules: [{ required: true, message: 'Vui lòng chọn ngày gửi đăng!' }]
    },
    {
      name: 'ngayCongBo',
      label: 'Ngày công bố',
      type: 'date',
      rules: [{ required: true, message: 'Vui lòng chọn ngày công bố!' }]
    },
    {
      name: 'nhaXuatBan',
      label: 'Nhà xuất bản',
      type: 'text',
      rules: []
    },
    {
      name: 'tap',
      label: 'Tập',
      type: 'number',
      rules: []
    },
    {
      name: 'ky',
      label: 'Kỳ',
      type: 'number',
      rules: []
    },
    {
      name: 'trang',
      label: 'Trang',
      type: 'text',
      rules: []
    },
    {
      name: 'chiSoTacDong',
      label: 'Chỉ số tác động',
      type: 'number',
      rules: []
    },
    {
      name: 'loaiQ',
      label: 'Loại Q',
      type: 'text',
      rules: []
    },
    {
      name: 'thanhQuaId',
      label: 'Thành quả',
      type: 'select',
      options: thanhQuaOptions,
      rules: []
    },
    {
      name: 'diemHoiDong',
      label: 'Điểm hội đồng',
      type: 'number',
      rules: []
    },
    {
      name: 'tenHoiDong',
      label: 'Tên hội đồng',
      type: 'text',
      rules: []
    },
    {
      name: 'linkBaiBao',
      label: 'Link bài báo',
      type: 'text',
      rules: []
    },
    {
      name: 'linkMinhChungTapChi',
      label: 'Link minh chứng tạp chí',
      type: 'text',
      rules: []
    },
    {
      name: 'linkMinhChungLoaiQ',
      label: 'Link minh chứng loại Q',
      type: 'text',
      rules: []
    },
    {
      name: 'loaiHoTroChiPhi',
      label: 'Loại hỗ trợ chi phí',
      type: 'text',
      rules: []
    },
    {
      name: 'phanChiaSuDongGop',
      label: 'Phân chia sự đóng góp',
      type: 'textarea',
      rules: []
    }
  ];
  
  // Determine the back path based on whether it's personal or school
  const backPath = `/${scope}/publications`;
  
  return (
    <DataDetail
      title="công bố khoa học"
      backPath={backPath}
      fetchFunction={congBoService.getById}
      saveFunction={id => id ? congBoService.update : congBoService.add}
      formFields={formFields}
    />
  );
};

export default PublicationDetail;