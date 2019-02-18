<?php
  include("../commons/common.php");
  include("../commons/sessions.php");

  $user = getUserFromSession();
  if (isset($_GET["code"]) && isSessionExpired() === false && isset($user) && isset($user->userID) && isset($user->userEmail)) {
    $code = $_GET["code"];
    if($_SESSION["verifyCode"] === $code) {
      unset($_SESSION["verifyCode"]);

      $email = $user->userEmail;
      $id = $user->userID;
      @file_get_contents(API_URL . "private/accountVerified?email=" . $email . "&id=" . $id);
      $_SESSION["user"]->isVerified = true;

      sendSuccessMSG("Verified");
    } else {
      sendErrorMSG("Code does not match, please try again");
    }
  } else {
    sendErrorMSG("No user for this session");
  }