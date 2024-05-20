import api from "./apiConfig.js";


export const addAssignmentToCourse = async (courseId) => {
  try {
    const response = await api.post(`/${courseId}/assignment/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseAssignments = async (courseId) => {
  try {
    const response = await api.get(`/${courseId}/assignments/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssignmentDetails = async (courseId, assignmentId) => {
  try {
    const response = await api.get(`/${courseId}/assignment/${assignmentId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAssignmentDetails = async (courseId, assignmentId, assignmentData) => {
  try {
    const response = await api.put(`/${courseId}/assignment/${assignmentId}/`, assignmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteAssignment = async (courseId, assignmentId) => {
  try {
    const response = await api.delete(`/${courseId}/assignment/${assignmentId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
