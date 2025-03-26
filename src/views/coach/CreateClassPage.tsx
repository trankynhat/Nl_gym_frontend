import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/CreateClassPage.css";

interface ScheduleItem {
  day: string;
  time: string;
}

interface Template {
  id: number;
  name: string;
}

const CreateClassPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]); // Danh sách class templates
  const [templateId, setTemplateId] = useState<string>(""); // ID của class template
  const [startDate, setStartDate] = useState<string>(""); // Ngày bắt đầu
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]); // Lịch học
  const [error, setError] = useState<string | null>(null); // Lỗi
  const [success, setSuccess] = useState<string | null>(null); // Thành công

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Hàm lấy danh sách class templates từ API
  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Bạn chưa đăng nhập!");
      }

      const response = await axios.get(
        "http://localhost:8080/api/coach/getAllTemplate",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        }
      );

      setTemplates(response.data); // Lưu danh sách templates vào state
    } catch (err: any) {
      setError(err.response?.data || "Không thể tải danh sách templates!");
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Hàm xử lý thay đổi lịch học
  const handleScheduleChange = (day: string, time: string) => {
    setSchedule((prev) => {
      const updatedSchedule = [...prev];
      const existingIndex = updatedSchedule.findIndex((s) => s.day === day);

      if (existingIndex !== -1) {
        updatedSchedule[existingIndex].time = time;
      } else {
        updatedSchedule.push({ day, time });
      }
      return updatedSchedule;
    });
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Bạn chưa đăng nhập!");
      }

      // Chuyển đổi lịch học thành chuỗi JSON
      const scheduleJson = JSON.stringify(schedule);

      // Tạo dữ liệu request
      const requestData = {
        tempclass: parseInt(templateId, 10), // Chuyển templateId thành số nguyên
        startDate,
        schedule: scheduleJson, // Gửi chuỗi JSON
      };

      // In ra dữ liệu request trước khi gửi
      console.log("Dữ liệu request được gửi đi:", requestData);

      // Gửi request đến API
      const response = await axios.post(
        `http://localhost:8080/api/coach/create-class`,
        requestData, // Gửi dữ liệu qua body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
            "Content-Type": "application/json", // Định nghĩa kiểu dữ liệu JSON
          },
        }
      );

      // Hiển thị thông báo thành công
      alert("Class đã được tạo thành công!");
      setSuccess(response.data); // Lưu thông báo thành công
      setTemplateId("");
      setStartDate("");
      setSchedule([]);
    } catch (err: any) {
      // Hiển thị thông báo lỗi
      alert(err.response?.data || "Không thể tạo class! Vui lòng thử lại.");
      setError(err.response?.data || "Không thể tạo class! Vui lòng thử lại.");
    }
  };

  return (
    <div className="create-class-container">
      <h1 className="title">Tạo Class</h1>
      <form className="create-class-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Chọn class template */}
        <div className="form-group">
          <label>Class Template</label>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
          >
            <option value="">Chọn class template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id.toString()}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày bắt đầu */}
        <div className="form-group">
          <label>Ngày bắt đầu</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        {/* Lịch học */}
        <div className="form-group">
          <label>Lịch học</label>
          {daysOfWeek.map((day) => (
            <div key={day} className="schedule-item">
              <span>{day}</span>
              <input
                type="time"
                onChange={(e) => handleScheduleChange(day, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Hiển thị lịch học đã chọn */}
        <div className="form-group">
          <label>Lịch học đã chọn</label>
          <ul className="schedule-list">
            {schedule.map((item, index) => (
              <li key={index}>
                {item.day}: {item.time}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn-submit">
          Tạo Class
        </button>
      </form>
    </div>
  );
};

export default CreateClassPage;
