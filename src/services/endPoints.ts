// export const BASE_URL = 'https://sowlab.com/assignment/user';

// export const LoginApi = BASE_URL + '/login';
// export const SignupApi = BASE_URL + '/register';
// export const ForgotPassApi = BASE_URL + '/forgot-password';
// export const VerifyOtpApi = BASE_URL + '/verify-otp';
// export const ResetPassApi = BASE_URL + '/reset-password';

export const BASE_URL = 'http://localhost:3000/api';
export const socket = 'http://localhost:3000';

export const SignupApi = BASE_URL + '/auth/register';
export const LoginApi = BASE_URL + '/auth/login';
export const GoogleLoginApi = BASE_URL + '/auth/googlelogin';
export const AddEmployeApi = BASE_URL + '/admin/addemploye';
export const AddTaskApi = BASE_URL + '/admin/addTask';
export const AddTeamApi = BASE_URL + '/admin/addTeam';
export const GetAllEmployeApi = BASE_URL + '/admin/getAllEmployes';
export const GetAllProjectsApi = BASE_URL + '/admin/getAllProjects';
export const GetAllTeamsApi = BASE_URL + '/admin/getAllTeams';
export const GetAllTasksApi = BASE_URL + '/admin/getAllTasks';
export const EditTasksApi = (id: string) => BASE_URL + `/admin/editTask/${id}`;
