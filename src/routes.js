// GLOBAL
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const TRAINER_ME = "/trainer-me";
const ME = "/me";
const CONFIRM_EMAIL = "/confirm_email";
const RESEND_EMAIL = "/resend-email";

// Health
const WANT_HEALTH = "/want-health";
const WANT_HEALTH_UPLOAD = "/upload";
const HEALTH_DETAIL = "/:id";
const WANT_HEALTH_UPDATE = "/:id/update";
const WANT_HEALTH_DELETE = "/:id/delete";

// USERS
const USERS = "/users";
const USER_EDIT_PROFILE = "/edit-profile";
const USER_DETAIL = "/:id";
const CHANGE_PASSWORD = "/change-password";

// TRAINERS
const TRAINERS = "/trainers";
const TRAINER_PHONE_VERIFY = "/phone-verify";
const TRAINER_JOIN = "/:id/join";
const TRAINER_PHOTO = "/:id/photo";
const TRAINER_WRITE = "/:id/write";
const TRAINER_INFO = "/:id/info";
const TRAINER_DETAIL = "/:id";

//
const MESSAGES = "/message";
const MESSAGES_SEND_IN_UPLOAD = "/:healthId/send";
const MESSAGES_ROOM = "/room/:id";

// API
const API = "/api";
const API_ADDRESS_SEARCH = "/address-search";
const API_RESEND_EMAIL = "/resend-email";
const API_MESSAGE_READ = "/:roomId/message-read";
const API_MESSAGE_SEND = "/:roomId/message";
const API_REMOVE_PHOTO = "/remove-photo";
const API_TRAINER_AVATAR_SAVE = "/:id/trainer-avatar-save";
const API_TRAINER_PHOTO_SAVE = "/:id/trainer-photo-save";
const API_TRAINER_WRITE_SAVE = "/:id/trainer-write-save";
const API_TRAINER_INFO_SAVE = "/:id/trainer-info-save";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  me: ME,
  confirmEmail: CONFIRM_EMAIL,
  resendEmail: RESEND_EMAIL,
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
  trainerPhoneVerify: TRAINER_PHONE_VERIFY,
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
  wantHealthUpdate: (id) => {
    if (id) {
      return `/want-health/${id}/update`;
    } else {
      return WANT_HEALTH_UPDATE;
    }
  },
  wantHealthDelete: (id) => {
    if (id) {
      return `/want-health/${id}/delete`;
    } else {
      return WANT_HEALTH_DELETE;
    }
  },
  api: API,
  apiAddressSearch: API_ADDRESS_SEARCH,
  apiResendEmail: API_RESEND_EMAIL,
  apiMessageRead: (id) => {
    if (id) {
      return `/api/${id}/message-read`;
    } else {
      return API_MESSAGE_READ;
    }
  },
  apiMessageSend: (id) => {
    if (id) {
      return `/api/${id}/message`;
    } else {
      return API_MESSAGE_SEND;
    }
  },
  apiRemovePhoto: API_REMOVE_PHOTO,
  apiTrainerAvatarSave: (id) => {
    if (id) {
      return `/api/${id}/trainer-avatar-save`;
    } else {
      return API_TRAINER_AVATAR_SAVE;
    }
  },
  apiTrainerPhotoSave: (id) => {
    if (id) {
      return `/api/${id}/trainer-photo-save`;
    } else {
      return API_TRAINER_PHOTO_SAVE;
    }
  },
  apiTrainerWriteSave: (id) => {
    if (id) {
      return `/api/${id}/trainer-write-save`;
    } else {
      return API_TRAINER_WRITE_SAVE;
    }
  },
  apiTrainerInfoSave: (id) => {
    if (id) {
      return `/api/${id}/trainer-info-save`;
    } else {
      return API_TRAINER_INFO_SAVE;
    }
  },
  message: MESSAGES,
  messageSendInUpload: (id) => {
    if (id) {
      return `/message/${id}/send`;
    } else {
      return MESSAGES_SEND_IN_UPLOAD;
    }
  },
  messageRoom: (id) => {
    if (id) {
      return `/message/room/${id}`;
    } else {
      return MESSAGES_ROOM;
    }
  },
};

export default routes;
