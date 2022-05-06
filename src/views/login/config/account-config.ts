export const rules = {
  name: [
    {
      required: true,
      message: '账号是必输入项',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '请输入5到10位',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必输入项',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,12}$/,
      message: '请输入6到12位密码',
      trigger: 'blur'
    }
  ]
}
