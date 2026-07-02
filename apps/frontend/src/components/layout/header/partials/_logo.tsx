"use client";
import { useMemo } from "react"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type JSX, type FunctionComponent } from "react";
import useFlag from "@/useFlag";

const BASSPRO_LOGO = "https://assetshare.basspro.com/content/dam/bps-general-assets/web/site-elements/images/Redesign/Header/bass-pro-logo-2x.png";

type LogoProps = JSX.IntrinsicElements["a"] & {
  logo?: string;
};

export const Logo: FunctionComponent<LogoProps> = ({
  logo = BASSPRO_LOGO,
  ...divProps
}) => {
  const pathname = usePathname();
  // Create a stable default value that doesn't change every render
  const defaultValue = useMemo(() => { return { logo, theme_switcher: false } }, [ logo ])
  // Get the logo configuration
  const { logo: flagLogoUrl } = useFlag("layout_configuration", defaultValue);

  const logoUrl = pathname?.startsWith("/support/basspro") ? BASSPRO_LOGO : flagLogoUrl;

  return (
    <Link href="/" className="flex items-center grow-0 shrink-0" {...divProps}>
      <Image
        src={logoUrl}
        alt="Bass Pro Shops Logo"
        fill
        unoptimized
        priority
        className="dark:brightness-0	dark:invert !w-auto !h-12 !relative"
      />
    </Link>
  );
};

Logo.displayName = "Logo";

export default Logo;
