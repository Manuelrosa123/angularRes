import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({
    url: `http://arturober.com:5010/${req.url}`,
  });
  return next(reqClone);
};
