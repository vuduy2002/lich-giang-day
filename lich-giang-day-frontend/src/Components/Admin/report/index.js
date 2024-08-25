import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { getEventById } from '../../../services/eventService';
import { getLecturers } from '../../../services/lectureService';
import { getAttendanceReportById } from '../../../services/attendanceService';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { convertFromYYYYMMDD } from '../../formatDate';

const ShowReport = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [lectures, setLectures] = useState([]);

  const location = useLocation();
  const eventId = location.state;

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await getEventById(eventId);
      setEventDetails(response1.data);

      const response2 = await getAttendanceReportById(eventId);
      setParticipants(response2.data.lecturers);

      const response3 = await getLecturers();
      setLectures(response3.data);
    };
    fetchData();
  }, [eventId]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const renderHosts = (arr) => {
    return arr.map((item) => `${item.lecturerName} (${item.lecturerId}), `);
  };

  const renderAttendanceStatus = (confirm) => {
    if (confirm === 'chưa phản hồi!') return 'Chưa phản hồi!';
    return confirm ? 'Có' : 'Không';
  };

  // get name to render participan report
  const getLecturerName = (lecturerId) => {
    const lecturer = lectures.find((lecture) => lecture.lecturerId === lecturerId);
    return lecturer ? lecturer.lecturerName : 'Tên không tồn tại';
  };

  console.log(participants)

  return (
    <Box sx={{ padding: 4 }}>
      <div style={{ cursor: 'pointer' }} onClick={() => window.history.back()}>
        <FontAwesomeIcon icon={faChevronLeft} /> Quay lại
      </div>
      <Box>
        <Typography variant="h3" gutterBottom sx={{ marginTop: 3 }}>
          Event Report
        </Typography>
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          {eventDetails.eventName}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <strong>EventId:</strong> {eventDetails.eventId}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <strong>Mô tả:</strong> {eventDetails.eventDescription}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <strong>Ngày:</strong> {convertFromYYYYMMDD(eventDetails.date)}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <strong>Thời gian:</strong> {eventDetails.timeStart} - {eventDetails.timeEnd}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <strong>Địa điểm:</strong> {eventDetails.eventLocation?.locationName || <span style={{ color: 'red' }}>'Dữ liệu đã bị chỉnh sửa hoặc xóa!'</span>}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <strong>Loại sự kiện:</strong> {eventDetails.eventType?.typeName || <span style={{ color: 'red' }}>'Dữ liệu đã bị chỉnh sửa hoặc xóa!'</span>}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          <strong>Người chủ trì:</strong> {renderHosts(eventDetails.host)}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 2 }}>
          <strong>Thành viên:</strong>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Id</TableCell>
                <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Tên</TableCell>
                <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Tham gia</TableCell>
                <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Lý do không tham gia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.lecturerId}>
                  <TableCell sx={{ fontSize: '1.4rem' }}>{participant.lecturerId}</TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>{getLecturerName(participant.lecturerId)}</TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>{renderAttendanceStatus(participant.confirm)}</TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>{participant.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ShowReport;
