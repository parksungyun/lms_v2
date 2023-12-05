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

export const getSubjectByStudentId = async (id) => {
  let subjects;
  await axios
  .get(`/api/subject/student/${id}`)
  .then((res) => {
    subjects = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생으로 과정의 과목 불러오기 실패`);
  });
  return subjects;
}

export const getRecruitingCourses = async () => {
  let courses;
  await axios
  .get("/api/course/recruit")
  .then((res) => {
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

export const getStudentsBySubjectId = async (id) => {
  let students;
  await axios
  .get(`/api/user/students/subject/${id}`)
  .then((res) => {
    students = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목으로 과정에 속한 학생 불러오기 실패`);
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
    posts = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 모든 입학상담 게시글 불러오기 실패`);
  });
  return posts;
}

export const getAdmissionPostById = async (id) => {
  let post;
  await axios
  .get(`/api/admission/${id}`)
  .then((res) => {
    post = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 입학상담 게시글 불러오기 실패`);
  });
  return post;
}

export const getAcademicByAcademicId = async (id) => {
  let academic;
  await axios
  .get(`/api/user/academic/${id}`)
  .then((res) => {
    academic = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 사원 불러오기 실패`);
  });
  return academic;
}

export const getStudentByStudentId = async (id) => {
  let student;
  await axios
  .get(`/api/user/student/${id}`)
  .then((res) => {
    student = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생 불러오기 실패`);
  });
  return student;
}

export const getAdmissionPostsByContaining = async (keyword, type) => {
  let posts;
  await axios
  .get(`/api/admission/search/${type}/${keyword}`)
  .then((res) => {
    console.log(res.data);
    posts = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 검색된 입학상담 게시글 불러오기 실패`);
  });
  return posts;
}

export const getAllCourses = async () => {
  let courses;
  await axios
  .get("/api/course/all")
  .then((res) => {
    courses = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 모든 과정 불러오기 실패`);
  });
  return courses;
}

export const getUserByUserId = async (id) => {
  let user;
  await axios
  .get(`/api/user/search/${id}`)
  .then((res) => {
    user = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 유저 불러오기 실패`);
  });
  return user;
}

export const getCourseBoardByCourseId = async (id) => {
  let board;
  await axios
  .get(`/api/course/${id}/board`)
  .then((res) => {
    board = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과정 공지사항 불러오기 실패`);
  });
  return board;
}

export const getCourseBoardByAcademicId = async (id) => {
  let board;
  await axios
  .get(`/api/course/board/academic/${id}`)
  .then((res) => {
    board = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 작성자로 과정 공지사항 불러오기 실패`);
  });
  return board;
}

export const getCourseBoardByCourseBoardId = async (id) => {
  let post;
  await axios
  .get(`/api/course/board/${id}`)
  .then((res) => {
    post = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} 과정 공지사항 게시글 불러오기 실패`);
  });
  return post;
}

export const getCourseQnaByCourseId = async (id) => {
  let qna;
  await axios
  .get(`/api/course/${id}/qna`)
  .then((res) => {
    qna = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} 과정 QnA 불러오기 실패`);
  });
  return qna;
}

export const getCourseQnaByCourseQuestionId = async (id) => {
  let post;
  await axios
  .get(`/api/course/qna/${id}`)
  .then((res) => {
    post = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} 과정 QnA 게시글 불러오기 실패`);
  });
  return post;
}

export const getCourseQnaByStudentId = async (id) => {
  let qna;
  await axios
  .get(`/api/course/qna/student/${id}`)
  .then((res) => {
    qna = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} 학생이 작성한 과정 QnA 불러오기 실패`);
  });
  return qna;
}

export const getCourseQnaByAcademicId = async (id) => {
  let qna;
  await axios
  .get(`/api/course/qna/academic/${id}`)
  .then((res) => {
    qna = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} 매니저가 답글을 작성한 과정 QnA 불러오기 실패`);
  });
  return qna;
}

