import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  DatePicker, 
  InputNumber, 
  Select, 
  message, 
  Divider, 
  Space,
  Spin
} from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

/**
 * Generic detail form component for displaying and editing entity details
 * @param {Object} props Component props
 * @param {string} props.title Title for the form
 * @param {string} props.backPath Path to return to when clicking back
 * @param {Function} props.fetchFunction Function to fetch entity details
 * @param {Function} props.saveFunction Function to save entity details
 * @param {Array} props.formFields Array of form field configurations
 * @param {Function} props.initialDataFormatter Function to format initial data
 */
const DataDetail = ({ 
  title, 
  backPath, 
  fetchFunction, 
  saveFunction, 
  formFields,
  initialDataFormatter = (data) => data
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const { id, mode } = useParams();
  const navigate = useNavigate();
  
  // Determine if we're in view-only mode
  useEffect(() => {
    if (id && !mode) {
      setIsViewMode(true);
    } else {
      setIsViewMode(false);
    }
  }, [id, mode]);

  // Fetch data if editing or viewing existing entity
  useEffect(() => {
    const fetchData = async () => {
      if (id && id !== 'new') {
        setLoading(true);
        try {
          const response = await fetchFunction(id);
          const formattedData = initialDataFormatter(response.data);
          
          // Format dates
          Object.keys(formattedData).forEach(key => {
            if (formattedData[key] && 
                (key === 'ngayBatDau' || key === 'ngayKetThuc' || key === 'ngayGuiDang' || 
                 key === 'ngayCongBo' || key === 'ngaySinh' || key.includes('ngay'))) {
              formattedData[key] = dayjs(formattedData[key]);
            }
          });
          
          form.setFieldsValue(formattedData);
        } catch (error) {
          console.error('Error fetching data:', error);
          message.error('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchData();
  }, [id, fetchFunction, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Format dates
      const formattedValues = { ...values };
      Object.keys(formattedValues).forEach(key => {
        if (formattedValues[key] && formattedValues[key]._isAMomentObject) {
          formattedValues[key] = formattedValues[key].format('YYYY-MM-DD');
        }
      });
      
      // Add id if editing
      if (id && id !== 'new') {
        formattedValues.id = id;
        await saveFunction(formattedValues);
      } else {
        await saveFunction(formattedValues);
      }
      
      message.success('Lưu dữ liệu thành công!');
      navigate(backPath);
    } catch (error) {
      console.error('Error saving data:', error);
      message.error('Không thể lưu dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Navigate back to the list view
  const handleBack = () => {
    navigate(backPath);
  };

  // Render form fields based on configuration
  const renderFormFields = () => {
    return formFields.map((field, index) => {
      const { name, label, type, rules, options, ...props } = field;
      
      // Disable all fields in view mode
      const fieldProps = {
        ...props,
        disabled: isViewMode,
      };
      
      switch (type) {
        case 'text':
          return (
            <Form.Item key={index} name={name} label={label} rules={rules}>
              <Input {...fieldProps} />
            </Form.Item>
          );
        case 'textarea':
          return (
            <Form.Item key={index} name={name} label={label} rules={rules}>
              <TextArea rows={4} {...fieldProps} />
            </Form.Item>
          );
        case 'number':
          return (
            <Form.Item key={index} name={name} label={label} rules={rules}>
              <InputNumber style={{ width: '100%' }} {...fieldProps} />
            </Form.Item>
          );
        case 'date':
          return (
            <Form.Item key={index} name={name} label={label} rules={rules}>
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" {...fieldProps} />
            </Form.Item>
          );
        case 'select':
          return (
            <Form.Item key={index} name={name} label={label} rules={rules}>
              <Select {...fieldProps}>
                {options?.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
          );
        default:
          return (
            <Form.Item key={index} name={name} label={label} rules={rules}>
              <Input {...fieldProps} />
            </Form.Item>
          );
      }
    });
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ marginRight: 16 }}
          >
            Quay lại
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            {isViewMode ? `Xem ${title}` : (id === 'new' ? `Thêm mới ${title}` : `Chỉnh sửa ${title}`)}
          </Title>
        </div>
        
        <Divider />
        
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            {renderFormFields()}
            
            {!isViewMode && (
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Lưu
                </Button>
              </Form.Item>
            )}
          </Form>
        </Spin>
      </Space>
    </Card>
  );
};

export default DataDetail;