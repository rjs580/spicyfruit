<?php
  include("../commons/common.php");
  include("../commons/sessions.php");

  $user = getUserFromSession();
  if (isset($user) && isset($user->userID) && isset($user->userEmail) && isset($user->nickName)) {
    if (isSessionExpired() === true) {
      destroySession();
      sendErrorMSG("Session has expired");
    } else {
      if(isset($user->profilePic) && $_SESSION["profileDirty"] === false) {
        $path = "../userData/" . $user->profilePic;
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);


        $user->profilePic = $base64;
        $_SESSION["profileDirty"] = true;
      }

      sendSuccessMSG($user);
    }
  } else {
    sendErrorMSG("No user for this session");
  }
