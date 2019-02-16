import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthUser} from '../models/AuthUser.model';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Msg, MSGType} from '../models/Msg.model';
import {SweetAlert} from '../services/sweetalert.service';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {User} from '../models/User.model';
import {EditUserProfile} from '../models/EditProfile.model';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class OAuthService {
  private backendString:string = "localhost/backend";

  private idleTime: number = 600; // 10 min which gives server that 2 minute to sync if needed
  private timeOutTime: number = 10; // 10 seconds

  // private idleTime: number = 1680; // 28 min which gives server that 2 minute to sync if needed
  // private timeOutTime: number = 10; // 10 seconds
  private idlingStarted: boolean = false;
  private static currentUser: User = null;

  constructor(private http: HttpClient, private router: Router, private idle: Idle, private keepalive: Keepalive, private sanitizer: DomSanitizer) {
    // this provides total of 1740 seconds
    this.idle.setIdle(this.idleTime - this.timeOutTime);
    this.idle.setTimeout(this.timeOutTime);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // warn user that they are about to be signed out
    this.idle.onIdleStart.subscribe(() => {
      let htmlComponent = '<div>Your session will expire in <strong><div class=\'countdown\'></div></strong> seconds.</div>';
      SweetAlert.htmlAlert('Idle Session', htmlComponent, false);
      this.idlingStarted = true;
    });

    // close alert if showing because user is active
    this.idle.onInterrupt.subscribe(() => {
      if (this.idlingStarted) {
        SweetAlert.close();
        this.idlingStarted = false;
      }
    });

    // countdown in sweetalert
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      $('.countdown').html(countdown);
    });

    // do the sign out procedure
    this.idle.onTimeout.subscribe(() => {
      SweetAlert.close();
      this.signOut(true);
    });

    // send message to server every interval
    keepalive.interval(this.idleTime);
    keepalive.onPing.subscribe(() => {
      this.http.get('http://' + this.backendString + '/auth/keepAliveUser.php', {withCredentials: true}).subscribe(() => {
      }, err => {
        if (err) {
          console.error(err.toString());
        }
      });
    });

    this.stopIdleCheck();
  }

  startIdleCheck(): void {
    this.idle.watch();
    this.idlingStarted = false;
  }

  stopIdleCheck(): void {
    this.idle.stop();
  }

  resetPasswordForUser(user: AuthUser): void {
    // alert(JSON.stringify(user));
  }

  signInUser(user: AuthUser): void {
    SweetAlert.loadingAlert();
    let userObject = user.toJSON();
    this.http.post('http://' + this.backendString + '/auth/signIn.php', userObject, {withCredentials: true}).subscribe(msg => {
      let serverMsg = Msg.deserialize(msg);
      if (serverMsg.status == MSGType.Success) {
        SweetAlert.close();
        this.startIdleCheck();
        this.router.navigate(['/pHome']);
      } else if (serverMsg.status == MSGType.Error) {
        SweetAlert.errorAlert(serverMsg.message);
      } else {
        SweetAlert.errorAlert('Could not parse the message received from server');
      }
    }, err => {
      if (err) {
        this.handleErr(err);
      }
    });
  }

  signUpUser(user: AuthUser): void {
    SweetAlert.loadingAlert();
    let userObject = user.toJSON();
    this.http.post('http://' + this.backendString + '/auth/signUp.php', userObject, {withCredentials: true}).subscribe(msg => {
      let serverMsg = Msg.deserialize(msg);
      if (serverMsg.status == MSGType.Success) {
        SweetAlert.close();
        this.startIdleCheck();
        this.router.navigate(['/pHome']);
        SweetAlert.successAlert('Congrats you have successfully signed up!')
      } else if (serverMsg.status == MSGType.Error) {
        SweetAlert.errorAlert(serverMsg.message);
      } else {
        SweetAlert.errorAlert('Could not parse the message received from server');
      }
    }, err => {
      if (err) {
        this.handleErr(err);
      }
    });
  }

  signOut(timedOut?: boolean): void {
    SweetAlert.loadingAlert();
    this.http.get('http://' + this.backendString + '/auth/signOut.php', {withCredentials: true}).subscribe(msg => {
      let serverMsg = Msg.deserialize(msg);
      if (serverMsg.status == MSGType.Success) {
        SweetAlert.close();
        this.stopIdleCheck();
        if (timedOut) {
          SweetAlert.errorAlert('Session expired');
        }
        this.router.navigate(['/home']);
      } else if (serverMsg.status == MSGType.Error) {
        SweetAlert.errorAlert(serverMsg.message);
      } else {
        SweetAlert.errorAlert('Could not parse the message received from server');
      }
    }, err => {
      if (err) {
        this.handleErr(err);
      }
    });
  }

  static getUser(): User {
    return OAuthService.currentUser === null ? null : OAuthService.currentUser;
  }

  editProfile(editUser: EditUserProfile) {
    SweetAlert.loadingAlert();
    this.http.post('http://' + this.backendString + '/user/editAccount.php', editUser.toFormData(), {withCredentials: true}).subscribe(msg => {
      let serverMsg = Msg.deserialize(msg);
      if (serverMsg.status == MSGType.Success) {
        this.router.navigate(['/pHome']);
        location.reload();
      } else if (serverMsg.status == MSGType.Error) {
        SweetAlert.errorAlert(serverMsg.message);
      } else {
        SweetAlert.errorAlert('Could not parse the message received from server');
      }
    }, err => {
      if (err) {
        this.handleErr(err);
      }
    });
  }

  isAuthenticated(showErrors: boolean = true): Observable<boolean> {
    return this.http.get('http://' + this.backendString + '/auth/getSessionUser.php', {withCredentials: true}).pipe(
      map(msg => {
        let serverMsg = Msg.deserialize(msg);
        if (serverMsg.status == MSGType.Success) {
          OAuthService.currentUser = User.deserialize(this.sanitizer, serverMsg.message);
          return true;
        } else if (serverMsg.status == MSGType.Error) {
          if(showErrors === true) SweetAlert.errorAlert(serverMsg.message);
          throw new Error(serverMsg.message);
        }
        throw new Error('Could not parse the message properly');
      }), catchError((err) => {
        if (err) {
          this.handleErr(err);
        }
        this.router.navigate(['/auth/sign-in']);
        return of(false);
      })
    );
  }

  handleErr(err) {
    if(err instanceof Error || typeof err === 'object') {
      console.error(err.toString());
    } else {
      SweetAlert.errorAlert(err);
    }
  }
}
