import { InjectionToken, Provider } from '@angular/core';
export const ARCGIS_TOKEN = new InjectionToken<string>('AAPK33d5b43241c84674aa877b06e9f4a5bdFlBUzZtcGEB94sCvZK01JrvmaFRoentIrcvJyAYKNiK0LG641Zy4yFyMf3_Dy2jq');
//la mía es: "AAPK33d5b43241c84674aa877b06e9f4a5bdFlBUzZtcGEB94sCvZK01JrvmaFRoentIrcvJyAYKNiK0LG641Zy4yFyMf3_Dy2jq"

export function provideArcgisToken(token: string): Provider {
  return { provide: ARCGIS_TOKEN, useValue: token };
}
