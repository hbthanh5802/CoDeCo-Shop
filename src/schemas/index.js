import * as yup from 'yup';

const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const phoneNumberRule = /^0\d{9}$/;
const emailSchema = yup
  .string()
  .email('Email không hợp lệ')
  .required('Thông tin này không được để trống');

const passwordSchema = yup
  .string()
  .matches(passwordRule, {
    message: 'Mật khẩu phải có tối thiểu 6 ký tự, bao gồm cả chữ cái và số.',
  })
  .required('Thông tin này không được để trống');

const phoneNumberSchema = yup
  .string()
  .matches(phoneNumberRule, 'Số điện thoại không hợp lệ')
  .required('Thông tin này không được để trống');

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Thông tin này không được để trống'),
  lastName: yup.string().required('Thông tin này không được để trống'),
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'Bạn phải chấp nhận các điều khoản')
    .required('Bạn phải chấp nhận các điều khoản'),
});

const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required('Thông tin này không được để trống'),
});

const verifyEmailSchema = yup.object().shape({
  email: emailSchema,
});

const otpSize = import.meta.env.VITE_OTP_SIZE;
const otpObject = Array.from({ length: otpSize }).reduce((acc, _, index) => {
  acc[`number${index + 1}`] = yup.string().length(1).required();
  return acc;
}, {});
const otpSchema = yup.object().shape(otpObject);

const recoverPasswordSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Thông tin này không được để trống'),
});

export default {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  otpSchema,
  recoverPasswordSchema,
};
