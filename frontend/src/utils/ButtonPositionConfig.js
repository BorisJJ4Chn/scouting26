import { ALLIANCE } from '../constants.js'
import { useRobotStateStore } from '../store/RobotState.js'

export const positions = {
    common: {
        '询问Hub闪烁': { top: '10%', bottom: '50%', left: '10%', right: '10%' },
        'red-Hub闪烁': { top: '55%', bottom: '15%', left: '10%', right: '55%' },
        'blue-Hub闪烁': { top: '55%', bottom: '15%', left: '55%', right: '10%' },
    },
    [ALLIANCE.RED]: {
        '爬升开始': { top: '42%', bottom: '52%', left: '3%', right: '87%' },
        '左爬': { top: '42%', bottom: '52%', left: '15%', right: '75%' },
        '中爬': { top: '50%', bottom: '44%', left: '15%', right: '75%' },
        '右爬': { top: '58%', bottom: '36%', left: '15%', right: '75%' },

        '成功': { top: '50%', bottom: '44%', left: '3%', right: '87%' },
        '失败': { top: '58%', bottom: '36%', left: '3%', right: '87%' },

        '吸中场': { top: '10%', bottom: '84%', left: '64%', right: '26%' },
        '吸DEPOT': { top: '26%', bottom: '68%', left: '21%', right: '69%' },
        '吸OUTPOST': { top: '84%', bottom: '10%', left: '16%', right: '74%' },

        '出程：洞': { top: '10%', bottom: '84%', left: '48%', right: '42%' },
        '回程：洞': { top: '85%', bottom: '9%', left: '48%', right: '42%' },
        '出程：坡': { top: '30%', bottom: '64%', left: '48%', right: '42%' },
        '回程：坡': { top: '65%', bottom: '29%', left: '48%', right: '42%' },

        '中切': { top: '47%', bottom: '47%', left: '61%', right: '29%' },
        '球阵角': { top: '70%', bottom: '24%', left: '61%', right: '29%' },
        '边切': { top: '76%', bottom: '18%', left: '73%', right: '17%' },

        '撞车': { top: '10%', bottom: '84%', left: '88%', right: '2%' },

        '放弃': { top: '82%', bottom: '2%', left: '3%', right: '87%' },
        '被防守': { top: '21%', bottom: '73%', left: '3%', right: '87%' },
        '跑打': { top: '29%', bottom: '65%', left: '3%', right: '87%' },

        'PreLoad没射': { top: '68%', bottom: '26%', left: '3%', right: '87%' },
        'PreLoad射丢': { top: '76%', bottom: '18%', left: '3%', right: '87%' },
        'PreLoad全进': { top: '84%', bottom: '10%', left: '3%', right: '87%' },

        'hub下': { top: '47%', bottom: '47%', left: '45%', right: '45%' },
        '线后': { top: '75%', bottom: '19%', left: '38%', right: '52%' },
        '靠塔': { top: '50%', bottom: '44%', left: '27%', right: '63%' },
        '任意': { top: '15%', bottom: '79%', left: '29%', right: '61%' },
        '射球准确率': { top: '32%', bottom: '64%', left: '29%', right: '61%' },

        '当前状态': { top: '2%', bottom: '92%', left: '3%', right: '87%' },
        '计时器': { top: '10%', bottom: '84%', left: '3%', right: '87%' },
        '自动结束': { top: '18%', bottom: '76%', left: '3%', right: '87%' },


        '左台': { top: '8%', bottom: '77%', left: '12%', right: '82%' },
        '中台': { top: '28%', bottom: '57%', left: '12%', right: '82%' },
        '右台': { top: '63%', bottom: '22%', left: '12%', right: '82%' },

        '左洞': { top: '6%', bottom: '79%', left: '42%', right: '52%' },
        '左坡': { top: '24%', bottom: '61%', left: '42%', right: '52%' },
        'Hub': { top: '42%', bottom: '43%', left: '42%', right: '52%' },
        '右坡': { top: '60%', bottom: '25%', left: '42%', right: '52%' },
        '右洞': { top: '80%', bottom: '5%', left: '42%', right: '52%' },
        'confirm': { top: '80%', bottom: '10%', left: '80%', right: '10%' }
    },
    [ALLIANCE.BLUE]: {
        '爬升开始': { top: '36%', bottom: '58%', left: '86%', right: '4%' },
        '左爬': { top: '52%', bottom: '42%', left: '74%', right: '16%' },
        '中爬': { top: '44%', bottom: '50%', left: '74%', right: '16%' },
        '右爬': { top: '36%', bottom: '58%', left: '74%', right: '16%' },

        '成功': { top: '52%', bottom: '42%', left: '86%', right: '4%' },
        '失败': { top: '44%', bottom: '50%', left: '86%', right: '4%' },

        '吸中场': { top: '10%', bottom: '84%', left: '16%', right: '74%' },
        '吸DEPOT': { top: '68%', bottom: '26%', left: '70%', right: '20%' },
        '吸OUTPOST': { top: '10%', bottom: '84%', left: '75%', right: '15%' },

        '出程：洞': { top: '10%', bottom: '84%', left: '42%', right: '48%' },
        '回程：洞': { top: '85%', bottom: '9%', left: '42%', right: '48%' },
        '出程：坡': { top: '30%', bottom: '64%', left: '42%', right: '48%' },
        '回程：坡': { top: '65%', bottom: '29%', left: '42%', right: '48%' },

        '中切': { top: '47%', bottom: '47%', left: '28%', right: '62%' },
        '球阵角': { top: '70%', bottom: '24%', left: '28%', right: '62%' },
        '边切': { top: '76%', bottom: '18%', left: '17%', right: '73%' },

        '撞车': { top: '10%', bottom: '84%', left: '3%', right: '87%' },

        '放弃': { top: '82%', bottom: '2%', left: '86%', right: '4%' },
        '被防守': { top: '63%', bottom: '31%', left: '86%', right: '4%' },
        '跑打': { top: '71%', bottom: '23%', left: '86%', right: '4%' },

        'PreLoad没射': { top: '65%', bottom: '29%', left: '86%', right: '4%' },
        'PreLoad射丢': { top: '73%', bottom: '21%', left: '86%', right: '4%' },
        'PreLoad全进': { top: '81%', bottom: '13%', left: '86%', right: '4%' },

        'hub下': { top: '47%', bottom: '47%', left: '45%', right: '45%' },
        '线后': { top: '75%', bottom: '19%', left: '52%', right: '38%' },
        '靠塔': { top: '44%', bottom: '50%', left: '62%', right: '28%' },
        '任意': { top: '15%', bottom: '79%', left: '60%', right: '30%' },

        '当前状态': { top: '2%', bottom: '92%', left: '89%', right: '1%' },
        '计时器': { top: '10%', bottom: '84%', left: '89%', right: '1%' },
        '自动结束': { top: '18%', bottom: '76%', left: '89%', right: '1%' },


        '左台': { top: '76%', bottom: '9%', left: '82%', right: '12%' },
        '中台': { top: '56%', bottom: '29%', left: '82%', right: '12%' },
        '右台': { top: '22%', bottom: '63%', left: '82%', right: '12%' },

        '左洞': { top: '80%', bottom: '5%', left: '52%', right: '42%' },
        '左坡': { top: '60%', bottom: '25%', left: '52%', right: '42%' },
        'Hub': { top: '42%', bottom: '43%', left: '52%', right: '42%' },
        '右坡': { top: '24%', bottom: '61%', left: '52%', right: '42%' },
        '右洞': { top: '5%', bottom: '80%', left: '52%', right: '42%' },
        'confirm': { top: '80%', bottom: '10%', left: '6%', right: '84%' }
    }
}

export const getButtonPosition = (buttonName) => {
    const store = useRobotStateStore()
    return positions['common'][buttonName] || positions[store.alliance][buttonName] || { top: '0%', left: '0%' }
}
