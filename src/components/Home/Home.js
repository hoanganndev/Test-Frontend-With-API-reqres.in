import React from "react";

const Home = () => {
    return (
        <div className="home-container">
            <div className="row">
                <div className="col-12 mt-3 ">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">🌵 Login,Logout</li>
                        <li className="list-group-item">
                            🌵 Authen user when reload page
                        </li>
                        <li className="list-group-item">🌵 CRUD user</li>
                        <li className="list-group-item">
                            🌵 Display users by pagination
                        </li>
                        <li className="list-group-item">
                            🌵 Search users by email
                        </li>
                        <li className="list-group-item">
                            🌵 sort by id, email
                        </li>
                        <li className="list-group-item">
                            🌵 Import and export file csv
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
