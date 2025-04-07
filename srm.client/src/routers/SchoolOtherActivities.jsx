import React from 'react';
import DataList from '../components/DataList';
import hoatDongService from '../services/hoatDongService';
import { formatDate } from '../utils/dateUtils';

const SchoolOtherActivities = () => {
  // Define the columns for the activities table
  const columns = [
    {
      title: 'Tên hoạt động',
      dataIndex: 'ten',
      key: 'ten',
      ellipsis: true,
    },
    {
      title: 'Loại hoạt động',
      dataIndex: 'tenLoaiHoatDong',
      key: 'tenLoaiHoatDong',
      width: 180,
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'chuNhiem',
      key: 'chuNhiem',
      width: 180,
    },
    {
      title: 'Thời gian',
      key: 'thoiGian',
      width: 180,
      render: (_, record) => {
        const ngayBatDau = formatDate(record.ngayBatDau);
        const ngayKetThuc = formatDate(record.ngayKetThuc);
        return ngayBatDau && ngayKetThuc ? `${ngayBatDau} - ${ngayKetThuc}` : '';
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Kinh phí',
      dataIndex: 'kinhPhi',
      key: 'kinhPhi',
      width: 120,
      render: (kinhPhi) => kinhPhi ? `${kinhPhi.toLocaleString()} VNĐ` : '',
    },
  ];

  return (
    <DataList
      title="Hoạt động khác toàn trường"
      type="other-activities"
      scope="school"
      serviceFunction={hoatDongService.getPage}
      columns={columns}
    />
  );
};

export default SchoolOtherActivities;