"use client";
import { Spotlight } from "@/components/ui/Spotlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MemoizedStars } from "@/components/ui/text-reveal-card";
import { motion } from "framer-motion";
import { Feather, Goal, Mail, HeartPulseIcon, LogIn } from "lucide-react";
import Image from "next/image";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { getSession, signIn, signOut } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { User } from "next-auth";
import { authConfig } from "@/auth";
import Link from "next/link";

const words = `Ever wondered where all your money goes? Let EcoSpend be your financial GPS. With our intuitive tracking and insightful analytics, you'll never lose track of your expenses again. It’s time to transform your financial habits and take control of your future. Ready to save more, spend smarter, and reach your goals? Join EcoSpend today and start your journey to financial freedom!
`;
const HeroSection1 = () => {
  const [mobile, setMobile] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      setUser(session?.user || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, [mobile]);

  return (
    <HeroHighlight>
      <div className="mx-auto w-full md:w-11/12 flex justify-center items-center mt-4">
        <nav className="flex justify-center items-center gap-3 flex-wrap">
          <MemoizedStars />

          <HoverBorderGradient
            containerClassName="rounded-full "
            as="button"
            className="text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={() => {
              window.scrollTo({
                top: mobile
                  ? window.innerHeight * 2 - 90
                  : window.innerHeight * 2 + 100,
                behavior: "smooth",
              });
            }}
          >
            <HeartPulseIcon size={17} />
            <span>Features</span>
          </HoverBorderGradient>
          <HoverBorderGradient
            containerClassName="rounded-full "
            as="button"
            className="text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={() => {
              window.location.href = "";
            }}
          >
            <Mail size={17} />
            <Link href="https://devkrishnasai.vercel.app/">
              <span>Contact</span>
            </Link>
          </HoverBorderGradient>

          {!user && (
            <HoverBorderGradient
              containerClassName="rounded-full "
              as="button"
              className="text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              onClick={async () =>
                await signIn("google", {
                  callbackUrl: "/dashboard",
                  redirect: true,
                })
              }
            >
              <LogIn size={17} />
              <span>Sign In</span>
            </HoverBorderGradient>
          )}
        </nav>
      </div>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mt-24 md:h-full md:mt-28 w-screen text-xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex flex-col justify-center items-center"
      >
        {user ? (
          <HoverBorderGradient
            containerClassName="rounded-full "
            as="button"
            className="text-xs md:text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={() => window.location.replace("/dashboard")}
          >
            <Goal size={17} />
            <span>Get Started </span>
          </HoverBorderGradient>
        ) : (
          <HoverBorderGradient
            containerClassName="rounded-full "
            as="button"
            className="text-xs md:text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={async () =>
              await signIn("google", {
                callbackUrl: "/dashboard",
                redirect: true,
              })
            }
          >
            <Goal size={17} />
            <span>Get Started</span>
          </HoverBorderGradient>
        )}
        <Spotlight
          className="-top-[395px] left-0 md:left-52 -md:top-[510px]"
          fill="white"
        />
        <p className="text-2xl mt-1 lg:mt-1 md:text-4xl lg:text-5xl">
          EcoSpend
        </p>
        <p className="mt-1 lg:mt-0"> Take Charge of Your Financial Future</p>
        Track, Save, and Grow!
        <TextGenerateEffect className="mt-2 text-base" words={words} />
        <div className="mt-10 flex gap-4">
          <HoverBorderGradient
            containerClassName="rounded-full "
            as="button"
            className="text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={() => {
              window.scrollTo({
                top: mobile
                  ? window.innerHeight * 2 - 90
                  : window.innerHeight * 2 + 100,
                behavior: "smooth",
              });
            }}
          >
            <Feather size={17} />
            <span>Features</span>
          </HoverBorderGradient>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="text-sm dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={() => {
              window.location.href = "mailto:ambatikrishnasai1301@gmail.com";
            }}
          >
            <Mail size={17} />
            <span>Contact</span>
          </HoverBorderGradient>
        </div>
      </motion.h1>

      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  EcoSpend
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/dashboard.jpg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl  h-full object-left-top object-fill"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      <FeaturesSection />
      <MemoizedStars />
    </HeroHighlight>
  );
};

export default HeroSection1;

const FeaturesSection = () => {
  return (
    <BentoGrid className="max-w-4xl mx-auto z-10 cursor-pointer mb-10">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
};

const Skeleton = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    {children}
  </div>
);

const items = [
  {
    title: "Dark and Light Mode",
    description: "Choose between dark and light mode.",
    header: (
      <Skeleton>
        <Image
          src={`/darkAndLight.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl  h-full object-left-top bg-blend-hard-light"
          draggable={false}
        />
      </Skeleton>
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Create Categories",
    description: "Organize your expenses and income with ease.",
    header: (
      <Skeleton>
        <Image
          src={`/create-categories.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl  h-full object-left-top object-fill"
          draggable={false}
        />
      </Skeleton>
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Date Range Picker",
    description: "Filter your transactions by date range.",
    header: (
      <Skeleton>
        <Image
          src={`/date-range.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl  h-full object-left-top object-fill"
          draggable={false}
        />
      </Skeleton>
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Transaction Details",
    description:
      "View detailed information about your transactions in a formatted way.",
    header: (
      <Skeleton>
        <Image
          src={`/table.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl  h-full object-left-top object-fill"
          draggable={false}
        />
      </Skeleton>
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Emoji Picker",
    description: "Express your transactions with emojis.",
    header: (
      <Skeleton>
        <Image
          src={`/emojipicker.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl  h-full object-left-top object-fill"
          draggable={false}
        />
      </Skeleton>
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Categories Overview",
    description:
      "Get a quick glance at your spending habits and financial health.",
    header: (
      <Skeleton>
        <Image
          src={`/categories.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl  h-full object-left-top object-fill"
          draggable={false}
        />
      </Skeleton>
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Expenses and Incomes in a graphical way",
    description: "Visualize your financial data in a beautiful way.",
    header: (
      <Skeleton>
        <Image
          src={`/graph.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl  h-full object-left-top object-fill"
          draggable={false}
        />
      </Skeleton>
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
