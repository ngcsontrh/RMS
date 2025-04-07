import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import DataDetail from '../components/DataDetail';
import deTaiService from '../services/deTaiService';
import capDeTaiService from '../services/capDeTaiService';
import donViChuTriService from '../services/donViChuTriService';

const TopicDetail = () => {
  const { scope } = useParams(); // personal or school
  const [capDeTaiOptions, setCapDeTaiOptions] = useState([]);
  const [donViChuTriOptions, setDonViChuTriOptions] = useState([]);
  
  // Fetch dropdown options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch research levels
        const capDeTaiResponse = await capDeTaiService.getList();
        const capDeTaiData = capDeTaiResponse.data.map(item => ({
          value: item.id,
          label: item.ten
        }));
        setCapDeTaiOptions(capDeTaiData);
        
        // Fetch leading organizations
        const donViChuTriResponse = await donViChuTriService.getList();
        const donViChuTriData = donViChuTriResponse.data.map(item => ({
          value: item.id,
          label: item.ten
        }));
        setDonViChuTriOptions(donViChuTriData);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    
    fetchOptions();
  }, []);
  
  // Define the form fields for the research topic
  const formFields = [
    {
      name: 'maSo',
      label: 'Mã số',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập mã số!' }]
    },
    {
      name: 'ten',
      label: 'Tên đề tài',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên đề tài!' }]
    },
    {
      name: 'capDeTaiId',
      label: 'Cấp đề tài',
      type: 'select',
      options: capDeTaiOptions,
      rules: [{ required: true, message: 'Vui lòng chọn cấp đề tài!' }]
    },
    {
      name: 'donViChuTriId',
      label: 'Đơn vị chủ trì',
      type: 'select',
      options: donViChuTriOptions,
      rules: [{ required: true, message: 'Vui lòng chọn đơn vị chủ trì!' }]
    },
    {
      name: 'chuNhiem',
      label: 'Chủ nhiệm',
      type: 'text',
      rules: [{ required: true, message: 'Vui lòng nhập tên chủ nhiệm!' }]
    },
    {
      name: 'canBoThamGias',
      label: 'Cán bộ tham gia',
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
      rules: [{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]
    },
    {
      name: 'mucTieu',
      label: 'Mục tiêu',
      type: 'textarea',
      rules: []
    },
    {
      name: 'noiDung',
      label: 'Nội dung',
      type: 'textarea',
      rules: []
    },
    {
      name: 'tongKinhPhi',
      label: 'Tổng kinh phí (VNĐ)',
      type: 'number',
      rules: [{ required: true, message: 'Vui lòng nhập tổng kinh phí!' }]
    },
    {
      name: 'kinhPhiHangNam',
      label: 'Kinh phí hàng năm (VNĐ)',
      type: 'number',
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
  const backPath = `/${scope}/topics`;
  
  return (
    <DataDetail
      title="đề tài nghiên cứu"
      backPath={backPath}
      fetchFunction={deTaiService.getById}
      saveFunction={id => id ? deTaiService.update : deTaiService.add}
      formFields={formFields}
    />
  );
};

export default TopicDetail;