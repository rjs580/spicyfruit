<?php
  include("../commons/common.php");
  include("../commons/sessions.php");

  $user = getUserFromSession();
  if (isset($user) && isset($user->userID) && isset($user->userEmail) && isset($user->nickName)) {
    if (isSessionExpired() === true) {
      destroySession();
      sendErrorMSG("Session has expired");
    } else {
      sendSuccessMSG($user);
    }
  } else {
    sendErrorMSG("No user for this session");
  }
