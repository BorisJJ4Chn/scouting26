import { defineStore } from 'pinia'
import { ALLIANCE, STATES } from '../constants.js'
import { useTimer } from '../utils/useTimer.js'
import { OptionButtonGroupManager } from '../components/OptionButtonGroupManager.js'

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
            group1: null,
            group2: null,
            group5: null,
            group7: null,

            winner: null,

            // TeleOpratingState variables
            toggleCount: 0,

            groupActive: null,
            groupAccuracy: null,
        }
    },
    getters: {
        getPreLoadEnded: (state) => state.group7.selected() || state.currentState !== STATES.AUTO,
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
                this.currentState = STATES.AUTO_PAUSE
            } else if (this.currentState === STATES.AUTO_PAUSE && time >= 23.0) {
                this.currentState = STATES.TRANSITION
                this.climbStarted = false
                this.preLoadEnded = true
            } else if (this.currentState === STATES.TRANSITION && time >= 30.0) {
                this.currentState = STATES.TRANSITION_RESULT
            } else if (
                this.currentState === STATES.TRANSITION_RESULT
                && (this.winner === ALLIANCE.RED || this.winner === ALLIANCE.BLUE)
                && time >= 33.0
            ) {
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
            }
        },

        createOptionButtonGroups() {
            this.group1 = this.manager.createGroupIfNotExist('group1', 1)
            this.group2 = this.manager.createGroupIfNotExist('group2', 1)
            this.group5 = this.manager.createGroupIfNotExist('group5', 1)
            this.group7 = this.manager.createGroupIfNotExist('group7', 1)
            this.groupActive = this.manager.createGroupIfNotExist('groupActive', 2)
            this.groupAccuracy = this.manager.createGroupIfNotExist('groupAccuracy', 1)
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
                this.manager.deselectOptions('group5', this.group5.selectedOptions.slice())
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
        }
    }
})