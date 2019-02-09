<?php
  include("../commons/common.php");
  include("../commons/sessions.php");

  updateLastActivityTime();

  if (isSessionExpired() === false) {
    sendSuccessMSG("User is alive");
  } else {
    sendErrorMSG("Error keeping user alive");
  }