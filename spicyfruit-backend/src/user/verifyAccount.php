<?php
  include("../commons/common.php");
  include("../commons/sessions.php");
  include("../commons/email.php");

  if (isSessionExpired() === false && isset($user) && isset($user->userID) && isset($user->userEmail) && isset($user->nickName)) {

  } else {
    sendErrorMSG("No user for this session");
  }