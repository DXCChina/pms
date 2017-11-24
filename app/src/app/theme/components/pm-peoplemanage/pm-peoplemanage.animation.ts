import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

export const add = [
  trigger('add', [
    state('inactive', style({
      width: '48px',
      height: '48px',
      borderRadius: '24px',
      // transform: 'scale(0.8)'
    })),
    state('active', style({
      width: '100%',
      height: '60px',
      borderRadius: '5px',
      // transform: 'scale(1)'
    })),
    transition('inactive => active', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    transition('active => inactive', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]),
  trigger('peopleList', [
    transition('* => *', [

      query(':enter .people-part', style({ opacity: 0, transform: 'translateY(-40px)'}), {optional: true}),

      query(':enter .people-part', stagger('100ms', [
        animate('600ms cubic-bezier(.11,.5,0,.99)'),
        style({opacity: 1, transform: 'translateX(0)'})
      ]), {optional: true})
    ])
  ]),
];

