
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AnimationEntryMetadata} from "@angular/core";

export const  routerDisplay = trigger('routerDisplay', [
  state('in', style({transform:'translateY(0) scale(1)'})),
  transition('void => *', [
    style({
      transform: 'translateY(50px) scale(0.8)'
    }),
    animate('0.3s cubic-bezier(0.4, 0.0, 0.2, 1)')
  ]),
  transition('* => void', [
    animate('0.3s cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      transform: 'translateY(-50px) scale(0.8)'
    }))
  ])
]);


// export const routerDisplay: AnimationEntryMetadata =
//   trigger('routeAnimation', [
//     state('*',
//       style({
//         opacity: 1,
//         transform: 'translateX(0)'
//       })
//     ),
//     transition(':enter', [
//       style({
//         opacity: 0,
//         transform: 'translateX(-100%)'
//       }),
//       animate('0.2s cubic-bezier(0.4, 0.0, 0.2, 1)')
//     ]),
//     transition(':leave', [
//       animate('0.5s cubic-bezier(0.4, 0.0, 0.2, 1)', style({
//         opacity: 0,
//         transform: 'translateY(100%)'
//       }))
//     ])
//   ]);
