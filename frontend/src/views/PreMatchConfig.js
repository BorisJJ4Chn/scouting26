import { ALLIANCE } from '../constants'

export const prematchPositions = {
    [ALLIANCE.RED]: {
        '左台': { top: '8%', left: '12%' },
        '中台': { top: '28%', left: '12%' },
        '右台': { top: '63%', left: '12%' },
        '左洞': { top: '5%', left: '42%' },
        '左坡': { top: '24%', left: '42%' },
        'Hub': { top: '42%', left: '42%' },
        '右坡': { top: '60%', left: '42%' },
        '右洞': { top: '80%', left: '42%' },
        'confirm': { top: '80%', left: '80%' }
    },
    [ALLIANCE.BLUE]: {
        '左台': { top: '76%', left: '82%' },
        '中台': { top: '56%', left: '82%' },
        '右台': { top: '22%', left: '82%' },
        '左洞': { top: '80%', left: '52%' },
        '左坡': { top: '60%', left: '52%' },
        'Hub': { top: '42%', left: '52%' },
        '右坡': { top: '24%', left: '52%' },
        '右洞': { top: '5%', left: '52%' },
        'confirm': { top: '80%', left: '6%' }
    },
}