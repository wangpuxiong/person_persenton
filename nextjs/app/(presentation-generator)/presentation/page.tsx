'use client'
import React from "react";
import { useTranslation } from "react-i18next";
import PresentationPage from "./components/PresentationPage";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const { t } = useTranslation("presentation");
  const router = useRouter();
  const params = useSearchParams();
  const queryId = params.get("id");
  if (!queryId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">{t("no_presentation_id_found")}</h1>
        <p className="text-gray-500 pb-4">{t("please_try_again")}</p>
        <Button onClick={() => router.push("/dashboard")} className="bg-indigo-600 text-white hover:bg-indigo-500">{t("go_to_home")}</Button>
      </div>
    );
  }
  return (

    <PresentationPage presentation_id={queryId} />

  );
};
export default page;
