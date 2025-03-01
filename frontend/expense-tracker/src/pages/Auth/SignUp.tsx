import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { useState, useContext } from 'react';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUser } from '../../hooks/useUser';
import uploadImage from '../../utils/uploadImage';
import { ThemeContext } from '../../context/ThemeContext';

const SignUp = () => {

    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { updateUser } = useUser();
    const { isDarkMode } = useContext(ThemeContext);

    //handle Sign Up form submit
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        let profileImageUrl = '';

        if (!fullName) {
            setError('Please enter your name.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please provide a valide email address.');
            return;
        }

        if (!password) {
            setError('Please enter a password.');
            return;
        }

        if (password.length < 8) {
            setError('Please enter a password at least 8 characters.');
            return;
        }

        setError('');

        //Sign Up API call
        try {

            if (profilePic) {
                const imageUploadRes = await uploadImage(profilePic);
                profileImageUrl = imageUploadRes.data.imageUrl;
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
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
            <div className='w-full px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center py-8 sm:py-12'>
                <h3 className={`text-xl sm:text-2xl font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-black'
                }`}>
                    Create an Account
                </h3>

                <p className={`text-sm mb-8 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-700'
                }`}>
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="flex justify-center mb-6">
                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    </div>

                    <div className='space-y-4'>
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            label='Full Name'
                            placeholder='John Doe'
                            type='text'
                        />

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label='Email Address'
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
                    </div>

                    {error && (
                        <p className='text-red-500 text-sm mt-2'>{error}</p>
                    )}

                    <button
                        onClick={handleSignUp}
                        className={`w-full py-3 rounded-lg bg-violet-600 text-white font-medium mt-6 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${
                            isDarkMode ? 'hover:bg-violet-500' : 'hover:bg-violet-700'
                        }`}
                        type='submit'>
                        Create Account
                    </button>

                    <p className={`text-sm text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-800'
                    }`}>
                        Already have an account?{' '}
                        <Link className='font-medium text-primary hover:text-violet-500 transition-colors duration-300' to='/login'>
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;