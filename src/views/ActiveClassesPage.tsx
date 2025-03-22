import React, { useState } from "react";
import "../styles/ActiveClassesPage.css";

const ActiveClassesPage = () => {
  // Dữ liệu mẫu cứng
  const [classes] = useState([
    {
      id: 1,
      template_name: "Yoga cơ bản",
      coach_name: "Nguyễn Văn A",
      start_time: "2025-03-22T08:00:00Z",
      end_time: "2025-03-22T09:00:00Z",
      max_participants: 20,
    },
    {
      id: 2,
      template_name: "Zumba nâng cao",
      coach_name: "Lê Thị B",
      start_time: "2025-03-22T10:00:00Z",
      end_time: "2025-03-22T11:30:00Z",
      max_participants: 25,
    },
    {
      id: 3,
      template_name: "Pilates chuyên sâu",
      coach_name: "Phạm Văn C",
      start_time: "2025-03-22T14:00:00Z",
      end_time: "2025-03-22T15:30:00Z",
      max_participants: 15,
    },
  ]);

  return (
    <div className="active-classes-container">
      <h1>Danh sách lớp học đang hoạt động</h1>
      <table className="active-classes-table">
        <thead>
          <tr>
            <th>Tên lớp học</th>
            <th>Huấn luyện viên</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Số lượng tối đa</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.template_name}</td>
              <td>{classItem.coach_name}</td>
              <td>{new Date(classItem.start_time).toLocaleString()}</td>
              <td>{new Date(classItem.end_time).toLocaleString()}</td>
              <td>{classItem.max_participants}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveClassesPage;
