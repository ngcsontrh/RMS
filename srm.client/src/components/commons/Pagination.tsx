import { Flex, Typography, Pagination as AntPagination } from 'antd';

type PaginationProps = {
    current: number;
    pageSize: number;
    total: number;
    onChange: (pageIndex: number, pageSize: number) => void;
};

export default function Pagination({ current, pageSize, total, onChange }: PaginationProps) {
    return (
        <Flex justify='space-between' align='center' style={{ marginTop: '16px' }}>
            <Typography.Text strong>
                Tổng số đề tài: {total}
            </Typography.Text>

            <AntPagination
                current={current}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                pageSizeOptions={['5', '10', '20', '50']}
                onChange={onChange}
            />
        </Flex>
    );
}