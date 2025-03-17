import { Button, Result } from "antd"
import { Link } from "react-router-dom"

export default () => {
    return (
        <Result        
            status="error"
            title="Truy cập bị từ chối"
            subTitle="Bạn không có quyền thực hiện hành động này. Vui lòng kiểm tra lại quyền hạn của mình"
            extra={[
                <Button type="primary">
                    <Link to='/'>Quay lại trang chủ</Link>
                </Button>
            ]}
        />
    )
}
