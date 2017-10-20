
import {animate, state, style, transition, trigger} from "@angular/animations";

export const  Animation = trigger('slid', [
  state('in', style({height:'300px'})),
  transition('void => *', [
    style({
      // transform: 'translateX(-100%)'
      height:'0px'
    }),
    animate('0.3s cubic-bezier(0.4, 0.0, 0.2, 1)')
  ]),
  transition('* => void', [
    animate('0.3s cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      // transform: 'translateX(100%)'
      height:'0px'
    }))
  ])
])
