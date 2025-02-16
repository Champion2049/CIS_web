import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, Calendar, Users, Info, Home, Sun, Moon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [currentTeamSet, setCurrentTeamSet] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      title: "IEEE Computational Intelligence Society",
      content: "Driving Tomorrow's Innovations Today",
      centered: true
    },
    {
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
      title: "Our Mission",
      content: "We are committed to creating a space where members can explore vetted news, peer-associated research, develop their skills through mentorship, and contribute to the promotion of Artificial Intelligence (AI) for the betterment of society. Additionally, we believe in cultivating a dynamic and engaging learning environment by organizing fun activities that not only enhance knowledge but also foster a sense of camaraderie among our members.",
      centered: false
    },
    {
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
      title: "Our Vision",
      content: "To become a leading hub for fostering innovation, knowledge, and skill development in Computational Intelligence (CI), empowering students to become pioneers in the AI-driven world.",
      centered: false
    }
  ];

  // Team members grouped into sets
  const teamSets = [
    // Set 0: Mentor
    [
      {
        name: "Dr. Manju Khanna",
        role: "Mentor",
        image: "/mentor.png"
      },
      
    ],
    // Set 1: President & Vice President
    [
      {
        name: "Kavya Sree Kammari",
        role: "President",
        image: "/president.jpg"
      },
      {
        name: "Yasasree Lasya A",
        role: "Vice President",
        image: "/vice-president.jpg"
      }
    ],
    // Set 2: Treasury
    [
      {
        name: "Sai Varun B P",
        role: "Treasurer",
        image: "/treasurer.jpg"
      },
      {
        name: "Sneha T R",
        role: "Co-Treasurer",
        image: "/co-treasurer.jpg"
      }
    ],
    // Set 3: Secretariat
    [
      {
        name: "Shreya Mittal",
        role: "Secretary",
        image: "/secretary.jpg"
      },
      {
        name: "Krishnapriya",
        role: "Co-Secretary",
        image: "/co-secretary.png"
      }
    ],
    // Set 4: Publicity
    [
      {
        name: "Shreya Bhanot",
        role: "Publicity Chair",
        image: "/publicity-chair.jpg"
      },
      {
        name: "Keerthinidhi S",
        role: "Publicity Co-Chair",
        image: "/co-publicity-chair.jpg"
      }
    ],
    // Set 5: Web Masters
    [
      {
        name: "Ishvarya G",
        role: "Web Master",
        image: "/web-chair.jpg"
      },
      {
        name: "Maytrai Sharma",
        role: "Co-Web Master",
        image: "/co-web-chair.png"
      }
    ],
    // Set 6: Membership Development
    [
      {
        name: "Akshat Kuttan",
        role: "Membership Development Chair",
        image: "/membership-chair.jpg"
      },
      {
        name: "Amara Pranav",
        role: "Co-Membership Development Chair",
        image: "/co-membership-chair.jpg"
      }
    ],
    // Set 7: Social Networking
    [
      {
        name: "Dishita Dashora",
        role: "Social Networking Chair",
        image: "/social-chair.jpg"
      },
      {
        name: "Sai Rithvik A",
        role: "Co-Social Networking Chair",
        image: "/co-social-chair.jpg"
      }
    ]
  ];

  const upcomingEvents = [
    {
      title: "Tech Talk",
      date: "2025-04-24",
      description: "Dive into the latest AI trends and innovations with leading experts in the field!",
      countdown: true
    },
    {
      title: "Escape Room",
      date: "2025-05-24",
      description: "Join us for an interactive workshop where you will solve real-world machine learning challenges in healthcare.",
      countdown: false
    },
    {
      title: "AI Workshop",
      date: "2025-06-24",
      description: "Showcase your coding skills in our exciting AI Challenge!",
      countdown: false
    },
    {
      title: "Interdepartment Hackathon",
      date: "2025-07-24",
      description: "Engage with industry experts as they share insights on AI ethics and future trends.",
      countdown: true
    }
  ];

  const isEventAvailable = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    const oneDayBefore = new Date(event);
    oneDayBefore.setDate(event.getDate() - 1);
    return now <= event && now >= oneDayBefore;
  };
  type EventType = {
    title: string;
    date: string;
    images: string[];
    link: string;
  };
  
  const pastEvents: EventType[] = [
    {
      title: "Tech Tango",
      date: "Dec 2024",
      images: ["/tTango1.jpg", "/tTango2.jpg", "/tTango3.jpg"],
      link: "/events/tech-tango-2024",
    },
    {
      title: "Retro Rumble",
      date: "Nov 2024",
      images: ["/retroRumble.jpg", "/retroRumble1.jpg", "/retroRumble2.jpg", "/retroRumble3.jpg"],
      link: "/events/retro-rumble-2024",
    },
    {
      title: "AI Arena",
      date: "Oct 2024",
      images: ["/aiArena1.jpg", "/aiArena2.jpg", "/aiArena3.jpg"],
      link: "/events/ai-arena-2024",
    },
  ];
  
  const PastEventSlider = ({ event }: { event: EventType }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
      }, 3000); // Cycle images every 3 seconds

      return () => clearInterval(interval);
    }, [event.images.length]);

    return (
      <a href={event.link} className="event-slide">
        <img
          src={event.images[currentImageIndex]}
          alt={event.title}
          style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
        />
        <h3>{event.title}</h3>
        <p>{event.date}</p>
      </a>
    );
  };
  (
    <div>
      <h1>Past Events</h1>
      {pastEvents.map((event, index) => (
        <PastEventSlider key={index} event={event} />
      ))}
    </div>
  );

  const handleRegistration = (eventTitle: string) => {
    const event = upcomingEvents.find(e => e.title === eventTitle);
    if (!event) return;

    if (!isEventAvailable(event.date)) {
      alert("Registration is only available one day before and on the day of the event.");
      return;
    }

    if (registeredEvents.includes(eventTitle)) {
      alert("You're already registered for this event!");
      return;
    }

    setRegisteredEvents([...registeredEvents, eventTitle]);
    alert("Successfully registered for " + eventTitle);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date(upcomingEvents[0].date).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleDots = () => {
    const totalDots = teamSets.length;
    const visibleDots = 4;
    const currentIndex = currentTeamSet;
    
    let start = Math.max(0, Math.min(currentIndex - Math.floor(visibleDots / 2), totalDots - visibleDots));
    let end = Math.min(totalDots, start + visibleDots);
    
    if (end - start < visibleDots) {
      start = Math.max(0, end - visibleDots);
    }
    
    return Array.from({ length: totalDots }, (_, i) => ({
      index: i,
      visible: i >= start && i < end
    }));
  };

  const handlePrevTeamSet = () => {
    setCurrentTeamSet(prev => (prev - 1 + teamSets.length) % teamSets.length);
  };

  const handleNextTeamSet = () => {
    setCurrentTeamSet(prev => (prev + 1) % teamSets.length);
  };

  return (
    <div className={`min-h-screen theme-transition ${isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full backdrop-blur-sm z-50 px-6 py-4 theme-transition ${
        isDarkMode ? 'bg-surface-dark/90' : 'bg-surface-light/90'
      }`}>
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
          <img 
            src="/logo.png" 
            alt="IEEE - Computational Intelligence Society" 
            className={`w-10 h-10 ${isDarkMode ? 'text-primary-dark' : 'text-primary-light'}`}
          />
          <h1 className="text-2xl font-bold">IEEE - Computational Intelligence Society</h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full theme-transition ${
                isDarkMode ? 'bg-surface-dark hover:bg-surface-dark/80' : 'bg-surface-light hover:bg-surface-light/80'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <motion.div 
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <NavLink icon={<Home size={18} />} text="Home" href="#home" />
              <NavLink icon={<Info size={18} />} text="About" href="#about" />
              <NavLink icon={<Calendar size={18} />} text="Events" href="#events" />
              <NavLink icon={<Users size={18} />} text="Team" href="#team" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                <NavLink icon={<Home size={18} />} text="Home" href="#home" />
                <NavLink icon={<Info size={18} />} text="About" href="#about" />
                <NavLink icon={<Calendar size={18} />} text="Events" href="#events" />
                <NavLink icon={<Users size={18} />} text="Team" href="#team" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

            {/* Hero Section */}
            <section id="home" className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[90vh] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className={`absolute inset-0 z-10 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-background-dark/80 to-black/80' 
                  : 'from-background-light/80 to-white/80'
              }`} />
              <img
                src={heroSlides[currentHeroSlide].image}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 flex ${
                heroSlides[currentHeroSlide].centered ? 'items-center justify-center' : 'items-end justify-start pb-16 pl-16'
              } z-20`}>
                <div className={`p-4 ${heroSlides[currentHeroSlide].centered ? 'text-center' : 'text-left mb-10'}`}>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl font-bold mb-6"
                  >
                    {heroSlides[currentHeroSlide].title}
                  </motion.h1>
                  {heroSlides[currentHeroSlide].content && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl"
                    >
                      {heroSlides[currentHeroSlide].content}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Events Section */}
      <section id="events" className={`py-20 px-6 theme-transition ${
        isDarkMode ? 'bg-background-dark' : 'bg-background-light'
      }`}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className={`text-4xl font-bold text-center mb-6 ${
              isDarkMode ? 'text-primary-dark' : 'text-primary-light'
            }`}>Upcoming Events</h2>
            
            {/* Countdown Timer */}
            <div className="text-center mb-12">
              <p className="text-2xl mb-4">Next Event: {upcomingEvents[0].title}</p>
              <div className="flex justify-center space-x-6">
                <CountdownBox value={countdown.days} label="Days" isDarkMode={isDarkMode} />
                <CountdownBox value={countdown.hours} label="Hours" isDarkMode={isDarkMode} />
                <CountdownBox value={countdown.minutes} label="Minutes" isDarkMode={isDarkMode} />
                <CountdownBox value={countdown.seconds} label="Seconds" isDarkMode={isDarkMode} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event, index) => {
                const isAvailable = isEventAvailable(event.date);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-lg cursor-pointer shadow-xl theme-transition flex flex-col ${
                      isDarkMode ? 'bg-surface-dark' : 'bg-surface-light'
                    }`}
                    onClick={() => setSelectedEvent(event.title)}
                  >
                    <div className="flex-grow">
                      <h3 className={`text-2xl font-bold mb-3 ${
                        isDarkMode ? 'text-primary-dark' : 'text-primary-light'
                      }`}>{event.title}</h3>
                      <p className="text-lg mb-4">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <p className="text-lg">{event.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegistration(event.title);
                      }}
                      className={`mt-4 px-6 py-2 rounded-lg transition-colors border w-full ${
                        !isAvailable
                          ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                          : registeredEvents.includes(event.title)
                          ? 'border-green-500 text-green-500'
                          : isDarkMode
                          ? 'border-text-dark text-text-dark hover:bg-text-dark/10'
                          : 'border-text-light text-text-light hover:bg-text-light/10'
                      }`}
                      disabled={!isAvailable || registeredEvents.includes(event.title)}
                    >
                      {!isAvailable 
                        ? 'Registration Closed' 
                        : registeredEvents.includes(event.title) 
                        ? 'Registered' 
                        : 'Registration Open'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Past Events */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className={`text-4xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-primary-dark' : 'text-primary-light'
            }`}>
              Past Events
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => {
                const [currentImageIndex, setCurrentImageIndex] = useState(0);
                const [intervalId, setIntervalId] = useState<number | null>(null);

                const startImageCycle = () => {
                  if (!intervalId) {
                    const newIntervalId = setInterval(() => {
                      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
                    }, 2000);
                    setIntervalId(newIntervalId);
                  }
                };

                const stopImageCycle = () => {
                  if (intervalId) {
                    clearInterval(intervalId);
                    setIntervalId(null);
                  }
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-lg"
                    onMouseEnter={startImageCycle}
                    onMouseLeave={stopImageCycle}
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={event.images[currentImageIndex]}
                        alt={event.title}
                        className="w-full h-64 object-cover transition-all duration-300 group-hover:brightness-110"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode 
                        ? 'from-background-dark/90 to-transparent' 
                        : 'from-background-light/90 to-transparent'
                    } p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-black/90`}>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className={`text-lg mb-4 ${
                        isDarkMode ? 'text-primary-dark' : 'text-primary-light'
                      }`}>
                        {event.date}
                      </p>
                      <button
                        className={`border px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                          isDarkMode
                            ? 'border-text-dark text-text-dark hover:bg-text-dark/10'
                            : 'border-text-light text-text-light hover:bg-text-light/10'
                        }`}
                        onClick={() => window.location.href = event.link}
                      >
                        Learn More
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-20 px-6 overflow-hidden theme-transition ${
        isDarkMode ? 'bg-surface-dark' : 'bg-surface-light'
      }`}>
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-primary-dark' : 'text-primary-light'
            }`}
          >
            Our Team
          </motion.h2>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTeamSet}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center flex-wrap gap-8"
              >
                {teamSets[currentTeamSet].map((member, index) => (
                  <motion.div
                    key={index}
                    className="relative w-72"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className={`p-6 rounded-lg shadow-xl theme-transition ${
                      isDarkMode ? 'bg-background-dark' : 'bg-background-light'
                    }`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-72 object-cover rounded-lg mb-4"
                      />
                      <h3 className={`text-2xl font-bold mb-2 ${
                        isDarkMode ? 'text-primary-dark' : 'text-primary-light'
                      }`}>{member.name}</h3>
                      <p className="text-xl">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevTeamSet}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white ${
                isDarkMode ? 'bg-primary-dark/80' : 'bg-primary-light/80'
              } hover:bg-primary-light/20`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextTeamSet}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white ${
                isDarkMode ? 'bg-primary-dark/80' : 'bg-primary-light/80'
              } hover:bg-primary-light/20`}
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {getVisibleDots().map(({ index, visible }) => (
                <button
                  key={index}
                  onClick={() => setCurrentTeamSet(index)}
                  className={`transition-all ${
                    visible ? 'w-3 h-3' : 'w-2 h-2 opacity-50'
                  } rounded-full ${
                    currentTeamSet === index 
                      ? isDarkMode ? 'bg-primary-dark' : 'bg-primary-light'
                      : isDarkMode ? 'bg-primary-dark/30' : 'bg-primary-light/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 px-6 theme-transition ${
        isDarkMode ? 'bg-surface-dark' : 'bg-surface-light'
      }`}>
        <div className="container mx-auto text-center">
        <p>&copy; 2025 ASEB. All Rights Reserved.</p>
        <ul>
          <li><a href="#">IEEE SBC</a></li>
          <li><a href="#">IEEE WEI</a></li>
          <li><a href="#">IEEE SP</a></li>
          <li><a href="#">IEEE CAS</a></li>
          <li><a href="#">IEEE PELS</a></li>
          <li><a href="#">IEEE PES</a></li>
          <li><a href="#">IEEE ComSoc</a></li>
          <li><a href="#">IEEE SC</a></li>
          <li><a href="#">IEEE SIGHT</a></li>
          <li><a href="#">IEEE Innovation</a></li>
        </ul>
        </div>
      </footer>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className={`p-8 rounded-lg max-w-md mx-4 theme-transition ${
                isDarkMode ? 'bg-surface-dark' : 'bg-surface-light'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-primary-dark' : 'text-primary-light'
              }`}>{selectedEvent}</h3>
              <p className="text-lg mb-6">
                {upcomingEvents.find(e => e.title === selectedEvent)?.description}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className={`border px-6 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'border-text-dark text-text-dark hover:bg-text-dark/10'
                      : 'border-text-light text-text-light hover:bg-text-light/10'
                  }`}
                >
                  Close
                </button>
                {!registeredEvents.includes(selectedEvent) && (
                  <button
                    onClick={() => handleRegistration(selectedEvent)}
                    className={`border px-6 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'border-text-dark text-text-dark hover:bg-text-dark/10'
                        : 'border-text-light text-text-light hover:bg-text-light/10'
                    }`}
                  >
                    Register Now
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-center space-x-2 hover:text-primary-light transition-colors text-lg"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

function CountdownBox({ value, label, isDarkMode }: { value: number; label: string; isDarkMode: boolean }) {
  return (
    <div className={`p-4 rounded-lg shadow-xl theme-transition ${
      isDarkMode ? 'bg-surface-dark' : 'bg-surface surface-light'
    }`}>
      <div className={`text-3xl font-bold ${
        isDarkMode ? 'text-primary-dark' : 'text-primary-light'
      }`}>{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}
export default App;