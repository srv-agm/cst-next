// 'use server';

// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { z } from 'zod';

// export type validationError = {
//   username?: string[] | undefined;
//   password?: string[] | undefined;
// };

// export type ServerError = { message?: any };

// export type LoginFormState = {
//   errors: validationError | ServerError;
// };

// const schema = z.object({
//   username: z
//     .string({
//       required_error: 'Email is required',
//       invalid_type_error: 'Invalid Email',
//     })
//     .email('Invalid format'),
//   password: z
//     .string({
//       required_error: 'Password is required',
//       invalid_type_error: 'Invalid Password',
//     })
//     .min(8, 'Too short!'),
// });

// export async function loginAction(
//   _: LoginFormState,
//   formData: FormData
// ): Promise<LoginFormState> {
//   const username = formData.get('username') + '';
//   const password = formData.get('password') + '';
//   const validatedFields = schema.safeParse({ username, password });
//   if (!validatedFields.success) {
//     return { errors: validatedFields.error.flatten().fieldErrors };
//   }
//   console.log('LOGIN:', username);
//   const url = process.env.BASE_API_DOMAIN + '/login';
//   let token, route, pkg;
//   try {
//     const USER = await fetch(url, {
//       method: 'POST',
//       credentials: 'include',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: new URLSearchParams({ username, password }),
//     }).then(async r => {
//       if ([200, 400].includes(r.status)) return r.json();
//       else throw new Error('Server Error');
//     });
//     if (!USER.token) return { errors: { message: USER.message } };
//     cookies().set('token', USER.token, {
//       httpOnly: true,
//       secure: true,
//       expires: 10700,
//       maxAge: 10700,
//     });
//     token = USER.token;
//     route = USER.menu_route;
//     pkg = USER.package.package_name;
//   } catch (error) {
//     console.log(error);
//     return { errors: { message: 'please try after sometime' } };
//   }
//   const p = new URLSearchParams({ package: pkg });
//   redirect(route + '?' + p.toString());
// }
