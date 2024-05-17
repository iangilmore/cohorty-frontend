import api from "./apiConfig.js";

export const getStudentDetails = async (courseId, studentId) => {
  try {
    const response = await api.get(`/${courseId}/student/${studentId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseStudents = async (courseId) => {
  try {
    const response = await api.get(`/${courseId}/students/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudentDetails = async (courseId, studentId, studentData) => {
  try {
    const response = await api.put(`/${courseId}/student/${studentId}/`, studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
}


