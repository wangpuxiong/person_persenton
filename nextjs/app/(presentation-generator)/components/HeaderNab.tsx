"use client";
import { LayoutDashboard, PresentationIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent, MixpanelEvent } from "@/utils/mixpanel";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

const HeaderNav = () => {
  const { t } = useTranslation('common')
  
  const canChangeKeys = useSelector((state: RootState) => state.userConfig.can_change_keys);
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/upload"
        prefetch={true}
        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-indigo-500 rounded-md transition-colors outline-none"
        role="menuitem"
        onClick={() => trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/upload" })}
      >
        <PresentationIcon className="w-5 h-5" />
        <span className="text-sm font-medium font-inter">
          {t('nav.upload') || 'Upload'}
        </span>
      </Link>
      <Link
        href="/dashboard"
        prefetch={true}
        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-indigo-500 rounded-md transition-colors outline-none"
        role="menuitem"
        onClick={() => trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/dashboard" })}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-sm font-medium font-inter">
          {t('nav.dashboard') || 'Dashboard'}
        </span>
      </Link>
      {/* Settings 链接已被屏蔽 */}
    </div>
  );
};

export default HeaderNav;
