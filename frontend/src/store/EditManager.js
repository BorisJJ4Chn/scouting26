import { defineStore } from 'pinia'


export const useEditManagerStore = defineStore('editManager', {
    state: () => {
        return {
            length: 163000,
            timestamp: 0,
            newTimestamp: 0,
            startX: null,
            data: null,
        }
    },
    actions: {
        init(data) {
            this.timestamp = 0
            this.data = data
        },

        startDrag(x) {
            if (this.startX) {
                return
            }
            this.startX = x
        },
        moveDrag(x) {
            if (this.startX) {
                const deltaX = this.startX - x
                this.newTimestamp = this.timestamp + deltaX / (0.03 * window.innerWidth) * 1000
            }
        },
        endDrag() {
            if (this.startX) {
                this.timestamp = Math.max(0, Math.min(this.newTimestamp || this.timestamp, this.length || 0))
            }
            this.startX = null
            this.newTimestamp = null
        },
        updateAction(action) {
            const toDelete = this.actionThisTime
            if (toDelete) {
                const index = this.data?.behaviors?.actions.findIndex((item) => item.timestamp === toDelete.timestamp && item.type === toDelete.type)
                if (index !== -1) {
                    this.data?.behaviors?.actions.splice(index, 1)
                }
            }
            this.data?.behaviors?.actions.push({ ...action })
            this.data?.behaviors?.actions.sort((a, b) => a.timestamp - b.timestamp)
        },
    },
    getters: {
        actionThisTime() {
            let ret = null
            for (const action of this.data?.behaviors?.actions || []) {
                if (!ret || Math.abs(action?.timestamp - this.showTimestamp) < Math.abs(ret.timestamp - this.showTimestamp))
                    ret = action
            }
            return ret
        },
        showTimestamp() {
            return Math.max(0, Math.min(this.newTimestamp || this.timestamp, this.length || 0))
        }
    },
})