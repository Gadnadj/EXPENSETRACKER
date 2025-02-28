import { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUser } from '../../hooks/useUser';
import { ThemeContext } from '../../context/ThemeContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { isDarkMode } = useContext(ThemeContext);

    const navigate = useNavigate();
    const { updateUser } = useUser();

    //handle login form submit
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setError('Please enter the password');
            return;
        }

        if (password.length < 8) {
            setError('Please enter at least 6 characters.');
            return;
        }

        setError('');

        //Login API call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard');
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError('Something went wrong. Please try again');
            }
        }
    };

    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-black'
                }`}>
                    Welcome Back
                </h3>

                <p className={`text-xs mt-[5px] mb-6 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-700'
                }`}>
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label='Email Adress'
                        placeholder='john@example.com'
                        type='text'
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label='Password'
                        placeholder='********'
                        type='password'
                    />

                    {error && (
                        <p className='text-red-500 text-xs pb-2.5'>{error}</p>
                    )}

                    <button
                        onClick={handleLogin}
                        className={`btn-primary transition-colors duration-300 ${
                            isDarkMode ? 'hover:bg-violet-500' : 'hover:bg-violet-600'
                        }`}
                        type='submit'>
                        LOGIN
                    </button>

                    <p className={`text-[13px] mt-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-800'
                    }`}>
                        Don't have an account?{' '}
                        <Link className='font-medium text-primary underline hover:text-violet-500' to='/signUp'>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;