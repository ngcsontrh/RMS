import { Button, Result } from "antd"
import { Link } from "react-router-dom"

export default ({ message = "Đã có sự cố trong quá trình thực hiện. Vui lòng thử lại sau" }) => {
    return (
        <Result
            status="error"
            title="Có lỗi xảy ra"
            subTitle={message}
            extra={[
                <Button type="primary">
                    <Link to='/'>Quay lại trang chủ</Link>
                </Button>
            ]}
        />
    )
}
