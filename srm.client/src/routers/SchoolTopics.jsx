import React from 'react';
import DataList from '../components/DataList';
import deTaiService from '../services/deTaiService';
import { formatDate } from '../utils/dateUtils';

const SchoolTopics = () => {
  // Define the columns for the research topics table
  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'maSo',
      key: 'maSo',
      width: 120,
    },
    {
      title: 'Tên đề tài',
      dataIndex: 'ten',
      key: 'ten',
      ellipsis: true,
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'chuNhiem',
      key: 'chuNhiem',
      width: 180,
    },
    {
      title: 'Cấp đề tài',
      dataIndex: 'tenCapDeTai',
      key: 'tenCapDeTai',
      width: 150,
    },
    {
      title: 'Đơn vị chủ trì',
      dataIndex: 'tenDonViChuTri',
      key: 'tenDonViChuTri',
      width: 180,
    },
    {
      title: 'Thời gian thực hiện',
      key: 'thoiGian',
      width: 180,
      render: (_, record) => {
        const ngayBatDau = formatDate(record.ngayBatDau);
        const ngayKetThuc = formatDate(record.ngayKetThuc);
        return `${ngayBatDau} - ${ngayKetThuc}`;
      },
    },
    {
      title: 'Kinh phí',
      dataIndex: 'tongKinhPhi',
      key: 'tongKinhPhi',
      width: 120,
      render: (tongKinhPhi) => tongKinhPhi ? `${tongKinhPhi.toLocaleString()} VNĐ` : '',
    },
  ];

  return (
    <DataList
      title="Đề tài nghiên cứu toàn trường"
      type="topics"
      scope="school"
      serviceFunction={deTaiService.getPage}
      columns={columns}
    />
  );
};

export default SchoolTopics;