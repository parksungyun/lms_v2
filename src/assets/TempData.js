import t3 from "./img/trainers/t3.jpg";
import m1 from "./img/managers/m1.jpg";
import m2 from "./img/managers/m2.jpg";
import m3 from "./img/managers/m3.jpg";
import c1 from "./img/class/class1.png";
import c3 from "./img/class/class3.png";

export const userList = [
  {
    uid: 1,
    user_id: "abc123",
    user_pw: "asdf",
    user_name: "행정일",
    user_birth: "1986-09-11",
    user_addr: "대전광역시 중구 중앙로 121번길 20",
    user_phone: "010-1589-7456",
    user_email: "abc123@naver.com.com",
    reg_date: "2023-08-03 00:00:00",
    mod_date: "2023-08-03 00:00:00",
  },
  {
    uid: 2,
    user_id: "tjddbs96",
    user_pw: "sdjipaw",
    user_name: "교육일",
    user_birth: "2002-02-04",
    user_addr: "대전광역시 중구 중앙로 121번길 20",
    user_phone: "010-1589-7456",
    user_email: "tjddbs96@naver.com.com",
    reg_date: "2023-08-05 00:00:00",
    mod_date: "2023-08-05 00:00:00",
  },
  {
    uid: 3,
    user_id: "gnldbs99",
    user_pw: "awrhoaejgp",
    user_name: "행정이",
    user_birth: "1999-04-30",
    user_addr: "대전광역시 중구 중앙로 121번길 20",
    user_phone: "010-1589-7456",
    user_email: "hhy@naver.com.com",
    reg_date: "2023-08-08 00:00:00",
    mod_date: "2023-08-08 00:00:00",
  },
  {
    uid: 4,
    user_id: "tjsdo48",
    user_pw: "asdfgawgr",
    user_name: "학생일",
    user_birth: "1985-07-07",
    user_addr: "대전광역시 중구 중앙로 121번길 20",
    user_phone: "010-1589-7456",
    user_email: "tjsdo48@naver.com.com",
    reg_date: "2023-09-11 00:00:00",
    mod_date: "2023-09-11 00:00:00",
  },
  {
    uid: 5,
    user_id: "dudxo15",
    user_pw: "awegawr",
    user_name: "학생이",
    user_birth: "1997-02-04",
    user_addr: "대전광역시 중구 중앙로 121번길 20",
    user_phone: "010-1589-7456",
    user_email: "dudxo15@naver.com.com",
    reg_date: "2023-09-12 00:00:00",
    mod_date: "2023-09-12 00:00:00",
  },
  {
    uid: 6,
    user_id: "tmdgus",
    user_pw: "tawoeik",
    user_name: "행정삼",
    user_birth: "1993-01-01",
    user_addr: "대전광역시 중구 중앙로 121번길 20",
    user_phone: "010-1589-7456",
    user_email: "tmdgus@naver.com.com",
    reg_date: "2023-09-17 00:00:00",
    mod_date: "2023-09-17 00:00:00",
  },
]

export const academic = [
  {
    academic_id: 1,
    uid: 1,
    auth: 0,
    dept: 0,
    position: "주임",
    user_photo: m3,
    remark: "여러분의 꿈과 희망을 응원하며 끝까지 함께하겠습니다!!",
  },
  {
    academic_id: 2,
    uid: 2,
    auth: 0,
    dept: 1,
    position: "Web Development",
    user_photo: t3,
    remark: "디테일한 분석과 빈틈없는 전략으로 꽉 찬 개발자가 되게 해드립니다!",
  },
  {
    academic_id: 3,
    uid: 3,
    auth: 0,
    dept: 0,
    position: "대리",
    user_photo: m1,
    remark: "학생들의 고민, 걱정을 같이 고민하고 해결해주며 취업까지 도와드리겠습니다!!",
  },
  {
    academic_id: 4,
    uid: 6,
    auth: 0,
    dept: 0,
    position: "부장",
    user_photo: m2,
    remark: "고민하지 말고 믿고 맡겨주시면 상상이상의 결과를 보여드립니다.",
  },
]

export const student = [
  {
    student_id: 1,
    uid: 4,
    course_id: 1,
    reg_date: "2023-09-12",
  },
  {
    student_id: 2,
    uid: 5,
    course_id: 2,
    reg_date: "2023-09-17",
  },
]

export const course = [
  {
    course_id: 1,
    academic_id: 1,
    course_name: "디지털콘텐츠 UI/UX 디자인",
    subject_no: 3,
    capacity: 30,
    start_date: "2023-09-30",
    end_date: "2023-12-30",
    recruit_start: "2023-09-01",
    recruit_end: "2023-09-15",
    course_info: "K-디지털 트레이닝(디지털 신기술 핵심 실무인재 양성훈련)<br>한국판 뉴딜사업의 일환으로 혁신적인 기술 및 훈련 방법을 갖춘 기업-대학-민간 혁신기관을 통해 4차 산업혁명과 함께 급성장하고 있는 디지털·신기술 분야에 대한 집중적 교육 훈련을 합니다.<br>디지털·신기술 분야 현장에서 기업이 원하는 핵심 실무 인재를 양성하는 것이 목적입니다.<br>프로젝트 과제 수행, 해커톤, 기업과제 해결 등을 통한 차별적인 훈련 방법을 추구합니다.<br>국민내일배움카드 발급자를 대상으로 훈련비 전액을 지원합니다.<br>훈련장려금을 매월 최대 316,000~816,000원을 지원합니다.",
    course_photo: {c1},
  }, 
  {
    course_id: 2,
    academic_id: 3,
    course_name: "Front-end 디지털 디자인",
    subject_no: 3,
    capacity: 30,
    start_date: "2023-09-30",
    end_date: "2023-11-25",
    recruit_start: "2023-09-01",
    recruit_end: "2023-09-17",
    course_info: "실무 프로젝트 운영<br>훈련생 별 프로젝트 팀을 구성하여 기획자, Front-end, Back-end 개발자의 역할을 고루 맡을 수 있습니다.<br>관련된 참여기업에서 퍼실리테이터 및 멘토를 지원하며 과업 수행을 보조합니다.<br>효과적인 학습을 위해 페어코딩, 코드리뷰 기법을 적용하여 프로젝트를 진행합니다.",
    course_photo: {c3},
  }, 
]

export const subject = [
  {
    subject_id: 1,
    course_id: 1,
    subject_name: "HTML과 CSS 기초",
    academic_id: 2,
  },
  {
    subject_id: 2,
    course_id: 1,
    subject_name: "Javascript 기초",
    academic_id: 2,
  },
  {
    subject_id: 3,
    course_id: 1,
    subject_name: "UI/UX 입문",
    academic_id: 2,
  },
  {
    subject_id: 4,
    course_id: 2,
    subject_name: "HTML과 CSS 기초",
    academic_id: 2,
  },
  {
    subject_id: 5,
    course_id: 2,
    subject_name: "Javascript 기초",
    academic_id: 2,
  },
  {
    subject_id: 6,
    course_id: 2,
    subject_name: "UI/UX 입문",
    academic_id: 2,
  },
]