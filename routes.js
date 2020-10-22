// GLOBAL
const HOME = "/";
const JOIN = "/join";
const EDIT_PROFILE = "/edit-profile";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const TRAINER_ME = "/trainer-me";
const ME = "/me";

// Health
const WANT_HEALTH = "/want-health";
const WANT_HEALTH_UPLOAD = "/upload";
const HEALTH_DETAIL = "/:id";

// USERS
const USERS = "/users";
const USER_DETAIL = "/:id";
const USER_EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// TRAINERS
const TRAINERS = "/trainers";
const TRAINER_JOIN = "/:id/join";
const TRAINER_PHOTO = "/:id/photo";
const TRAINER_WRITE = "/:id/write";
const TRAINER_INFO = "/:id/info";
const TRAINER_DETAIL = "/:id";

// API
const API = "/api";
const API_ADDRESS_SEARCH = "/address-search";

const routes = {
  home: HOME,
  join: JOIN,
  editProfile: EDIT_PROFILE,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  me: ME,
  trainerMe: TRAINER_ME,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  userEditProfile: USER_EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  trainers: TRAINERS,
  trainerJoin: (id) => {
    if (id) {
      return `/trainers/${id}/join`;
    } else {
      return TRAINER_JOIN;
    }
  },
  trainerPhoto: (id) => {
    if (id) {
      return `/trainers/${id}/photo`;
    } else {
      return TRAINER_PHOTO;
    }
  },
  trainerWrite: (id) => {
    if (id) {
      return `/trainers/${id}/write`;
    } else {
      return TRAINER_WRITE;
    }
  },
  trainerInfo: (id) => {
    if (id) {
      return `/trainers/${id}/info`;
    } else {
      return TRAINER_INFO;
    }
  },
  trainerDetail: (id) => {
    if (id) {
      return `/trainers/${id}`;
    } else {
      return TRAINER_DETAIL;
    }
  },
  wantHealth: WANT_HEALTH,
  wantHealthUpload: WANT_HEALTH_UPLOAD,
  healthDetail: (id) => {
    if (id) {
      return `/want-health/${id}`;
    } else {
      return HEALTH_DETAIL;
    }
  },
  api: API,
  apiAddressSearch: API_ADDRESS_SEARCH,
};

export default routes;
