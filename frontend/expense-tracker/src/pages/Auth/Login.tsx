import { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

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
        
    };
    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>
                    Welcome Back
                </h3>

                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
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

                    {
                        error && (
                            <p className='text-red-500 text-xs pb-2.5'>{error}</p>
                        )
                    }

                    <button
                        onClick={handleLogin}
                        className='btn-primary'
                        type='submit'>
                        LOGIN
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{' '}
                        <Link className='font-medium text-primary underline' to='/signUp'>
                            Sign Up
                        </Link>
                    </p>


                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;