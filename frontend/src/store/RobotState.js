import { defineStore } from 'pinia'
import { ALLIANCE, STATES } from '../constants.js'
import { useTimer } from '../utils/useTimer.js'
import { OptionButtonGroupManager } from '../components/OptionButtonGroupManager.js'
import router from '../router/index.js'
import { request } from '../utils/request.js'

export const useRobotStateStore = defineStore('robot', {
    state: () => {
        return {
            timer: useTimer(),
            manager: new OptionButtonGroupManager(),

            alliance: ALLIANCE.RED,
            currentState: STATES.INIT,
            // AutoState variables
            isInState: true,
            hasBall: false,
            climbStarted: false,
            groupClimbPosition: null,
            groupClimbSuccess: null,
            groupMidPosition: null,
            groupPreload: null,

            winner: null,

            // TeleOpratingState variables
            toggleCount: 0,
            counters: {},

            groupActive: null,
            groupAccuracy: null,
            groupClimbHeight: null,
        }
    },
    getters: {
        getPreLoadEnded: (state) => state.groupPreload.selected() || state.currentState !== STATES.AUTO,
        getTransitionAlready: (state) => state.winner === ALLIANCE.RED || state.winner === ALLIANCE.BLUE,
    },
    actions: {
        toggleState() {
            const time = this.timer.getTime() / 1000.0

            if (this.currentState === STATES.INIT) {
                this.currentState = STATES.PREMATCH
            } else if (this.currentState === STATES.PREMATCH) {
                this.currentState = STATES.BEFORE_START
            } else if (this.currentState === STATES.BEFORE_START) {
                this.currentState = STATES.AUTO
            } else if (this.currentState === STATES.AUTO && time >= 20.0) {
                let EngName = {
                    'Preload全进': 'all',
                    'Preload射丢': 'some',
                    'Preload没射': 'nope',
                }
                request.post('/api/preload', {
                    preload: EngName[this.groupPreload.selectedOptions[0]],
                }).catch((err) => {
                    console.error(err)
                })

                this.currentState = STATES.AUTO_PAUSE
            } else if (this.currentState === STATES.AUTO_PAUSE && time >= 23.0) {
                if (this.climbStarted) {
                    let EngName = {
                        '左爬': 'left',
                        '中爬': 'mid',
                        '右爬': 'right',
                    }
                    request.post('/api/climb/auto', {
                        success: this.groupClimbSuccess.selectedOptions[0] === '成功',
                        position: EngName[this.groupClimbPosition.selectedOptions[0]],
                    }).catch((err) => {
                        console.error(err)
                    })
                }
                this.climbStarted = false
                this.preLoadEnded = true
                this.manager.deleteGroupIfExist('groupClimbPosition')
                this.manager.deleteGroupIfExist('groupClimbSuccess')
                this.groupClimbPosition = this.manager.createGroupIfNotExist('groupClimbPosition', 1)
                this.groupClimbSuccess = this.manager.createGroupIfNotExist('groupClimbSuccess', 1)

                this.currentState = STATES.TRANSITION
            } else if (this.currentState === STATES.TRANSITION && time >= 30.0) {
                this.currentState = STATES.TRANSITION_RESULT
            } else if (
                this.currentState === STATES.TRANSITION_RESULT
                && (this.winner === ALLIANCE.RED || this.winner === ALLIANCE.BLUE)
                && time >= 33.0
            ) {
                request.post('/api/auto-winner', {
                    auto_winner: this.winner,
                }).catch((err) => {
                    console.error(err)
                })

                this.currentState = this.winner === this.alliance ? STATES.INACTIVE : STATES.ACTIVE
                this.toggleCount = 1
            } else if ((this.currentState === STATES.ACTIVE || this.currentState === STATES.INACTIVE) && time >= 33.0 + 25.0 * this.toggleCount) {
                if (this.toggleCount < 4) {
                    this.toggleCount++
                    this.currentState = this.currentState === STATES.ACTIVE ? STATES.INACTIVE : STATES.ACTIVE
                }
                else {
                    this.currentState = STATES.ENDGAME
                }
            } else if (this.currentState === STATES.ENDGAME && time >= 163.0) {
                if (this.climbStarted) {
                    let EngName = {
                        '左爬': 'left',
                        '中爬': 'mid',
                        '右爬': 'right',
                        '高杆': 'high',
                        '中杆': 'mid',
                        '低杆': 'low',
                    }
                    request.post('/api/climb/teleop', {
                        success: this.groupClimbSuccess.selectedOptions[0] === '成功',
                        position: EngName[this.groupClimbPosition.selectedOptions[0]],
                        height: EngName[this.groupClimbHeight.selectedOptions[0]],
                    }).catch((err) => {
                        console.error(err)
                    })
                }
                let EngName = {
                    '推球回家次数': 'push_home_count',
                    '推球进outpost次数': 'push_outpost_count',
                    '阻挡路线/pin次数': 'block_count',
                    '冲撞射球次数': 'strike_opponent_count',
                    '普通犯规次数': 'normal_foul_count',
                    '技术犯规次数': 'tech_foul_count',
                    '中场运球次数': 'mid_dribble_count',
                    '前场运球次数': 'front_dribble_count',
                }
                request.post('/api/counters', {
                    ...Object.fromEntries(Object.entries(this.counters).map(([key, value]) => ([EngName[key], value]))),
                }).catch((err) => {
                    console.error(err)
                })

                request.post('/api/over', {}).catch((err) => {
                    console.error(err)
                })

                router.push('/')
                this.resetAll();
            }
        },

        createOptionButtonGroups() {
            this.groupClimbPosition = this.manager.createGroupIfNotExist('groupClimbPosition', 1)
            this.groupClimbSuccess = this.manager.createGroupIfNotExist('groupClimbSuccess', 1)
            this.groupMidPosition = this.manager.createGroupIfNotExist('groupMidPosition', 1)
            this.groupPreload = this.manager.createGroupIfNotExist('groupPreload', 1)
            this.groupActive = this.manager.createGroupIfNotExist('groupActive', 2)
            this.groupAccuracy = this.manager.createGroupIfNotExist('groupAccuracy', 1)
            this.groupClimbHeight = this.manager.createGroupIfNotExist('groupClimbHeight', 1)
        },
        createCounters(labels) {
            labels.forEach(label => {
                this.counters[label] = 0
            })
        },

        setAlliance(alliance) {
            this.alliance = alliance
        },
        setCurrentState(state) {
            this.currentState = state
        },
        // AutoState actions
        setIsInState(value) {
            this.isInState = value
            if (this.isInState) {
                if (this.currentState === STATES.AUTO) {
                    let EngName = {
                        '中切': 'mid',
                        '边切': 'edge',
                        '球阵角': 'corner',
                    }
                    request.patch('/api/mid-position', {
                        precise: EngName[this.groupMidPosition.selectedOptions[0]],
                    }).catch((err) => {
                        console.error(err)
                    })
                }
                this.manager.deselectOptions('groupMidPosition', this.groupMidPosition.selectedOptions.slice())
            }
            else {
                this.fromMid = false
            }
        },
        setFromMid(value) {
            this.fromMid = value
        },
        increaseOutCount() {
            this.outCount++
        },
        setHasBall(value) {
            this.hasBall = value
            if (!this.hasBall) {
                this.manager.deselectOptions('groupActive', this.groupActive.selectedOptions.slice())
                this.manager.deselectOptions('groupAccuracy', this.groupAccuracy.selectedOptions.slice())
            }
        },
        setClimbStarted(value) {
            this.climbStarted = value
        },
        updateCurrentState(state) {
            this.currentState = state
        },

        updateWinner(winner) {
            if (this.winner === null) {
                this.winner = 1
            }
            else if (this.winner < 2) {
                this.winner++
            }
            else {
                this.winner = winner
            }
        },

        resetAll() {
            this.timer.reset()
            this.manager = new OptionButtonGroupManager()

            this.alliance = ALLIANCE.RED
            this.currentState = STATES.INIT

            this.isInState = true
            this.hasBall = false
            this.climbStarted = false
            this.groupClimbPosition = null
            this.groupClimbSuccess = null
            this.groupMidPosition = null
            this.groupPreload = null

            this.winner = null
            this.toggleCount = 0
            this.groupActive = null
            this.groupAccuracy = null
            this.groupClimbHeight = null
        }
    }
})
