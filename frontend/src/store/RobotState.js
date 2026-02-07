import { defineStore } from 'pinia'
import { useOptionButtonGroupManager } from '../components/OptionButtonGroupManager.js'
import { ALLIANCE, STATES } from '../constants.js'
import { useTimer } from '../utils/useTimer.js'

export const useRobotStateStore = defineStore('robot', {
    state: () => {
        return {
            timer: useTimer(),

            alliance: ALLIANCE.RED,
            currentState: STATES.INIT,
            // AutoState variables
            isInState: true,
            fromMid: null,
            outCount: 0,
            hasBall: false,
            climbStarted: false,
            group1: null,
            group2: null,
            group5: null,
            group7: null,

            winner: null,

            // TeleOpratingState variables
            toggleCount: 0,
        }
    },
    getters: {
        getAlliance: (state) => state.alliance,
        getCurrentState: (state) => state.currentState,
        getIsInState: (state) => state.isInState,
        getFromMid: (state) => state.fromMid,
        getOutCount: (state) => state.outCount,
        getHasBall: (state) => state.hasBall,
        getClimbStarted: (state) => state.climbStarted,
        getPreLoadEnded: (state) => state.group7.selected() || state.currentState !== STATES.AUTO,
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
                this.currentState = STATES.AUTO_PAUSE
            } else if (this.currentState === STATES.AUTO_PAUSE && time >= 23.0) {
                this.currentState = STATES.TRANSITION
            } else if (this.currentState === STATES.TRANSITION && time >= 30.0) {
                this.currentState = STATES.TRANSITION_RESULT
            } else if (this.currentState === STATES.TRANSITION_RESULT && time >= 33.0) {
                this.currentState = this.winner === this.alliance ? STATES.OFF : STATES.ON
                this.toggleCount = 1
            } else if ((this.currentState === STATES.ON || this.currentState === STATES.OFF) && time >= 33.0 + 25.0 * this.toggleCount) {
                if (this.toggleCount < 4) {
                    this.toggleCount++
                    this.currentState = this.currentState === STATES.ON ? STATES.OFF : STATES.ON
                }
                else {
                    this.currentState = STATES.ENDGAME
                }
            }
        },

        createOptionButtonGroups() {
            this.group1 = useOptionButtonGroupManager().createGroupIfNotExist('group1', 1)
            this.group2 = useOptionButtonGroupManager().createGroupIfNotExist('group2', 1)
            this.group5 = useOptionButtonGroupManager().createGroupIfNotExist('group5', 1)
            this.group7 = useOptionButtonGroupManager().createGroupIfNotExist('group7', 1)
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
        },
        setFromMid(value) {
            this.fromMid = value
        },
        increaseOutCount() {
            this.outCount++
        },
        setHasBall(value) {
            this.hasBall = value
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
        }
    }
})