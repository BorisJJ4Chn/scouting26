import { ALLIANCE } from '../constants'

export const positions = {
    [ALLIANCE.RED]: {
        '爬升开始': { top: '42%', left: '3%' },
        '左爬': { top: '42%', left: '15%' },
        '中爬': { top: '50%', left: '15%' },
        '右爬': { top: '58%', left: '15%' },

        '成功': { top: '50%', left: '3%' },
        '失败': { top: '58%', left: '3%' },

        '吸中场': { top: '18%', left: '74%' },
        '吸DEPOT': { top: '26%', left: '21%' },
        '吸OUTPOST': { top: '84%', left: '16%' },

        '出程：洞': { top: '10%', left: '48%' },
        '回程：洞': { top: '85%', left: '48%' },
        '出程：坡': { top: '30%', left: '48%' },
        '回程：坡': { top: '65%', left: '48%' },

        '中切': { top: '47%', left: '61%' },
        '球阵角': { top: '70%', left: '61%' },
        '边切': { top: '76%', left: '73%' },

        '撞车': { top: '47%', left: '88%' },

        'PreLoad没射': { top: '15%', left: '3%' },
        'PreLoad射丢': { top: '23%', left: '3%' },
        'PreLoad全进': { top: '31%', left: '3%' },

        'hub下': { top: '47%', left: '45%' },
        '线后': { top: '75%', left: '38%' },
        '靠塔': { top: '50%', left: '27%' },
        '任意': { top: '15%', left: '29%' },

        '计时器': { top: '8%', left: '3%' },

        '自动结束': { top: '1%', left: '3%' },
    },
    [ALLIANCE.BLUE]: {
        '爬升开始': { top: '36%', left: '86%' },
        '左爬': { top: '52%', left: '74%' },
        '中爬': { top: '44%', left: '74%' },
        '右爬': { top: '36%', left: '74%' },

        '成功': { top: '52%', left: '86%' },
        '失败': { top: '44%', left: '86%' },

        '吸中场': { top: '18%', left: '16%' },
        '吸DEPOT': { top: '68%', left: '70%' },
        '吸OUTPOST': { top: '10%', left: '75%' },

        '出程：洞': { top: '10%', left: '42%' },
        '回程：洞': { top: '85%', left: '42%' },
        '出程：坡': { top: '30%', left: '42%' },
        '回程：坡': { top: '65%', left: '42%' },

        '中切': { top: '47%', left: '28%' },
        '球阵角': { top: '70%', left: '28%' },
        '边切': { top: '76%', left: '17%' },

        '撞车': { top: '47%', left: '3%' },

        'PreLoad没射': { top: '65%', left: '86%' },
        'PreLoad射丢': { top: '73%', left: '86%' },
        'PreLoad全进': { top: '81%', left: '86%' },

        'hub下': { top: '47%', left: '45%' },
        '线后': { top: '75%', left: '52%' },
        '靠塔': { top: '44%', left: '62%' },
        '任意': { top: '15%', left: '60%' },

        '计时器': { top: '8%', left: '3%' },

        '自动结束': { top: '1%', left: '3%' },
    }
}
