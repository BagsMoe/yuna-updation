// import * as yup from "yup";

// export const loginSchema = yup.object({
//   npk: yup
//     .string()
//     .required("NPK wajib diisi")
//     .matches(/^\d{6}$/, "NPK harus 6 digit angka"),
//   password: yup
//     .string()
//     .required("Password wajib diisi")
//     .min(6, "Password minimal 6 karakter"),
//   remember: yup.boolean().notRequired(),
// });

import * as yup from 'yup';

export const loginSchema = yup.object({
  npk: yup.string().required('NPK wajib diisi'),
  password: yup.string().required('Kata sandi wajib diisi'),
  remember: yup.boolean().default(false).required(),
});