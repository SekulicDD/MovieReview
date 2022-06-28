import {
  animate,
  animateChild,
  animation,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut',[
  transition(":enter",animation([
    style({ opacity:0}),
    animate("1500ms 200ms",style({ opacity:1}))
    ])
  ),
  transition(":leave",animation([
      style({ opacity:1}),
      animate("200ms",style({ opacity:0}))
    ])
  )
]);

export const fadeIn = trigger('fadeIn',[
  transition(":enter",animation([
      style({ opacity:0}),
      animate("1500ms 200ms",style({ opacity:1}))
    ])
  )
]);
export const ActiveDisabled = trigger('activeDisabled',[
  transition("*=>true",animation([
      style({ opacity:0.6}),
      animate("1000ms",style({ opacity:1}))
    ])
  ),
  transition("*=>false",animation([
      style({ opacity:1}),
      animate("1000ms",style({ opacity:0.35}))
    ])
  )
]);


export const slideInOut= trigger('slideInOut', [
  transition(':enter', [
    style({transform: 'translateY(-30%)',opacity:0}),
    animate('300ms ease-in', style({transform: 'translateY(0%)', opacity:1}))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({transform: 'translateY(-30%)'}))
  ])
]);