export const getSubjectBoardBySubjectId = async (id) => {
  let board;
  await axios
  .get(`/api/subject/${id}/board`)
  .then((res) => {
    board = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 공지사항 불러오기 실패`);
  });
  return board;
}

export const getSubjectBoardByAcademicId = async (id) => {
  let board;
  await axios
  .get(`/api/subject/board/academic/${id}`)
  .then((res) => {
    board = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 작성자로 과목 공지사항 불러오기 실패`);
  });
  return board;
}

export const getSubjectBoardBySubjectBoardId = async (id) => {
  let board;
  await axios
  .get(`/api/subject/board/${id}`)
  .then((res) => {
    board = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 공지사항 게시글 불러오기 실패`);
  });
  return board;
}

export const getHomeworksBySubjectId = async (id) => {
  let homeworks;
  await axios
  .get(`/api/subject/${id}/homework`)
  .then((res) => {
    homeworks = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 과제 불러오기 실패`);
  });
  return homeworks;
}

export const getHomeworksByCourseId = async (id) => {
  let homeworks;
  await axios
  .get(`/api/subject/course/${id}/homework`)
  .then((res) => {
    homeworks = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과정의 모든 과목의 과제 불러오기 실패`);
  });
  return homeworks;
}

export const getHomeworksByAcademicId = async (id) => {
  let homeworks;
  await axios
  .get(`/api/subject/homework/academic/${id}`)
  .then((res) => {
    homeworks = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 작성자로 과목 과제 불러오기 실패`);
  });
  return homeworks;
}

export const getHomeworkByHomeworkId = async (id) => {
  let post;
  await axios
  .get(`/api/subject/homework/${id}`)
  .then((res) => {
    post = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 과제 게시글 불러오기 실패`);
  });
  return post;
}

export const getLecturesBySubjectId = async (id) => {
  let lectures;
  await axios
  .get(`/api/subject/${id}/lecture`)
  .then((res) => {
    lectures = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 강의 불러오기 실패`);
  });
  return lectures;
}

export const getLecturesByAcademicId = async (id) => {
  let lectures;
  await axios
  .get(`/api/subject/lecture/academic/${id}`)
  .then((res) => {
    lectures = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 작성자로 과목 강의 불러오기 실패`);
  });
  return lectures;
}

export const getLectureByLectureId = async (id) => {
  let post;
  await axios
  .get(`/api/subject/lecture/${id}`)
  .then((res) => {
    post = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 강의 게시글 불러오기 실패`);
  });
  return post;
}

export const getSubjectQnaBySubjectId = async (id) => {
  let qna;
  await axios
  .get(`/api/subject/${id}/qna`)
  .then((res) => {
    qna = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 QnA 불러오기 실패`);
  });
  return qna;
}

export const getSubjectQnaBySubjectQuestionId = async (id) => {
  let post;
  await axios
  .get(`/api/subject/qna/${id}`)
  .then((res) => {
    post = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목 QnA 게시글 불러오기 실패`);
  });
  return post;
}

export const getSubjectQnaByStudentId = async (id) => {
  let qna;
  await axios
  .get(`/api/subject/qna/student/${id}`)
  .then((res) => {
    qna = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생이 작성한 과목 QnA 불러오기 실패`);
  });
  return qna;
}

export const getSubjectQnaByAcademicId = async (id) => {
  let qna;
  await axios
  .get(`/api/subject/qna/academic/${id}`)
  .then((res) => {
    qna = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 강사가 답글을 작성한 과목 QnA 불러오기 실패`);
  });
  return qna;
}

export const getSubmitBySubmitId = async (id) => {
  let post;
  await axios
  .get(`/api/subject/submit/${id}`)
  .then((res) => {
    post = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 제출한 과제 게시글 불러오기 실패`);
  });
  return post;
}

export const getSubmitsByHomeworkId = async (id) => {
  let homeworks;
  await axios
  .get(`/api/subject/homework/${id}/submit`)
  .then((res) => {
    homeworks = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과제의 모든 제출 불러오기 실패`);
  });
  return homeworks;
}

