import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private maxStack: number = 3;
  private notifications: any[] = [];

  success(message: string) {
    let content: any = {};
    content.message = message;
    content.title = "Success";
    content.icon = "fa fa-bell";

    this.showAlert(content, 'success');
  }

  error(message: string) {
    let content: any = {};
    content.message = message;
    content.title = "Error";
    content.icon = "fa fa-bell";

    this.showAlert(content, 'error');
  }

  info(message: string) {
    let content: any = {};
    content.message = message;
    content.title = "Info";
    content.icon = "fa fa-bell";

    this.showAlert(content, 'info');
  }

  warning(message: string) {
    let content: any = {};
    content.message = message;
    content.title = "Warning";
    content.icon = "fa fa-bell";

    this.showAlert(content, 'warning');
  }

  private showAlert(content: any, type: string) {
    if (this.notifications.length >= this.maxStack) {
      const oldestNotification = this.notifications.shift();
      oldestNotification.close();
    }

    const notifyInstance = $.notify(content, {
      type: type,
      placement: {
        from: 'bottom',
        align: 'right',
      },
      time: 3000,
      delay: 0,
    });

    this.notifications.push(notifyInstance);
  }
}
