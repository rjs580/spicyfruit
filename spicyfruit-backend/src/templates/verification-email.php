<?php
  $bgColor = "#fff";
  $textColor = "#C72C41";

  $code = strval($code);
?>
<html lang="en">
  <head>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900|Montserrat:300,400,500,600,700,800,900' rel='stylesheet' type='text/css'>
    <title>Verify Account</title>
  </head>
  <body style="font-family: 'Rubik', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: <?= $bgColor ?>;padding:0;margin:0;font-size:0;line-height:0;">
    <div id="container" style="width: 100%;">
      <div style="height: 25px;"></div>
      <table align="center" width="640px" border="0" cellspacing="0" cellpadding="0" bgcolor="<?= $bgColor ?>" style="width:640px !important;">
        <tr>
          <td width="30px"></td>
          <td align="left" valign="middle">
            <div style="display:flex; align-items:center; justify-content:flex-start; text-align: center; flex-direction: column">
              <a style="display:inline-flex; justify-content:flex-start; height: 64px !important; font-size: 68px; font-weight: 400;line-height: 64px;">
                <img src="https://spicyfruit.me/backend/assets/img/SpicyFruitIcon_Square.png" width="64px" height="64px" alt="SpicyFruit" style="border-radius: 50%;">
                <span style="color: <?= $textColor ?>; margin-left: 15px;">SPICY FRUIT</span>
              </a>
              <div style="height: 25px;"></div>
              <div style="display:inline-flex; align-items:center; flex-direction: column; width: 100%; background-color: #f5f7fa; border-radius: 22px;">
                <div style="height: 15px;"></div>
                <span style="color: #000; font-size: 28px; font-weight: 400;line-height: 28px;">VERIFICATION CODE</span>
                <div style="height: 15px;"></div>
                <div style="display:inline-flex; align-items:center; justify-content: center; flex-direction: row; flex-wrap: wrap; width: 240px; background-color: #fff; border-radius: 22px;">
                  <div style="height: 10px; width: 100%;"></div>
                  <div style="width: 80%; display:inline-flex; align-items:center; justify-content: space-evenly; flex-direction: row; flex-wrap: wrap; color: #000; font-size: 38px; font-weight: 500;line-height: 38px;">
                    <?php
                      for($i = 0; $i < 6; $i++) {
                        echo "<span>" . $code[$i] . "</span>";
                      }
                    ?>
                  </div>
                  <div style="height: 10px; width: 100%;"></div>
                </div>
                <div style="height: 15px;"></div>
                <span style="color: #000; font-size: 12px; line-height: 12px;">Please do not reply to this email. This email address is not monitored for responses.</span>
                <div style="height: 6px;"></div>
              </div>
              <div style="height: 5px;"></div>
              <div style="display:inline-flex; align-items:center; flex-direction: row; justify-content: space-between; width: 95%;">
                <div style="display:inline-flex; align-items:start; flex-direction: column;">
                  <span style="color: #000; font-size: 12px; line-height: 12px; text-align: left">&copy; <?php echo date("Y"); ?> Orangebananaspy. All rights reserved.</span>
                  <span style="color: #000; font-size: 12px; line-height: 12px; text-align: left">Made by <a href="https://twitter.com/orangebananaspy" style="text-decoration:none!important;color:inherit;border-bottom:1px dotted #a3a3a3;">Orangebananaspy</a></span>
                </div>
                <a href="https://twitter.com/spicyfruit2" target="_blank"><img alt="Twitter" width="35px" src="https://png.icons8.com/ios/100/000000/twitter-circled-filled.png"></a>
              </div>
            </div>
          </td>
          <td width="30px"></td>
        </tr>
      </table>
    </div>
  </body>
</html>