export const getProgressByStudentIdAndSubjectId = async (studentId, subjectId) => {
  let progress;
  await axios
  .get(`/api/subject/${subjectId}/progress/${studentId}`)
  .then((res) => {
    progress = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생의 과목별 강의 진행도 불러오기 실패`);
  });
  return progress;
}

export const getProgressByStudentId = async (studentId) => {
  let progress;
  await axios
  .get(`/api/subject/progress/${studentId}`)
  .then((res) => {
    progress = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생의 모든 과목 강의 진행도 불러오기 실패`);
  });
  return progress;
}

export const getSubmitsByStudentId = async (id) => {
  let submit;
  await axios
  .get(`/api/subject/submit/student/${id}`)
  .then((res) => {
    submit = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생이 제출한 모든 과제 불러오기 실패`);
  });
  return submit;
}

export const getStudyByStudentIdAndSubjectId = async (studentId, subjectId) => {
  let study;
  await axios
  .get(`/api/subject/${subjectId}/study/${studentId}`)
  .then((res) => {
    study = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생의 과목에 대한 모든 강의 학습 정보 불러오기 실패`);
  });
  return study;
}

export const getStudyByStudentIdAndLectureId = async (studentId, lectureId) => {
  let study;
  await axios
  .get(`/api/subject/study/${lectureId}/${studentId}`)
  .then((res) => {
    study = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생의 강의 학습 정보 불러오기 실패`);
  });
  return study;
}

export const getSubmitsByStudentIdAndSubjectId = async (studentId, subjectId) => {
  let submit;
  await axios
  .get(`/api/subject/submit/student/${studentId}/${subjectId}`)
  .then((res) => {
    submit = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생이 제출한 모든 과제(과목) 불러오기 실패`);
  });
  return submit;
}

export const getSubjectBoardBySearch = async (keyword, type, id) => {
  let posts;
  await axios
  .get(`/api/subject/${id}/board/search/${type}/${keyword}`)
  .then((res) => {
    posts = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 검색된 과목 공지 불러오기 실패`);
  });
  return posts;
}

export const getLectureBySearch = async (keyword, type, id) => {
  let posts;
  await axios
  .get(`/api/subject/${id}/lecture/search/${type}/${keyword}`)
  .then((res) => {
    posts = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 검색된 강의 불러오기 실패`);
  });
  return posts;
}

export const getSubjectQnaBySearch = async (keyword, type, id) => {
  let posts;
  await axios
  .get(`/api/subject/${id}/qna/search/${type}/${keyword}`)
  .then((res) => {
    posts = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 검색된 과목 QnA 불러오기 실패`);
  });
  return posts;
}

export const getCourseBoardBySearch = async (keyword, type, id) => {
  let posts;
  await axios
  .get(`/api/course/${id}/board/search/${type}/${keyword}`)
  .then((res) => {
    posts = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 검색된 과정 공지 불러오기 실패`);
  });
  return posts;
}

export const getSubmitByStudentIdAndHomeworkId = async (studentId, homeworkId) => {
  let submit;
  await axios
  .get(`/api/subject/submit/student/${studentId}/homework/${homeworkId}`)
  .then((res) => {
    submit = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과제 제출 불러오기 실패`);
  });
  return submit;
}

export const getSubjectReviewByCourseId = async (id) => {
  let reviews;
  await axios
  .get(`/api/course/${id}/review`)
  .then((res) => {
    reviews = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과정의 모든 과목에 대한 강의평가 불러오기 실패`);
  });
  return reviews;
}

export const getSubjectReviewByStudentId = async (id) => {
  let reviews;
  await axios
  .get(`/api/course/student/${id}/review`)
  .then((res) => {
    reviews = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생의 강의평가 불러오기 실패`);
  });
  return reviews;
}

export const getSubjectReviewBySubjectId = async (id) => {
  let reviews;
  await axios
  .get(`/api/subject/${id}/review`)
  .then((res) => {
    reviews = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 과목의 모든 강의평가 불러오기 실패`);
  });
  return reviews;
}

export const getStudentAttendanceByStudentId = async (id) => {
  let attendance;
  await axios
  .get(`/api/user/student/${id}/attendance`)
  .then((res) => {
    attendance = res.data.data;
  })
  .catch((err) => {
    console.log(`${err} : 학생 출결 불러오기 실패`);
  });
  return attendance;
}