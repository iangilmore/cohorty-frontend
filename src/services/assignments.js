import api from "./apiConfig.js";


// export const addAssignmentToCourse = async (courseId) => {
//   try {
//     const response = await api.post(`/courses/${courseId}/assignments/`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const addAssignmentToCourse = async (courseId, assignmentData) => {
  try {
    const response = await api.post(`/courses/${courseId}/assignments/`, assignmentData); // Add trailing slash
    return response.data;
  } catch (error) {
    console.error('Error in addAssignmentToCourse:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCourseAssignments = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}/assignments/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssignmentDetails = async (courseId, assignmentId) => {
  try {
    const response = await api.get(`/courses/${courseId}/assignments/${assignmentId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAssignmentDetails = async (courseId, assignmentId, assignmentData) => {
  try {
    const response = await api.put(`/courses/${courseId}/assignments/${assignmentId}/`, assignmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteAssignment = async (courseId, assignmentId) => {
  try {
    const response = await api.delete(`/courses/${courseId}/assignments/${assignmentId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
