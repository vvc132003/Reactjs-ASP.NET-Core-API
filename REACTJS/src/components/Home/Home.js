import Table from 'react-bootstrap/Table';

const Home = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tên khách hàng</th>
                                <th>Ngày đặt</th>
                                <th>Ngày dự kiến trả</th>
                                <th>Loại hình thuê</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Võ Văn Chính</td>
                                <td>22/05/2024</td>
                                <td>23/05/2024</td>
                                <td>Theo ngày</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-6">haha</div>
            </div>
        </div>
    )
}
export default Home;