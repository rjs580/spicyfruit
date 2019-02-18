<?php
  include("../commons/common.php");
  include("../commons/email.php");

  function getCode() {
    $digits = 6;
    return str_pad(rand(0, pow(10, $digits)-1), $digits, '0', STR_PAD_LEFT);
  }

    $code = getCode();
    $_SESSION["verifyCode"] = $code;

    ob_start();
    include("../templates/verification-email.php");
    $email_template = ob_get_contents();
    ob_end_clean();

    if(isset($_SESSION["verifyCode"]) && emailUserAsNoReply("Verify Account", $email_template)) {
      sendSuccessMSG("Code sent");
    } else {
      sendErrorMSG("Internal Error");
    }
