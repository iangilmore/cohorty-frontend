import api from "./apiConfig.js";

export const getCourses = async () => {
  try {
    const response = await api.get("/courses/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourse = async (courseId) => {
  try {
    const response = await api.get(`/${courseId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post("/course/", courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};



