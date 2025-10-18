import React from 'react';
import { useTranslation } from 'react-i18next';

export const EmptyState = () => {
    const { t } = useTranslation('dashboard');  
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white/50 rounded-lg">
            <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 14.4V33.6C42 40.8 38 44.8 30.8 44.8H17.2C10 44.8 6 40.8 6 33.6V14.4C6 7.2 10 3.2 17.2 3.2H30.8C38 3.2 42 7.2 42 14.4Z" stroke="#667085" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.96002 16.4188H41.04" stroke="#667085" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.04 3.21875V15.1388" stroke="#667085" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M28.96 3.21875V14.2388" stroke="#667085" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h3 className="text-[#101828] text-lg font-roboto font-medium mb-1">
                {t('noPresentationsYet')}
            </h3>
            <p className="text-[#667085] text-base font-roboto">
                {t('startCreatingFirstOne')}
            </p>
        </div>
    );
}; 