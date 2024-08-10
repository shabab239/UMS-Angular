import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Array<{ name: string, url: string }>>([]);
  private pageTitleSubject = new BehaviorSubject<string>('');

  breadcrumbs: Observable<Array<{ name: string, url: string }>> = this.breadcrumbsSubject.asObservable();
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.createBreadcrumbs(this.router.routerState.root);
      this.breadcrumbsSubject.next(breadcrumbs);
      this.pageTitleSubject.next(this.getPageTitle(this.router.routerState.root));
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ name: string, url: string }> = []): Array<{ name: string, url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.snapshot.data['breadcrumbs']) {
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }

        breadcrumbs.push({ name: child.snapshot.data['breadcrumbs'], url: url });
        return this.createBreadcrumbs(child, url, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

  private getPageTitle(route: ActivatedRoute): string {
    let title = '';
    if (route.snapshot.data['pageTitle']) {
      title = route.snapshot.data['pageTitle'];
    } else if (route.children.length > 0) {
      title = this.getPageTitle(route.children[0]);
    }
    return title;
  }
}
