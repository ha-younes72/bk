const validation = {
  email: {
    presence: {
      message: '^لطفا آدرس پست الکترونیکی خود را وارد کنید'
    },
    email: {
      message: '^لطفا پست الکترونیکی با فرمت صحیح را وارد کنید'
    }
  },

  firstname: {
    presence: {
      message: '^Please enter a first name'
    },
    length: {
      minimum: 2,
      message: '^Please enter a first name'
    }
  },

  name: {
    presence: {
      message: '^لطفا نام خود را وارد کنید'
    },
    length: {
      minimum: 2,
      message: '^لطفا نام خود را درست وارد کنید'
    }
  },
  password: {
    presence: {
      message: '^لطفا رمز عبور خود را وارد کنید'
    },
    length: {
      minimum: 6,
      message: '^رمز عبور شماباید حداقل ۶ رقمی باشد'
    }
  },

  mobile: {
    presence: {
      message: '^لطفا شماره موبایل حود را وارد کنید'
    },
    length: {
      minimum: 11,
      maximum: 11,
      message: '^شماره موبایل ۱۱ رقمی خود را وارد کنید'
    }
  }
}

export default validation