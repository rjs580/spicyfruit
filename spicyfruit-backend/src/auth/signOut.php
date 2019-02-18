<?php
  include("../commons/common.php");
  include("../commons/sessions.php");

  destroySession();
  if(isSessionExpired() === true) {
    sendSuccessMSG("Signed out successfully");
  } else {
    sendErrorMSG("Error signing out");
  }
