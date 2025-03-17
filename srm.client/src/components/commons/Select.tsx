import { Select as AntdSelect } from 'antd';
import { Form } from 'antd';

// Define a generic type for the data items
interface ItemType<T> {
    value: T;
    label: string;
}

// Props interface with generic type T for the id
interface SelectProps<T> {
    multiple?: boolean;
    dataSource: ItemType<T>[];
}

const Select = <T extends string | number>({
    multiple = false,
    dataSource,
}: SelectProps<T>) => {
    return (
        <Form.Item
            name="capDeTaiId"
            label="Cấp đề tài"
            rules={[{ required: true, message: 'Vui lòng chọn cấp đề tài!' }]}
        >
            <AntdSelect
                showSearch
                placeholder="Chọn hoặc nhập cấp đề tài"
                allowClear
                mode="tags" // Always use tags mode
                maxTagCount={multiple ? 'responsive' : 1} // Limit to 1 tag when multiple is false
                filterOption={(input, option) =>
                    option?.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                }
                onChange={(value: T[]) => {
                    if (!multiple && value.length > 1) {
                        // When multiple is false, keep only the last selected value
                        return value.slice(-1); // Returns array with single value
                    }
                    return value;
                }}
            >
                {dataSource.map((item, index) => (
                    <AntdSelect.Option
                        key={index}
                        value={item.value}
                    >
                        {item.label}
                    </AntdSelect.Option>
                ))}
            </AntdSelect>
        </Form.Item>
    );
};

export default Select;