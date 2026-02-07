export const COLORS = {
  RED: '#ff0000',
  BLUE: '#0000ff',
  YELLOW: '#eabb00',
  GREEN: '#42b883',
  VIOLET: '#9400d3',
  PINK: '#ff69b4',
  AMBER: '#ff9900',
  LIME: '#93b703',
  BLACK: '#000000',
  BLACK_TRANSPARENT: 'rgba(0, 0, 0, 0.5)',
}

export const ALLIANCE = {
  RED: 'red',
  BLUE: 'blue'
}

// 状态机状态定义
export const STATES = {
  INIT: 'init',
  PREMATCH: 'prematch',
  BEFORE_START: 'beforeStart',
  AUTO: 'auto',
  AUTO_PAUSE: 'autoPause',
  TRANSITION: 'transition',
  TRANSITION_RESULT: 'transitionResult',
  ON: 'on',
  OFF: 'off',
  ENDGAME: 'endgame'
}

export const STATES_TO_SHOW = {
  [STATES.INIT]: '初始化',
  [STATES.PREMATCH]: '预匹配',
  [STATES.BEFORE_START]: '准备开始',
  [STATES.AUTO]: '自动',
  [STATES.AUTO_PAUSE]: '切换手动',
  [STATES.TRANSITION]: '转换',
  [STATES.TRANSITION_RESULT]: 'Hub闪烁',
  [STATES.ON]: '开启',
  [STATES.OFF]: '关闭',
  [STATES.ENDGAME]: '终场'
}