import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataDetail from './DataDetail';
import hoatDongService from '../services/hoatDongService';
import loaiHoatDongService from '../services/loaiHoatDongService';

const ActivityDetail = () => {
  const { scope } = useParams(); // personal or school
  const [loaiHoatDongOptions, setLoaiHoatDongOptions] = useState([]);
  
  // Fetch dropdown options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch activity types
        const loaiHoatDongResponse = await loaiHoatDongService.getList();
        const loaiHoatDongData = loaiHoatDongResponse.data.map(item => ({
          value: item.id,
          label: item.ten
        }));
        setLoaiHoatDongOptions(loaiHoatDongData);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    
    fetchOptions();
  }, []);
  
  // Define the form fields for the activity
  const formFields = [
    {
      name: 'ten',
      label: 'Tên hoạt động',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên hoạt động!' }]
    },
    {
      name: 'loaiHoatDongId',
      label: 'Loại hoạt động',
      type: 'select',
      options: loaiHoatDongOptions,
      rules: [{ required: true, message: 'Vui lòng chọn loại hoạt động!' }]
    },
    {
      name: 'chuNhiem',
      label: 'Chủ nhiệm',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên chủ nhiệm!' }]
    },
    {
      name: 'thanhVienThamGias',
      label: 'Thành viên tham gia',
      type: 'textarea',
      rules: []
    },
    {
      name: 'ngayBatDau',
      label: 'Ngày bắt đầu',
      type: 'date',
      rules: [{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]
    },
    {
      name: 'ngayKetThuc',
      label: 'Ngày kết thúc',
      type: 'date',
      rules: []
    },
    {
      name: 'noiDung',
      label: 'Nội dung',
      type: 'textarea',
      rules: []
    },
    {
      name: 'diaChi',
      label: 'Địa chỉ',
      type: 'text',
      rules: []
    },
    {
      name: 'kinhPhi',
      label: 'Kinh phí (VNĐ)',
      type: 'number',
      rules: []
    },
    {
      name: 'soTiet',
      label: 'Số tiết',
      type: 'number',
      rules: []
    },
    {
      name: 'soTrang',
      label: 'Số trang',
      type: 'number',
      rules: []
    },
    {
      name: 'duongDan',
      label: 'Đường dẫn',
      type: 'text',
      rules: []
    },
    {
      name: 'ghiChu',
      label: 'Ghi chú',
      type: 'textarea',
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
  const backPath = `/${scope}/other-activities`;
  
  return (
    <DataDetail
      title="hoạt động khác"
      backPath={backPath}
      fetchFunction={hoatDongService.getById}
      saveFunction={id => id ? hoatDongService.update : hoatDongService.add}
      formFields={formFields}
    />
  );
};

export default ActivityDetail;