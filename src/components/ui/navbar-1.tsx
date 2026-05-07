'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useLocation,
} from 'react-router-dom'

import {
  AnimatePresence,
  motion,
} from 'framer-motion'

import {
  Activity,
  ArrowRight,
  BarChart3,
  FlaskConical,
  Home,
  Menu,
  X,
} from 'lucide-react'

import { cn } from '@/lib/utils'

/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: Home,
  },

  {
    name: 'Assessment',
    path: '/assessment',
    icon: Activity,
  },

  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: BarChart3,
  },

  {
    name: 'Protocol',
    path: '/demo',
    icon: FlaskConical,
  },
]

/* =========================================================
   COMPONENT
========================================================= */

const Navbar1 = () => {

  const navigate =
    useNavigate()

  const location =
    useLocation()

  const [isOpen, setIsOpen] =
    useState(false)

  const [hidden, setHidden] =
    useState(false)

  const [lastScrollY, setLastScrollY] =
    useState(0)

  /* =====================================================
     SMART HIDE
  ===================================================== */

  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY =
        window.scrollY

      const scrollDelta =
        currentScrollY - lastScrollY

      if (
        currentScrollY > 120 &&
        scrollDelta > 8
      ) {
        setHidden(true)
      }

      if (scrollDelta < -8) {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )

  }, [lastScrollY])

  /* =====================================================
     NAVIGATE
  ===================================================== */

  const handleNavigate = (
    path: string
  ) => {

    navigate(path)

    setIsOpen(false)
  }

  return (
    <>

      {/* =================================================
          DESKTOP NAVBAR
      ================================================= */}

      <motion.div
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          sticky top-0 z-[100]

          w-full

          px-4 pt-5
        "
      >

        <div
          className="
            mx-auto
            max-w-[1280px]
          "
        >

          <header
            role="banner"
            className="
              relative

              flex items-center justify-between

              h-[72px]

              rounded-[24px]

              border border-black/[0.05]

              bg-white/82

              px-5 md:px-6

              backdrop-blur-2xl

              shadow-[0_8px_30px_rgba(0,0,0,0.035)]
            "
          >

            {/* =========================================
                LEFT
            ========================================= */}

            <button
              onClick={() =>
                handleNavigate('/')
              }
              className="
                flex items-center gap-4
              "
            >

              {/* LOGO */}
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center

                  rounded-2xl

                  bg-[#111827]

                  text-[12px]
                  font-semibold

                  text-white
                "
              >
                MW
              </div>

              {/* BRAND */}
              <div className="hidden sm:block text-left">

                <div
                  className="
                    text-[16px]
                    font-semibold

                    tracking-[-0.03em]

                    text-[#111827]
                  "
                >
                  MoveWell
                </div>

                <div
                  className="
                    mt-[1px]

                    text-[12px]

                    text-[#6B7280]
                  "
                >
                  Movement Intelligence
                </div>

              </div>

            </button>

            {/* =========================================
                NAVIGATION
            ========================================= */}

            <nav
              aria-label="Main"
              className="
                hidden md:flex
                items-center gap-1
              "
            >

              {navItems.map((item) => {

                const isActive =
                  location.pathname ===
                  item.path

                const Icon = item.icon

                return (
                  <button
                    key={item.name}
                    onClick={() =>
                      handleNavigate(
                        item.path
                      )
                    }
                    aria-current={
                      isActive
                        ? 'page'
                        : undefined
                    }
                    className={cn(

                      `
                      relative

                      flex items-center gap-2

                      h-10

                      rounded-xl

                      px-4

                      text-[13px]
                      font-medium

                      tracking-[-0.01em]

                      transition-all duration-200
                      `,

                      isActive
                        ? `
                          text-[#111827]
                          `
                        : `
                          text-[#6B7280]
                          hover:text-[#111827]
                          `
                    )}
                  >

                    {/* ACTIVE SURFACE */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="
                          absolute inset-0

                          rounded-xl

                          bg-black/[0.04]
                        "
                      />
                    )}

                    <div
                      className="
                        relative z-10

                        flex items-center gap-2
                      "
                    >

                      <Icon
                        size={15}
                        strokeWidth={
                          isActive
                            ? 2.3
                            : 2
                        }
                      />

                      <span>
                        {item.name}
                      </span>

                    </div>

                  </button>
                )
              })}

            </nav>

            {/* =========================================
                RIGHT
            ========================================= */}

            <div
              className="
                flex items-center gap-3
              "
            >

              {/* CTA */}
              <button
                onClick={() =>
                  handleNavigate(
                    '/assessment'
                  )
                }
                className="
                  hidden lg:flex
                  items-center gap-2

                  h-11

                  rounded-2xl

                  bg-[#111827]

                  px-5

                  text-[13px]
                  font-medium

                  tracking-[-0.01em]

                  text-white

                  transition-colors duration-200

                  hover:bg-black
                "
              >

                Begin assessment

                <ArrowRight
                  size={16}
                />

              </button>

              {/* MOBILE */}
              <button
                onClick={() =>
                  setIsOpen(true)
                }
                aria-label="Open Menu"
                aria-expanded={isOpen}
                className="
                  flex h-11 w-11
                  items-center justify-center

                  rounded-2xl

                  border border-black/[0.05]

                  bg-white

                  text-[#111827]

                  transition-colors duration-200

                  hover:bg-black/[0.03]

                  md:hidden
                "
              >

                <Menu size={20} />

              </button>

            </div>

          </header>

        </div>

      </motion.div>

      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.18,
            }}
            className="
              fixed inset-0 z-[200]

              bg-[#F7F8F6]/96

              backdrop-blur-2xl
            "
          >

            <motion.div
              initial={{
                x: '100%',
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '100%',
              }}
              transition={{
                type: 'spring',
                damping: 34,
                stiffness: 320,
              }}
              className="
                flex h-full flex-col

                px-6 py-6
              "
            >

              {/* TOP */}
              <div
                className="
                  flex items-center justify-between
                "
              >

                <div
                  className="
                    flex items-center gap-4
                  "
                >

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center

                      rounded-2xl

                      bg-[#111827]

                      text-[12px]
                      font-semibold

                      text-white
                    "
                  >
                    MW
                  </div>

                  <div>

                    <div
                      className="
                        text-[16px]
                        font-semibold

                        tracking-[-0.03em]
                      "
                    >
                      MoveWell
                    </div>

                    <div
                      className="
                        mt-[1px]

                        text-[12px]

                        text-[#6B7280]
                      "
                    >
                      Movement Intelligence
                    </div>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setIsOpen(false)
                  }
                  aria-label="Close Menu"
                  className="
                    flex h-11 w-11
                    items-center justify-center

                    rounded-2xl

                    border border-black/[0.05]

                    bg-white
                  "
                >

                  <X size={20} />

                </button>

              </div>

              {/* NAV */}
              <div
                className="
                  flex flex-col gap-2

                  pt-12
                "
              >

                {navItems.map((
                  item,
                  index
                ) => {

                  const Icon =
                    item.icon

                  const isActive =
                    location.pathname ===
                    item.path

                  return (
                    <motion.button
                      key={item.name}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.04,
                      }}
                      onClick={() =>
                        handleNavigate(
                          item.path
                        )
                      }
                      className={cn(

                        `
                        flex items-center
                        justify-between

                        rounded-2xl

                        border

                        px-5 py-4

                        transition-all duration-200
                        `,

                        isActive
                          ? `
                            border-black/[0.06]

                            bg-black/[0.03]

                            text-[#111827]
                            `
                          : `
                            border-transparent

                            text-[#6B7280]
                          `
                      )}
                    >

                      <div
                        className="
                          flex items-center gap-4
                        "
                      >

                        <div
                          className="
                            flex h-10 w-10
                            items-center justify-center

                            rounded-xl

                            bg-black/[0.04]
                          "
                        >

                          <Icon size={18} />

                        </div>

                        <span
                          className="
                            text-[15px]
                            font-medium

                            tracking-[-0.02em]
                          "
                        >
                          {item.name}
                        </span>

                      </div>

                      <ArrowRight
                        size={16}
                      />

                    </motion.button>
                  )
                })}

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  )
}

export { Navbar1 }