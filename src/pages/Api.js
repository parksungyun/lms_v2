import axios from "axios"

export const getUserByUid = async (id) => {
  let user;
  await axios
  .get(`/api/user/${id}`)
  .then((res) => {
    user = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 유저 불러오기 실패`);
  });
  return user;
}

export const getCourseById = async (id) => {
  let course;
  await axios
  .get(`/api/course/${id}`)
  .then((res) => {
    course = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과정 불러오기 실패`);
  });
  return course;
}

export const getCourseByAcademicId = async (id) => {
  let courses;
  await axios
  .get(`/api/course/academic/${id}`)
  .then((res) => {
    courses = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 매니저의 담당 과정 불러오기 실패`);
  });
  return courses;
}

export const getSubjectById = async (id) => {
  let subject;
  await axios
  .get(`/api/subject/${id}`)
  .then((res) => {
    subject = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 불러오기 실패`);
  });
  return subject;
}

export const getSubjectByAcademicId = async (id) => {
  let subjects;
  await axios
  .get(`/api/subject/academic/${id}`)
  .then((res) => {
    subjects = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 강사의 담당 과목 불러오기 실패`);
  });
  return subjects;
}

export const getSubjectByCourseId = async (id) => {
  let subjects;
  await axios
  .get(`/api/subject/course/${id}`)
  .then((res) => {
    subjects = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과정의 과목 불러오기 실패`);
  });
  return subjects;
}

export const getRecruitingCourses = async () => {
  let courses;
  await axios
  .get("/api/course/recruit")
  .then((res) => {
    console.log(res.data);
    courses = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 모집중인 과정 불러오기 실패`);
  });
  return courses;
};

export const getStudentsByCourseId = async (id) => {
  let students;
  await axios
  .get(`/api/user/students/${id}`)
  .then((res) => {
    students = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과정에 속한 학생 불러오기 실패`);
  });
  return students;
}

export const getAllTrainers = async () => {
  let trainers;
  await axios
  .get("/api/user/trainers")
  .then((res) => {
    trainers = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 모든 강사 불러오기 실패`);
  });
  return trainers;
}

export const getAllManagers = async () => {
  let managers;
  await axios
  .get("/api/user/managers")
  .then((res) => {
    managers = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 모든 매니저 불러오기 실패`);
  });
  return managers;
}

export const getAllAdmissionPosts = async () => {
  let posts;
  await axios
  .get("/api/admission/all")
  .then((res) => {
    console.log(res.data);
    posts = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 모든 입학상담 게시글 불러오기 실패`);
  });
  return posts;
}