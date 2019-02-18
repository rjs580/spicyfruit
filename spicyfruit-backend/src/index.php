<?php
//  function getCode() {
//    $digits = 6;
//    return str_pad(rand(0, pow(10, $digits)-1), $digits, '0', STR_PAD_LEFT);
//  }
?>

<html lang='en'>
<head>
  <title>Spicy Fruit - Backend</title>
</head>
<body>
  <h1>
    SpicyFruit Backend
  </h1>
  <p>The admin has been notified of this visit, please enjoy your time back here.</p>
  <hr>
  <p>Copyright © <?php echo date("Y"); ?> ORANGEBANANASPY, All rights reserved.</p>
  <table>
    <tr>
      <th>#</th>
      <th>Code</th>
    </tr>

    <?php
//      for($i = 0; $i <= 100; $i++) {
//        echo "<tr><td>$i</td> <td>" . getCode() . "</td></tr>";
//      }
    ?>
  </table>

</body>
</html>
