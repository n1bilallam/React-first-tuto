import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CHANGE_EVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getCourses() {
    return _courses;
  }
  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_COURSE:
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              _courses = _courses.filter(
                (course) => course.id !== parseInt(action.id, 10)
              );
              toast.error("🦄 Course deleated.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              store.emitChange();
            },
          },
          {
            label: "No",
            onClick: () => alert("canclled"),
          },
        ],
      });

      break;
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    default:
    //nothing to do
  }
});
export default store;
