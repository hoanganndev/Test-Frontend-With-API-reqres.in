import React from "react";

const Home = () => {
    return (
        <div className="home-container">
            <div className="row">
                <div className="col-12 mt-3 ">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">🌵 đăng nhập</li>
                        <li className="list-group-item">
                            🌵 thêm,xóa,sửa user
                        </li>
                        <li className="list-group-item">
                            🌵 hiển thị tất cả user
                        </li>
                        <li className="list-group-item">
                            🌵 tìm kiếm user theo email
                        </li>
                        <li className="list-group-item">
                            🌵 sắp xếp theo id, first name
                        </li>
                        <li className="list-group-item">
                            🌵 import và export file csv
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
