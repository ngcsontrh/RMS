import { Button, Result } from "antd"
import { Link } from "react-router-dom"

export default () => {
    return (
        <Result
            status="error"
            title="Có lỗi xảy ra"
            subTitle="Đã có sự cố trong quá trình thực hiện. Vui lòng thử lại sau."
            extra={[
                <Button type="primary">
                    <Link to='/'>Quay lại</Link>
                </Button>
            ]}
        />
    )
}
