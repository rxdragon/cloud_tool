import { IDENTIFY } from '@/api/cloudApi'

const levelConfig = {
  [IDENTIFY.BLUE]: [
    {
      level: 1,
      needExp: 800,
      needReturnQuota: 2,
      needRetouchTime: 15
    },
    {
      level: 2,
      needExp: 2000,
      needReturnQuota: 1.8,
      needRetouchTime: 12
    },
    {
      level: 3,
      needExp: 3500,
      needReturnQuota: 1.6,
      needRetouchTime: 10
    },
    {
      level: 4,
      needExp: 7000,
      needReturnQuota: 1.4,
      needRetouchTime: 8
    },
    {
      level: 5,
      needExp: 11000,
      needReturnQuota: 1.2,
      needRetouchTime: 7.5
    },
    {
      level: 6,
      needExp: 20000,
      needReturnQuota: 1,
      needRetouchTime: 7
    },
    {
      level: 7,
      needExp: 30000,
      needReturnQuota: 1,
      needRetouchTime: 7
    },
    {
      level: 8,
      needExp: 42000,
      needReturnQuota: 0.8,
      needRetouchTime: 6.5
    },
    {
      level: 9,
      needExp: 55000,
      needReturnQuota: 0.8,
      needRetouchTime: 6.5
    },
    {
      level: 10,
      needExp: 70000,
      needReturnQuota: 0.5,
      needRetouchTime: 6
    },
    {
      level: 11,
      needExp: '',
      needReturnQuota: '',
      needRetouchTime: ''
    }
  ],
  [IDENTIFY.MASTER]: [
    {
      level: 1,
      needExp: 800,
      needReturnQuota: 2,
      needRetouchTime: 12
    },
    {
      level: 2,
      needExp: 2000,
      needReturnQuota: 1.8,
      needRetouchTime: 12
    },
    {
      level: 3,
      needExp: 3500,
      needReturnQuota: 1.6,
      needRetouchTime: 12
    },
    {
      level: 4,
      needExp: 7000,
      needReturnQuota: 1.4,
      needRetouchTime: 12
    },
    {
      level: 5,
      needExp: 11000,
      needReturnQuota: 1.2,
      needRetouchTime: 12
    },
    {
      level: 6,
      needExp: 20000,
      needReturnQuota: 1,
      needRetouchTime: 12
    },
    {
      level: 7,
      needExp: 30000,
      needReturnQuota: 1,
      needRetouchTime: 12
    },
    {
      level: 8,
      needExp: 42000,
      needReturnQuota: 0.8,
      needRetouchTime: 12
    },
    {
      level: 9,
      needExp: 55000,
      needReturnQuota: 0.8,
      needRetouchTime: 12
    },
    {
      level: 10,
      needExp: 70000,
      needReturnQuota: 0.5,
      needRetouchTime: 12
    },
    {
      level: 11,
      needExp: '',
      needReturnQuota: '',
      needRetouchTime: 12
    }
  ],
  [IDENTIFY.MAINTO]: [
    {
      level: 1,
      needExp: 800,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 2,
      needExp: 2000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 3,
      needExp: 3500,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 4,
      needExp: 7000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 5,
      needExp: 11000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 6,
      needExp: 20000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 7,
      needExp: 30000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 8,
      needExp: 42000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 9,
      needExp: 55000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 10,
      needExp: 70000,
      needReturnQuota: '',
      needRetouchTime: ''
    },
    {
      level: 11,
      needExp: '',
      needReturnQuota: '',
      needRetouchTime: ''
    }
  ]
}

export default levelConfig
