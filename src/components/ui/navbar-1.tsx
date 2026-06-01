"use client"

import {
  useEffect,
  useState
} from "react"

import {
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom"

import {
  motion,
  AnimatePresence
} from "framer-motion"

import {
  Menu,
  X,
  Home,
  Activity,
  BarChart3,
  FlaskConical,
  Workflow,
  ArrowRight,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Assessment",
    path: "/assessment",
    icon: Activity,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Content",
    path: "/content",
    icon: Workflow,
  },
  {
    name: "Protocol",
    path: "/demo",
    icon: FlaskConical,
  },
]

const Navbar1 = () => {

  const [isOpen, setIsOpen] =
    useState(false)

  const [hidden, setHidden] =
    useState(false)

  const [lastScrollY, setLastScrollY] =
    useState(0)

  const navigate = useNavigate()

  const location = useLocation()

  /* =========================
     SMART NAV HIDE
  ========================= */
  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY =
        window.scrollY

      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 120
      ) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )

  }, [lastScrollY])

  const handleNavigate = (
    path: string
  ) => {

    navigate(path)

    setIsOpen(false)

  }

  return (
    <>


      {/* DESKTOP NAV */}
      <motion.div
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          sticky top-0 z-[100]
          w-full px-4 pt-5
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: -10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto max-w-[1280px]
          "
        >

          <header
            role="banner"
            className={cn(
              "relative flex items-center justify-between",
              "h-[74px]",
              "rounded-[28px]",
              "border border-black/[0.05]",
              "bg-white/82",
              "backdrop-blur-2xl",
              "px-5 md:px-7",
              "shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            )}
          >

            {/* AMBIENT */}
            <div
              className="
                pointer-events-none
                absolute inset-0
                rounded-[28px]
                bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.06),transparent_35%)]
              "
            />

            {/* LEFT */}
            <button
              type="button"
              onClick={() =>
                handleNavigate("/")
              }
              className="
                relative z-10
                flex items-center gap-4
                rounded-2xl
                px-2 py-2
                text-left
                transition-colors duration-200
                hover:bg-clay-surface-soft
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-clay-primary/25
              "
            >

              {/* LOGO */}
              <div
                className="
                  relative
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  bg-[#111827]
                  text-xs font-semibold
                  text-white
                  transition-all duration-300
                  group-hover:scale-[1.04]
                  group-hover:bg-teal-600
                  shadow-[0_10px_25px_rgba(0,0,0,0.10)]
                "
              >

                <div
                  className="
                    absolute inset-0
                    rounded-2xl
                    bg-white/10
                    opacity-0
                    transition-opacity duration-300
                    group-hover:opacity-100
                  "
                />

                MW

              </div>

              {/* BRAND */}
              <div className="hidden sm:block">

                <div
                  className="
                    text-[17px]
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
                    font-medium
                    text-[#6B7280]
                  "
                >
                  Movement Intelligence
                </div>

              </div>

            </button>

            {/* CENTER NAV */}
            <nav
              aria-label="Main"
              className="
                relative z-10
                hidden md:flex items-center gap-1.5
              "
            >

              {navItems.map((item) => {

                const Icon = item.icon

                return (

                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "group relative",
                        "flex items-center gap-2",
                        "h-11 px-5",
                        "rounded-2xl",
                        "text-[13px]",
                        "font-semibold",
                        "tracking-[-0.01em]",
                        "transition-all duration-300",
                        isActive
                          ? "text-[#111827]"
                          : "text-[#6B7280] hover:text-[#111827]"
                      )
                    }
                  >

                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="navbar-active"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                            className="
                              absolute inset-0
                              rounded-2xl
                              border border-black/[0.04]
                              bg-white
                              shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                            "
                          />
                        )}

                        <div className="absolute inset-0 rounded-2xl bg-teal-500/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative z-10 flex items-center gap-2">
                          <Icon
                            size={16}
                            strokeWidth={isActive ? 2.4 : 2}
                          />
                          <span>{item.name}</span>
                        </div>
                      </>
                    )}

                  </NavLink>

                )
              })}

            </nav>

            {/* RIGHT */}
            <div
              className="
                relative z-10
                flex items-center gap-3
              "
            >

              {/* CTA */}
              <button
                onClick={() =>
                  handleNavigate("/assessment")
                }
                className={cn(
                  "hidden lg:flex items-center gap-2",
                  "h-11 px-6",
                  "rounded-2xl",
                  "bg-[#111827]",
                  "text-[12px]",
                  "font-semibold",
                  "uppercase tracking-[0.08em]",
                  "text-white",
                  "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
                  "transition-all duration-300",
                  "hover:scale-[1.02]",
                  "hover:bg-teal-600"
                )}
              >

                Start Assessment

                <ArrowRight size={15} />

              </button>

              {/* MOBILE */}
              <button
                onClick={() =>
                  setIsOpen(true)
                }
                aria-label="Open menu"
                aria-haspopup="true"
                aria-expanded={isOpen}
                className={cn(
                  "md:hidden",
                  "flex items-center justify-center",
                  "h-11 w-11",
                  "rounded-2xl",
                  "border border-black/[0.05]",
                  "bg-white",
                  "text-[#111827]",
                  "transition-colors duration-300",
                  "hover:bg-black/[0.03]"
                )}
              >

                <Menu size={20} />

              </button>

            </div>

          </header>

        </motion.div>

      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.2
            }}
            className="
              fixed inset-0 z-[200]
              bg-[#F7F8F6]/96
              backdrop-blur-2xl
            "
          >

            <motion.div
              initial={{
                x: "100%"
              }}
              animate={{
                x: 0
              }}
              exit={{
                x: "100%"
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 280
              }}
              className="
                flex h-full flex-col
                px-6 py-6
              "
            >

              {/* TOP */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-2xl
                      bg-[#111827]
                      text-xs font-semibold
                      text-white
                    "
                  >
                    MW
                  </div>

                  <div>

                    <div
                      className="
                        text-[17px]
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
                  className={cn(
                    "flex items-center justify-center",
                    "h-11 w-11",
                    "rounded-2xl",
                    "border border-black/[0.05]",
                    "bg-white"
                  )}
                >

                  <X size={20} />

                </button>

              </div>

              {/* NAV */}
              <div className="flex flex-col gap-3 pt-14">

                {navItems.map((item, i) => {

                  const Icon = item.icon

                  const isActive =
                    location.pathname === item.path

                  return (

                    <motion.button
                      key={item.name}
                      initial={{
                        opacity: 0,
                        y: 8
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      transition={{
                        delay: i * 0.05
                      }}
                      onClick={() =>
                        handleNavigate(item.path)
                      }
                      className={cn(
                        "flex items-center justify-between",
                        "rounded-[24px]",
                        "border px-5 py-5",
                        "transition-all duration-300",
                        isActive
                          ? "border-transparent bg-[#111827] text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                          : "border-black/[0.05] bg-white text-[#111827]"
                      )}
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-2xl",
                            isActive
                              ? "bg-white/10"
                              : "bg-[#F5F5F4]"
                          )}
                        >

                          <Icon size={20} />

                        </div>

                        <div className="text-left">

                          <div
                            className="
                              text-[17px]
                              font-semibold
                              tracking-[-0.02em]
                            "
                          >
                            {item.name}
                          </div>

                          <div
                            className={cn(
                              "mt-1 text-[13px]",
                              isActive
                                ? "text-white/65"
                                : "text-[#6B7280]"
                            )}
                          >
                            Open {item.name.toLowerCase()}
                          </div>

                        </div>

                      </div>

                      <ArrowRight size={17} />

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