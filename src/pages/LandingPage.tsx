import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Character } from '../components/Character';

export function LandingPage() {
  const navigate = useNavigate();

  // The One Live Thing: interactive mini-quest right on the landing page
  const [liveSubject, setLiveSubject] = useState<'math' | 'english'>('math');
  const [solved, setSolved] = useState<boolean | null>(null);

  const mathQuest = {
    prompt: "8 + 6 = ?",
    options: [
      { text: "12", correct: false },
      { text: "14", correct: true },
      { text: "15", correct: false }
    ]
  };

  const englishQuest = {
    prompt: 'Which word rhymes with "Star"?',
    options: [
      { text: "Moon", correct: false },
      { text: "Car", correct: true },
      { text: "Sun", correct: false }
    ]
  };

  const currentQuest = liveSubject === 'math' ? mathQuest : englishQuest;

  const handleOptionClick = (isCorrect: boolean) => {
    setSolved(isCorrect);
  };

  const resetLiveQuest = (subject: 'math' | 'english') => {
    setLiveSubject(subject);
    setSolved(null);
  };

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What age group is Learning Adventures designed for?",
      a: "The challenges are tuned for elementary school learners aged 5 to 11, with Easy, Medium, and Hard difficulty tiers for both Math and English."
    },
    {
      q: "Are there advertisements, subscriptions, or in-app purchases?",
      a: "None. Learning Adventures is completely ad-free with zero microtransactions or behavioral trackers."
    },
    {
      q: "Can multiple children in the family share the same device?",
      a: "Yes. Parents can set up to five separate player profiles, each with their own animal companion and independent score history."
    },
    {
      q: "How does progress tracking work for parents?",
      a: "Every completed activity logs the date, subject, difficulty, and score to the Parent Dashboard, with visual trend charts and score tables."
    }
  ];

  return (
    <div className="w-full bg-[#f7f7f5] text-[#000000] overflow-x-hidden">
      {/* Chapter 1: Hero (Colour field, two-ink statement) */}
      <section className="min-h-[100svh] bg-[#97aaf6] flex flex-col justify-between p-6 md:p-12 relative">
        {/* Top bar with wordmark & action */}
        <header className="flex justify-between items-center w-full z-10">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-[#000000] lowercase">
            learning adventures
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-base font-bold text-[#000000] hover:underline cursor-pointer"
            >
              Parent Sign In
            </button>
            <Button onClick={() => navigate('/register')} size="small" variant="primary">
              Create Account
            </Button>
          </div>
        </header>

        {/* Hero two-ink statement */}
        <div className="my-auto py-12 max-w-5xl">
          <h1 className="text-[clamp(3.5rem,9.5vw,8rem)] font-bold tracking-[-0.04em] leading-[0.88] lowercase mb-6 text-[#000000]">
            <span className="text-[#ffffff] block">play to</span>
            <span className="text-[#000000] block">discover.</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <Button onClick={() => navigate('/register')} size="large" variant="primary">
              Start Free Learning
            </Button>
            <Button onClick={() => navigate('/login')} size="large" variant="secondary">
              Parent Dashboard
            </Button>
          </div>
        </div>

        {/* Bottom corner supporting statement */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8">
          <p className="text-sm font-semibold text-[#000000]/70">
            Elementary Math & English Platform
          </p>
          <p className="text-base md:text-lg text-[#000000] max-w-md font-medium leading-relaxed">
            Interactive math challenges and English quests built for curious minds, with quiet progress tracking for parents.
          </p>
        </footer>
      </section>

      {/* Chapter 2: Intro (Edge-to-edge heavy paragraph) */}
      <section className="min-h-[90svh] bg-[#fed878] flex flex-col justify-center p-6 md:p-16">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-[#000000] mb-8">
            Curiosity grows when learning feels like play. We built two complete worlds with friendly animal guides, zero advertisements, and private family score tracking.
          </h2>
          <div className="flex items-center gap-6 mt-8">
            <div className="w-16 h-16">
              <Character type="fox" className="w-full h-full" />
            </div>
            <div className="w-16 h-16">
              <Character type="bear" className="w-full h-full" />
            </div>
            <div className="w-16 h-16">
              <Character type="rabbit" className="w-full h-full" />
            </div>
            <div className="w-16 h-16">
              <Character type="owl" className="w-full h-full" />
            </div>
            <div className="w-16 h-16">
              <Character type="turtle" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Showcase with The One Live Thing (Object on a disc) */}
      <section className="min-h-[95svh] bg-[#6ef8fb] p-6 md:p-16 flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#000000] mb-4">
            Try a Live Quest Right Now
          </h2>
          <p className="text-lg text-[#000000]/80 mb-8 max-w-lg mx-auto">
            Test a quick problem just as young learners do in the game.
          </p>

          {/* Subject toggles */}
          <div className="inline-flex bg-[#000000]/10 rounded-full p-1.5 mb-8">
            <button
              onClick={() => resetLiveQuest('math')}
              className={`px-6 py-2.5 rounded-full text-base font-bold transition-transform duration-150 ${liveSubject === 'math' ? 'bg-[#000000] text-[#ffffff]' : 'text-[#000000]'}`}
            >
              Mathematics
            </button>
            <button
              onClick={() => resetLiveQuest('english')}
              className={`px-6 py-2.5 rounded-full text-base font-bold transition-transform duration-150 ${liveSubject === 'english' ? 'bg-[#000000] text-[#ffffff]' : 'text-[#000000]'}`}
            >
              English Phonics
            </button>
          </div>

          {/* The Live Interactive Tile */}
          <div className="bg-[#ffffff] rounded-3xl p-8 md:p-12 border border-[#000000]/10 max-w-lg mx-auto text-center">
            <span className="text-sm font-semibold text-[#666662] block mb-2">
              {liveSubject === 'math' ? 'Elementary Arithmetic' : 'Rhyme Quest'}
            </span>
            <div className="text-4xl md:text-5xl font-bold text-[#000000] mb-8 tracking-tight">
              {currentQuest.prompt}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {currentQuest.options.map(option => (
                <button
                  key={option.text}
                  onClick={() => handleOptionClick(option.correct)}
                  className="py-4 px-3 rounded-2xl bg-[#f7f7f5] hover:bg-[#ebebe8] text-2xl font-bold text-[#000000] border border-[#ebebe8] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {option.text}
                </button>
              ))}
            </div>

            {solved === true && (
              <div className="p-4 rounded-xl bg-[#bbf697] text-[#000000] font-bold text-base">
                Brilliant! That is how each quest reinforces learning with instant feedback.
              </div>
            )}
            {solved === false && (
              <div className="p-4 rounded-xl bg-[#fed878] text-[#000000] font-bold text-base">
                Not quite right. Tap another option to give it another try.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Chapter 4: Features (Four cards dealt into a fan) */}
      <section className="min-h-[90svh] bg-[#f7f7f5] p-6 md:p-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000000]">
              Built for Young Minds and Attentive Parents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Periwinkle */}
            <div className="bg-[#97aaf6] rounded-2xl p-8 flex flex-col justify-between min-h-[300px]">
              <div className="w-16 h-16 mb-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/897/897368.png"
                  alt="Math calculations"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[#000000]">Math Expeditions</h4>
                <p className="text-base text-[#111111] opacity-90 leading-relaxed">
                  Addition, subtraction, times tables, and number-sense challenges designed for steady confidence.
                </p>
              </div>
            </div>

            {/* Card 2: Lime */}
            <div className="bg-[#bbf697] rounded-2xl p-8 flex flex-col justify-between min-h-[300px]">
              <div className="w-16 h-16 mb-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png"
                  alt="English open book"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[#000000]">English Quests</h4>
                <p className="text-base text-[#111111] opacity-90 leading-relaxed">
                  Phonics, letter recognition, rhyming pairs, and vocabulary building through guided questions.
                </p>
              </div>
            </div>

            {/* Card 3: Amber */}
            <div className="bg-[#fed878] rounded-2xl p-8 flex flex-col justify-between min-h-[300px]">
              <div className="w-16 h-16 mb-6">
                <Character type="owl" className="w-full h-full" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[#000000]">Five Companions</h4>
                <p className="text-base text-[#111111] opacity-90 leading-relaxed">
                  Fox, Bear, Rabbit, Owl, and Turtle guide kids through each challenge without pressure or penalties.
                </p>
              </div>
            </div>

            {/* Card 4: Cyan */}
            <div className="bg-[#6ef8fb] rounded-2xl p-8 flex flex-col justify-between min-h-[300px]">
              <div className="w-16 h-16 mb-6">
                <Character type="turtle" className="w-full h-full" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[#000000]">Private Dashboard</h4>
                <p className="text-base text-[#111111] opacity-90 leading-relaxed">
                  Parents inspect quiz history, subject averages, and completion dates privately on their device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 5: How it Works (Tiles that grow) */}
      <section className="min-h-[85svh] bg-[#bbf697] p-6 md:p-16 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] tracking-tight">
              How Adventures Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Tile 1: Small */}
            <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 border border-[#000000]/10 min-h-[220px] flex flex-col justify-between">
              <span className="text-4xl font-bold text-[#000000]">1</span>
              <div>
                <h4 className="text-xl font-bold text-[#000000] mb-2">Create Player</h4>
                <p className="text-sm text-[#666662]">Choose an animal avatar and enter your child's name.</p>
              </div>
            </div>

            {/* Tile 2: Medium */}
            <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 border border-[#000000]/10 min-h-[270px] flex flex-col justify-between">
              <span className="text-4xl font-bold text-[#000000]">2</span>
              <div>
                <h4 className="text-2xl font-bold text-[#000000] mb-2">Pick Quest Subject</h4>
                <p className="text-sm text-[#666662]">Choose between Mathematics and English adventures.</p>
              </div>
            </div>

            {/* Tile 3: Large */}
            <div className="bg-[#000000] text-[#ffffff] rounded-2xl p-6 md:p-10 min-h-[320px] flex flex-col justify-between">
              <span className="text-4xl font-bold text-[#bbf697]">3</span>
              <div>
                <h4 className="text-2xl font-bold text-[#ffffff] mb-2">Master Challenges</h4>
                <p className="text-sm text-[#cccccc] leading-relaxed">
                  Start with un-timed Easy mode, try 60-second Medium challenges, or test endurance in 3-Lives Hard mode.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 6: FAQ (Accordion of filled tiles) */}
      <section className="min-h-[85svh] bg-[#f7f7f5] p-6 md:p-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 md:sticky md:top-24 self-start">
            <h2 className="text-4xl font-bold text-[#000000] tracking-tight mb-4">
              Everything Parents Need to Know
            </h2>
            <p className="text-base text-[#666662] leading-relaxed">
              Transparent, quiet educational design without hidden agendas or intrusive notifications.
            </p>
          </div>

          <div className="md:col-span-7 space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="bg-[#ffffff] rounded-2xl p-6 border border-[#ebebe8] transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-lg font-bold text-[#000000]">{faq.q}</span>
                    <span className="text-xl font-bold ml-4 text-[#000000]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-base text-[#666662] leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chapter 7: CTA (The action tile) */}
      <section className="bg-[#97aaf6] p-8 md:p-20 text-center">
        <div className="max-w-3xl mx-auto bg-[#000000] text-[#ffffff] rounded-3xl p-10 md:p-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Start Your Child's Learning Adventure
          </h2>
          <p className="text-base md:text-lg text-[#cccccc] mb-8 max-w-lg mx-auto">
            Set up player profiles in under two minutes and enjoy peaceful, ad-free learning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate('/register')} size="large" variant="success">
              Create Parent Account
            </Button>
            <Button onClick={() => navigate('/login')} size="large" variant="secondary">
              Parent Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Chapter 8: Footer (Name first, places under it) */}
      <footer className="bg-[#000000] text-[#ffffff] p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          <div className="pb-8 mb-8">
            <span className="text-4xl md:text-6xl font-bold tracking-tighter text-[#ffffff] lowercase block">
              learning adventures
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm text-[#aaaaaa]">
            <div>
              <h4 className="font-bold text-[#ffffff] text-sm mb-3">Activities</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/difficulty/math')} className="hover:text-[#ffffff]">Mathematics</button></li>
                <li><button onClick={() => navigate('/difficulty/english')} className="hover:text-[#ffffff]">English Phonics</button></li>
                <li><button onClick={() => navigate('/profile-selection')} className="hover:text-[#ffffff]">Explorer Profiles</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#ffffff] text-sm mb-3">Family Space</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/kid-profiles')} className="hover:text-[#ffffff]">Parent Dashboard</button></li>
                <li><button onClick={() => navigate('/login')} className="hover:text-[#ffffff]">Sign In</button></li>
                <li><button onClick={() => navigate('/register')} className="hover:text-[#ffffff]">Create Account</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#ffffff] text-sm mb-3">Characters</h4>
              <ul className="space-y-2">
                <li>Fox Mentor</li>
                <li>Bear Guardian</li>
                <li>Rabbit Sprinter</li>
                <li>Owl Scholar</li>
                <li>Turtle Pacer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#ffffff] text-sm mb-3">Privacy & Trust</h4>
              <ul className="space-y-2">
                <li>No Third-Party Ads</li>
                <li>Zero In-App Purchasing</li>
                <li>Local Storage Encryption</li>
                <li>COPPA & Privacy First</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-[#777777] pt-8">
            <p>Learning Adventures — Educational platform for young explorers.</p>
            <p className="mt-2 sm:mt-0">Animal companion icons via Flaticon under open web usage.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
