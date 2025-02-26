import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { useState } from 'react';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

type Props = {}

const SignUp = (props: Props) => {

    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    //handle Sign Up form submit
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
                <h3 className='text-xl font-semibold text-black'>
                    Create an Account
                </h3>

                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp}>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                            label='Email Adress'
                            placeholder='john@example.com'
                            type='text'
                        />

                        <div className='col-span-2'>

                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label='Password'
                                placeholder='********'
                                type='password'
                            />
                        </div>


                    </div>

                    <button
                        onClick={handleSignUp}
                        className='btn-primary'
                        type='submit'>
                        Create Account
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>Have already an account?{' '}
                        <Link className='font-medium text-primary underline' to='/login'>
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;