import React from 'react';
import DataList from '../components/DataList';
import congBoService from '../services/congBoService';
import { formatDate } from '../utils/dateUtils';

const PersonalPublications = () => {
  // Define the columns for the publications table
  const columns = [
    {
      title: 'Tên công bố',
      dataIndex: 'ten',
      key: 'ten',
      ellipsis: true,
    },
    {
      title: 'Tên tạp chí',
      dataIndex: 'tenTapChi',
      key: 'tenTapChi',
      width: 180,
    },
    {
      title: 'Loại công bố',
      dataIndex: 'tenNoiDangBao',
      key: 'tenNoiDangBao',
      width: 150,
    },
    {
      title: 'Tác giả chính',
      dataIndex: 'tacGiaChinh',
      key: 'tacGiaChinh',
      width: 150,
    },
    {
      title: 'Tác giả liên hệ',
      dataIndex: 'tacGiaLienHe',
      key: 'tacGiaLienHe',
      width: 150,
    },
    {
      title: 'Ngày công bố',
      dataIndex: 'ngayCongBo',
      key: 'ngayCongBo',
      width: 120,
      render: (date) => formatDate(date),
    },
    {
      title: 'Chỉ số tác động',
      dataIndex: 'chiSoTacDong',
      key: 'chiSoTacDong',
      width: 120,
    },
  ];

  // Use the same service but with additional filtering for personal data
  const getPersonalPublications = (pageIndex, pageSize) => {
    // In a real app, this would filter by current user ID
    return congBoService.getPage(pageIndex, pageSize);
  };

  return (
    <DataList
      title="Công bố khoa học cá nhân"
      type="publications"
      scope="personal"
      serviceFunction={getPersonalPublications}
      columns={columns}
    />
  );
};

export default PersonalPublications;