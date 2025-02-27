import React from 'react';
import { getInitials } from '../../utils/helper';

type Props = {
    fullName: string | undefined;
    width: string;
    height: string;
    style: string;
}

const CharAvatar = ({ fullName, width, height, style }: Props) => {
    return (
        <div
            className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
            {getInitials(fullName || '')}
        </div>
    );
};

export default CharAvatar;