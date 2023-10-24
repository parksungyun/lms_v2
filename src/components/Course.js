import { Card } from "react-bootstrap";
import clas from '../../assets/img/class/class1.png'
import { NavLink } from "react-router-dom";

export function Course() {
  return <>
    <Card>
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="course-item">
              <img src={clas} class="img-fluid" alt="..."/>
              <div class="course-content">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4>Design</h4>
                </div>

                <NavLink to="">디지털콘텐츠 UI/UX 디자인</NavLink>
                <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                <div class="trainer d-flex justify-content-end align-items-center">
                  <div class="trainer-rank d-flex align-items-center">
                    <i class="bx bx-user"></i>&nbsp;30
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Card>
  </>
}