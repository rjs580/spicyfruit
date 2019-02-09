import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PackageCard} from '../../shared/models/PackageCard';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent implements OnInit {
  currentDate : Date = new Date();

  recentPackages = [
    new PackageCard("NudeKeys", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("ImageBoard", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("BetterBadges", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("RomanPasscode", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("RomanPasscode", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("BetterBadges", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("NudeKeys", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg")
  ];

  featuredPackages = [
    new PackageCard("NudeKeys", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("ImageBoard", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("BetterBadges", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg"),
    new PackageCard("RomanPasscode", "Free", "Orangebananaspy", "assets/img/logos/background_150.svg")
  ];

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }
}
